const mysql = require("mysql2");
const express = require("express");
const fs = require("fs");
const http = require("http");
const formidable = require("formidable");
const calendarLink = require("calendar-link");
const hoome_utils = require("./utils");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cors = require("cors");
const routes = require("./routes");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const env_conf = dotenv.config({ path: path.join(__dirname, ".env") });
const process = require("process");
// const upload = multer({ dest: 'uploads/' })

const db = require('./models');
const eligible = require('./controllers/user_eligible');


const app = express();

// Add headers
// app.options(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   next();
// });

// Access-Control *
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// params cors utile pour ORM execution => origin 
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* ########        Configuration for uploads General   ############### */
app.use(express.static(__dirname + '/public'));

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads_file/');
  },
  filename: function (req, file, cb) {
    console.log(['fileNameFunction', req.body, file]);
    cb(null, Date.now() + "_" + file.originalname);
  }
});

app.post('/upload-general-file', (req, res) => {
  console.log(["On post ....", req.file, req.files]);
  let upload = multer({ storage: storage1 }).single('file_to_upload');
  upload(req, res, function (err) {
    if (err) {
      console.warn(err);
      // An error occurred when uploading
      res.send("Errrooorrrrr !!!!!");
    } else {
      console.log(req.file);
      profilePicUrl = req.file.filename;
      res.send(req.file.filename);
    }
    // Display uploaded image for user validation
    // console.log(["Request on upload ...", req.files, req.body ]);
    //res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    //res.send("FileNameHere !!!!!");
  });
});
/* ########       END : Configuration for uploads General      ############### */

// use routes
app.use("/", routes);

// default route
app.get("/", (req, res) => {
  return res.send({
    error: true,
    message: "hello",
  });
});

// [sequelize]
const dbSequelize = require("./models"); // => appel index sequelize

const dbConfig = require("./config/db");
const Sequelize = require("sequelize");
// const UserACLModel = require("./models/hoome_user_acl");
const HoomeRoleUser = require("./models/hoome_role_user");
const MainUserModel = require("./models/hoome_main_user");
const ProjectCourseTest = require("./models/hoome_project_course");
const Recommendation = require("./models/hoome_recommendation");
const Notification = require("./models/hoome_notification");
const Calendar = require("./models/hoome_calendrier");
const DossierBancaire = require("./models/hoome_dossier_bancaire");
const DocumentModel = require("./models/hoome_documents");
const Simulation = require("./models/hoome_simulation");
const AccountsModel = require("./models/accounts");
const ActionsModel = require("./models/actions");
const ApiKeysModel = require("./models/api_keys");

// run sequelize => traitement total si refactoring
dbSequelize.sequelize.sync({ alter: true }).then(() => {
  console.log("=== FIN TRAITEMENT SQLZ ===");
});

/**
 * @param req
 * @param res
 * @returns {*}
 */

// mailing parameter
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "15599357168-hc2ofr5fok6mem1ogcbncsjo0asln78v.apps.googleusercontent.com", // ClientID
  "9J9nSXs4FrGOS2bAZ1Egk_57", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token:
    "1//04McxuUzJ_J3-CgYIARAAGAQSNwF-L9IrvS9WuWFa3g_24NWbR6KksQZDUEs_6QtZs8brN6ldtYgnOmNeuLBfgYijZxBcFfky11Y",
});
const accessToken = oauth2Client.getAccessToken();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "hoomeadm@gmail.com",
    clientId:
      "15599357168-hc2ofr5fok6mem1ogcbncsjo0asln78v.apps.googleusercontent.com",
    clientSecret: "9J9nSXs4FrGOS2bAZ1Egk_57",
    refreshToken:
      "1//04McxuUzJ_J3-CgYIARAAGAQSNwF-L9IrvS9WuWFa3g_24NWbR6KksQZDUEs_6QtZs8brN6ldtYgnOmNeuLBfgYijZxBcFfky11Y",
    accessToken: accessToken,
  },
});

// NEW FUNCTION GLOBAL pour SEND MAIL
const sendmail = async (newEmail, newSubject, newText) => {
  await transporter.sendMail(
    {
      from: "hoomeadm@gmail.com",
      to: newEmail,
      subject: newSubject,
      html: newText,
    },
    (err, info) => {
      err
        ? res.status(500).json({ state: "error", error: err })
        : res.status(200).json({ state: "mail_send" });
      transporter.close();
    }
  );
};

// MAIL WITH CC
const sendmailAdmin = async (newEmail, newSubject, newText) => {
  await transporter.sendMail(
    {
      from: "hoomeadm@gmail.com",
      to: newEmail,
      cc: ["lf@laurentforissier.com", "fw@fredericweiss.com"],
      // cc: ["frederic.weiss@hoome.fr", "carol.arivony@gmail.com"],
      // cc: ["carol.arivony@gmail.com"],
      // cc: ["gunito@yopmail.com", "gunito22@yopmail.com"],
      subject: newSubject,
      html: newText,
    },
    (err, info) => {
      err
        ? res.status(500).json({ state: "error", error: err })
        : res.status(200).json({ state: "mail_send" });
      transporter.close();
    }
  );
};

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
// console.log("******************************************************");
// console.log([accountSid, authToken, client ]);

// connexion DB sequelize
const sequelize = new Sequelize(
  dbConfig.connectDb.DB,
  dbConfig.connectDb.USER,
  dbConfig.connectDb.PASSWORD,
  {
    host: dbConfig.connectDb.HOST,
    dialect: dbConfig.connectDb.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.connectDb.pool.max,
      min: dbConfig.connectDb.pool.min,
      acquire: dbConfig.connectDb.pool.acquire,
      idle: dbConfig.connectDb.pool.idle,
    },
  }
);

// Connexion mysql
const connection = mysql.createConnection({
  host: dbConfig.connectDb.HOST,
  user: dbConfig.connectDb.USER,
  password: dbConfig.connectDb.PASSWORD,
  database: dbConfig.connectDb.DB,
});

connection.connect();
console.log(
  "######################     Connection database     ################################"
);

// ###############     Sequelize Table configuration    ####################

// Accounts
const Accounts = AccountsModel(sequelize, Sequelize);
Accounts.sync().then(() => {
  console.log("<Accounts> table created/synced");
});

const Actions = ActionsModel(sequelize, Sequelize);
Actions.sync().then(() => {
  console.log("<actions> table created/synced");
});

const ApiKeys = ApiKeysModel(sequelize, Sequelize);
ApiKeys.sync().then(() => {
  console.log("<ApiKeys> table created/synced");
});

// Document
const Document = DocumentModel(sequelize, Sequelize);
Document.sync().then(() => {
  console.log("<hoome_documents> table created/synced");
});

// Dossier bancaire
// const User = UserACLModel(sequelize, Sequelize);
// User.sync().then(() => {
//   console.log("<hoome_user_acl> table created/synced");
// });

// const UserRoleModel = HoomeRoleUser(Sequelize, sequelize);
// UserRoleModel.sync().then(() =>
//   console.log("hoome_role_user table created/synced")
// );

// MainUserModel
const MainUser = MainUserModel(sequelize, Sequelize);
MainUser.sync().then(() => {
  console.log("<hoome_main_user> table created/synced");
});
// MainUser.belongsTo(UserRoleModel);

// Dossier bancaire
const Dossier = DossierBancaire(sequelize, Sequelize);
Dossier.sync().then(() => {
  console.log("<hoome_dossier_bancaire> table created/synced");
});

app.get("/dossier_bancaire/:id_acl", async (req, res) => {
  const id_acl = req.params.id_acl;
  const dossier_bancaire = await Dossier.findOne({
    where: { id_acl: id_acl },
  });

  let main_data = fs.readFileSync(`${__dirname}/project/data/main_data.json`);
  main_data = JSON.parse(main_data);

  let result = []; // the final result

  for (let key in dossier_bancaire.dataValues) {
    const form_object = {};
    form_object["name"] = key;
    form_object["value"] = eval(`dossier_bancaire.${key}`);
    for (let object of main_data) {
      if (key == object["id"]) {
        form_object["label"] = object["question"];
        break;
      }
    }
    if (!form_object["label"]) form_object["label"] = key;
    result.push(form_object);
  }
  res.status(200).json(result);
});
/* DOSSIER BANCAIRE - FIN */

// const ProjectCourse = ProjectCourseTest(sequelize, Sequelize);
// ProjectCourse.sync().then(() => console.log("course test project table created"));
const ProjectCourse = ProjectCourseTest(sequelize, Sequelize);
ProjectCourse.sync().then(() =>
  console.log("course test project table created")
);

const FriendRecommendation = Recommendation(sequelize, Sequelize);
// const Acl = UserACLModel(sequelize, Sequelize);
const NotificationModel = Notification(sequelize, Sequelize);
NotificationModel.sync().then(() => {
  console.log("notification table created/synced |  Work here");
});

const CalendarModel = Calendar(sequelize, Sequelize);
CalendarModel.sync().then(() => console.log("calendar table created/synced"));

const SimulationModel = Simulation(sequelize, Sequelize);
SimulationModel.sync({ alter: true }).then(() => {
  console.log("table hoome_simulation successfully synced");
});
console.log("Dernier traitement actuel ");

FriendRecommendation.sync({ alter: true }).then(() => {
  console.log("table hoome_recommandation successfully synced");
});

/** Configuration clé etrangère */

/** #####################    END CONfIG Sequelize      #######################    */

// Endpoints
app.post("/simulation", async (req, res) => {
  try {
    const simulation_obj = req.body;
    const simulation = SimulationModel.create(simulation_obj);
    res.status(200).json(simulation);
  } catch (error) {
    res.status(500).json(error);
  }
});
/**
 * SIMULATION - END
 */

function appendCalendar(data) {
  try {
    const event = {
      start: data.date_rendez_vous || new Date(),
      end: "",
      duration: [1, "day"],
      title: data.contenu,
      description: data.contenu,
      location: "Internet",
      busy: true,
    };
    const google = calendarLink.google(event);
    const outlook = calendarLink.outlook(event);
    return { google, outlook };
  } catch (error) {
    throw new Error(error.message);
  }
}

app.post("/generate_email", async (req, res) => {
  try {
    const body = req.body;
    const created_acl = await Acl.create(body);
    res.status(200).json(created_acl);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/friend_recommendation", async (req, res) => {
  try {
    const friend_information = req.body;
    const friend = await FriendRecommendation.create(friend_information);
    await Acl.create(friend_information);
    res.status(200).json(friend);
  } catch (error) {
    console.log(`error: ${error}`);
    res.status(500).json(error);
  }
});

// Configuration : Generate code Validation and save
//app.post

app.post("/sms", async (req, res) => {
  const userNumber = req.body.to;
  const textSMS = req.body.message;

  const message = await client.messages.create({
    to: userNumber,
    from: process.env.TWILIO_PHONE,
    body: textSMS,
  });
  res.status(200).json(message.sid);
  console.log(message.sid);
  console.log("twilio error");
});

app.post("/sms_generate_code", async (req, res) => {
  // const userNumber = req.body.to;
  // const textSMS = req.body.message;
  // console.log("text", textSMS);
  // const message = await client.messages.create({
  // 	to: userNumber, //"+330680432905"
  // 	from: "+13213208423",
  // 	body: textSMS,
  // });
  // res.status(200).json(message.sid);
  // console.log(message.sid);
  console.log("twilio error");
});

app.post("/project_course/:id", async (req, res) => {
  const user_acl_ID = req.params.id;
  const course_body = req.body;
  ProjectCourse.findOne({
    where: {
      id_acl: user_acl_ID,
    },
  }).then((obj) => {
    if (obj) {
      obj
        .update(course_body, {
          where: {
            id_acl: user_acl_ID,
          },
        })
        .then(() => {
          res.status(200).json("course updated");
        });
    } else {
      ProjectCourse.create(course_body).then(() => {
        res.status(200).json("course created");
      });
    }
  });
});

app.get("/project_course/:id", async (req, res) => {
  try {
    console.log("we are here");
    const user_acl_ID = req.params.id;
    const project = await ProjectCourse.findOne({
      where: { id_acl: user_acl_ID },
    });
    if (project === null) {
      res.status(204).json("no data");
    } else {
      res.status(200).json(project);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.put("/member_v2/:id", async (req, res) => {
  const user_acl_ID = req.params.id;
  const user_acl_body = req.body;

  console.log(user_acl_body);

  dbSequelize.hoomeUsersAcl
    .update(user_acl_body, {
      where: {
        user_acl_ID: user_acl_ID,
      },
    })
    .then(async () => {
      const acl = await dbSequelize.hoomeUsersAcl.findByPk(user_acl_ID);
      if (acl !== null) {
        res.status(200).json({
          success: "User successfully updated",
          res: acl,
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  // User_ACL.sync().then(() => console.log(`hoome_user_acl table synced`));
});

// Notifications feature (W.I.P)
app.post("/send_notification", async (req, res) => {
  try {
    const body = req.body;
    const notification = await NotificationModel.create(body);
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/send_notif_calendar", async (req, res) => {
  try {
    const body = req.body;
    const { google, outlook } = appendCalendar(body);
    body.google = google;
    body.outlook = outlook;
    const calendar = await CalendarModel.create(body);
    res.status(200).json(calendar);
  } catch (error) {
    console.log(`Error message: > ${error.message}`);
    res.status(500).json(error.message);
  }
});

app.get("/unseen_notifications/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const notifications = await NotificationModel.findAll({
      where: {
        target: user_id,
        seen: false,
      },
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/unseen_notif_calendar/:id", async (req, res) => {
  try {
    const user = req.params.id;
    const calendars = await CalendarModel.findAll({
      where: {
        destinataire: user,
        lu: false,
      },
    });
    res.status(200).json(calendars);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/notif_calendar/:id", async (req, res) => {
  try {
    const user = req.params.id;
    const Op = Sequelize.Op;
    const calendars = await CalendarModel.findAll({
      where: {
        appointment: true,
        [Op.or]: {
          destinataire: {
            [Op.like]: user,
          },
          expediteur: {
            [Op.like]: user,
          },
        },
      },
    });
    res.status(200).json(calendars);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.get("/notification/:id", async (req, res) => {
  try {
    const user = req.params.id;
    const Op = Sequelize.Op;
    const calendars = await CalendarModel.findAll({
      where: {
        appointment: false,
        [Op.or]: {
          destinataire: {
            [Op.like]: user,
          },
          expediteur: {
            [Op.like]: user,
          },
        },
      },
    });
    res.status(200).json(calendars);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/list_messagerie/:id", async (req, res) => {
  try {
    const user = req.params.id;
    const calendars = await CalendarModel.findAll({
      where: {
        destinataire: user,
      },
    });
    res.status(200).json(calendars);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/mark_notifications_as_seen", async (req, res) => {
  try {
    const notification_ids = req.body.notifications;
    await NotificationModel.update(
      { seen: true },
      { where: { notification_ID: notification_ids } }
    );
    res.status(200).json(`Notifications status updated`);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/status_appointment", async (req, res) => {
  try {
    const status = req.body.status;
    const id = req.body.id;
    console.log(req.body);
    await CalendarModel.update({ status }, { where: { id } });
    res.status(200).json(`Appointment status updated`);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/mark_notif_calendar_as_seen", async (req, res) => {
  try {
    const id = req.body.notifCalendar;
    await CalendarModel.update({ lu: true }, { where: { id } });
    res.status(200).json(`Notifications status updated`);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/mark_notif_calendar_as_unseen", async (req, res) => {
  try {
    const id = req.body.notifCalendar;
    await CalendarModel.update({ lu: false }, { where: { id } });
    res.status(200).json(`Notifications status updated`);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/delete_notif_calendar/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const notif = await CalendarModel.findOne({ where: { id } }).catch((e) =>
      console.log(e.message)
    );
    if (!notif) {
      console.log("err");
    }
    notif.destroy();
    res.status(200).json(`Notifications status updated`);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * load project data
 */
app.get("/project_data", (req, res) => {
  console.log(__dirname);
  fs.readFile(
    __dirname + "/project/data/main_data.json",
    "utf8",
    (err, data) => {
      if (err) res.status(500).json(err);
      res.status(200).json(JSON.parse(data));
    }
  );
});

app.get("/ptz", (req, res) => {
  fs.readFile(path.join(__dirname, "/PTZ/PTZ.json"), "utf8", (err, data) => {
    if (err) res.status(500).json(err);
    res.status(200).json(JSON.parse(data));
  });
});

// const User_ACL = UserACLModel(sequelize, Sequelize);
// User_ACL.findAll().then((users) => {
//     console.log("all", JSON.stringify(users));
// });

// User_ACL.sync().then(() => console.log(`hoome_user_acl table synced`));
// [sequelize] --- END ---

// ========================================= VARIABLES D'ENVIRONNEMENT =================================
console.log(env_conf);
app.get("/env-var", (req, res) => {
  let obj = { base_url: "", app_port: "", api_url: "", absolute_path: "" };
  obj.base_url = process.env.BASE_URL;
  obj.app_port = process.env.APP_PORT;
  obj.api_url = process.env.API_URL;
  obj.absolute_path = process.env.ABSOLUTE_PATH;
  res.status(200).json(obj);
}

);



// ========================================= VARIABLES GET ALL ELIGIBLE =================================
console.log(env_conf);
app.get("/eligibles/getAll", eligible.getAllUserEligible);


// ==========================================PDF=============================================================
app.post("/topdf", (req, res) => {
  var wkhtmltopdf = require("wkhtmltopdf");
  wkhtmltopdf(
    `${req.body.html}`,
    { output: `${__dirname}/pdf/${req.body.name}`, pageSize: "letter" },
    (error, stream) => {
      if (error) {
        res.json({
          error: "Error generate pdf",
        });
        throw error;
      }
      res.json({
        success: "PDF successfully generated",
        res: `${__dirname}/pdf/${req.body.name}`,
      });
    }
  );
});

// ========================================== ACL ===========================================================
app.get("/columns", (req, res) => {
  const request = `SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME ='hoome_user_acl' and TABLE_SCHEMA='${connection.config.database}' and COLUMN_KEY != 'PRI';`;
  connection.query(request, (error, result) => {
    if (error) res.status(500).json(error);
    res.status(200).json(result);
  });
});

// sign_up user => GLOBAL
app.post("/member", async (req, res) => {
  const email = req.body.email;
  let password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone_number = req.body.phone_number;
  const toque_number = req.body.toque_number;

  password = await bcrypt.hash(password, 10);

  const zero_request = `SELECT * FROM hoome_user_acl where email='${email}'`;
  const first_request = `INSERT INTO hoome_user_acl (email, password, firstname, lastname, phone_number, toque_number) VALUES ('${email}', '${password}', '${firstname}', '${lastname}', '${phone_number}', '${toque_number}')`;
  const second_request = `SELECT * FROM hoome_user_acl where email='${email}' and password='${password}'`;

  connection.query(zero_request, (error, result_duplicate) => {
    if (error) {
      res.status(500).json({
        error: "Error requete",
      });
      throw error;
    } else {
      if (result_duplicate.length > 0) {
        res.status(204).json({
          message: "duplicate_email",
          res: result_duplicate[0],
        });
      } else {
        connection.query(first_request, (error, result_insert) => {
          if (error) throw error;
          connection.query(second_request, (error, result) => {
            if (error) {
              res.status(500).json({
                error: "Error creating user",
              });
              throw error;
            }
            res.status(200).json({
              message: "user_created",
              res: result[0],
            });
            // Mailing for validation by ADMIN to new member
            let subject = "INSCRIPTION EN ATTENTE DE VALIDATION";
            let textToNewMember =
              "<b>Cher utilisateur,</b> <br> <br> " +
              '<p>Merci pour votre inscription sur la plateforme <a href="http://1274.fr"> <b> 1274.fr </b> </a> "l\'immobilière des avocats".</p>' +
              "<p>La création de votre espace personnel est en cours de validation.</p>" +
              "<p>Nous revenons vers vous dans les meilleurs délais afin de vous confirmer votre inscription.</p>" +
              "<p>A très bientôt</p> <br>" +
              '<b>L\'équipe <a href="http://1274.fr"> 1274.fr </a></b>';
            //sendmail(email, subject, textToNewMember);
            sendmail("harifidyilay@gmail.com", subject, textToNewMember);

            // Mailing for Admin email
            // local  "<p><a href=\"http://localhost:3000/enable_user/" + result[0].user_acl_ID + "\"> <button> Connexion à 1274.fr </button> </a></p>" +
            // prod "<p><a href=\"https://1274.fr/api/enable_user/" + result[0].user_acl_ID + "\"> <button> Connexion à 1274.fr </button> </a></p>" +
            // dev sendmailAdmin('marie.peroni@1274.fr', subject, textToAdmin)
            // prod sendmailAdmin('melmanladmin@yopmail.com', subject, textToAdmin)


            let textToAdmin =
              "<b>Cher ADMIN,</b> <br> " +
              "<p>Un avocat attend la validation de son inscription à l’espace privé.</p>" +
              "<p>Informations : <br>" +

              "<b> - Nom: " + result[0].lastname + "</b> <br>" +
              "<b> - Prénom: " + result[0].firstname + "</b> <br>" +
              "<b> - Contact personnel: " + result[0].phone_number + "</b> <br>" +
              "<b> - N° TOQUE: " + result[0].toque_number + "</b> <br>" +
              "<b> - Identifiant: " + result[0].user_acl_ID + "<br>" +
              "- Email: " + result[0].email + "<br></b></p>" +
              '<p><a href="https://1274.fr/api/enable_user/' + result[0].user_acl_ID +
              '"> <button> Activer le compte </button> </a></p>' +
              "<p>Signé: le super admin</p>";
            // sendmailAdmin("marie.peroni@1274.fr", subject, textToAdmin);
            sendmailAdmin("preprod.melm@gmail.com", subject, textToAdmin);
          });
        });
      }
    }
  });
});

// CONFIRME ACCOUNT
app.get("/enable_user/:id", async (req, res) => {
  const user = await dbSequelize.hoomeUsersAcl.findByPk(req.params.id);
  user.update({
    account_state: 1,
  });
  if (!user) {
    res.status(200).json({ message: 'no_user', data: null });
  } else {
    res.status(200).json({ message: 'success', data: user });
    let subject = "CONFIRMATION DE VOTRE COMPTE SUR 1274.fr";
    let textUser =
      "<b>Cher utilisateur,</b> <br> " +
      "<p>Nous vous confirmons votre inscription sur la plateforme 1274.fr et vous souhaitons la bienvenue.</p>" +
      "<p>Pour y accéder, cliquez sur l’onglet “connexion” avec l’adresse mail et le mot de passe que vous avez choisis lors de votre inscription.</p>" +
      "<p>Nous sommes ravis de vous accompagner dans le développement de votre activité de transactions immobilières.</p>" +
      "<p>Bien cordialement</p> <br>" +
      '<b>L\'équipe <a href="http://1274.fr"> 1274.fr </a></b>';
    sendmail(user.email, subject, textUser);
  }
});

app.post("/main_user", async (req, res) => {
  const email = req.body.email;
  let password = req.body.password;
  password = await bcrypt.hash(password, saltRounds);
  const roleID = req.body.roleID;
  const first_request = `INSERT INTO hoome_main_user (email, password, role_ID) VALUES ('${email}', '${password}', '${roleID}')`;
  const second_request = `SELECT * FROM hoome_main_user where email='${email}' and password='${password}' and role_ID='${roleID}'`;
  connection.query(first_request, (error, result) => {
    if (error) throw error;
    connection.query(second_request, (error, result) => {
      if (error) {
        res.status(500).json({
          error: "Error creating user",
        });
        throw error;
      }
      res.status(200).json({
        success: "Account successfully created",
        res: result[0],
      });
    });
  });
});

app.put("/member/:id", (req, res) => {
  // the only endpoint using sequelize for now!
  const user_acl_ID = req.params.id;
  const user_acl_body = req.body;

  dbSequelize.hoomeUsersAcl
    .update(user_acl_body, {
      where: {
        user_acl_ID: parseInt(user_acl_ID, 10),
      },
    })
    .then(() => {
      dbSequelize.hoomeUsersAcl
        .findOne({
          where: {
            user_acl_ID: parseInt(user_acl_ID, 10),
          },
        })
        .then((user) => {
          console.log("user: ", JSON.stringify(user));
          res.status(200).json({
            success: "User successfully updated",
            res: user,
          });
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });

  // User_ACL.sync().then(() => console.log(`hoome_user_acl table synced`));
});

app.post("/delete/:id", (req, res) => {
  //TODO: adding other informations to be deleted
  const user_acl_ID = req.params.id;
  // deleting documents
  // const delete_documents_query = `delete from hoome_acl_document where user_acl_ID='${user_acl_ID}'`;
  // delete user profile
  const delete_profile_query = `update hoome_user_acl set email = concat(email, '_old') where user_acl_id=${user_acl_ID};`;
  connection.query(delete_profile_query, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error deleting user" });
      throw error.message;
    }
    res.status(200).json({
      success: "User successfully deleted",
      res: result,
    });
  });
});

/**
 * profile picture
 */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const destination = path.join(__dirname, "profile-picture");
    callback(null, destination);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/photo/:id", upload.single("profil-picture"), (req, res, next) => {
  const params = JSON.parse(req.params.id);
  // console.log(req.file);
  console.log("param", params);
  console.log("param", req.file);
  const profile_pic =
    req.file && req.file.path && req.file.path.replace(/\\/g, `\\\\`);
  let query;
  if (params.id_ACL) {
    query = `update hoome_user_acl set profile_pic='${profile_pic}' where email='${params.email}'`;
  } else {
    query = `update hoome_main_user set profile_pic='${profile_pic}' where email='${params.email}'`;
  }
  console.log(query);
  connection.query(query, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error Updating profil picture" });
      throw error;
    }
    res.status(200).json({
      success: "Profil picture successfully updated",
      res: profile_pic,
    });
  });
});
/**
 * end profile picture
 */

app.post("/changeEmail/:id", (req, res) => {
  const user_acl_ID = req.params.id;
  const email = req.body.email;
  let query_check_email, query_update_email;
  if (parseInt(user_acl_ID, 10)) {
    query_check_email = `select * from hoome_user_acl where email='${email}'`;
    query_update_email = `update hoome_user_acl set email='${email}' where user_acl_ID='${user_acl_ID}'`;
  } else {
    query_check_email = `select * from hoome_main_user where email='${email}'`;
    query_update_email = `update hoome_main_user set email='${email}' where main_user_ID='${req.body.main_user_ID}'`;
  }
  connection.query(query_check_email, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error Updating profil picture" });
      throw error;
    }
    if (result.length > 0) {
      res.status(409).json({
        error: "Email is not valid",
      });
    } else {
      connection.query(query_update_email, (e, r) => {
        if (e) {
          res.status(500).json({ error: "Error Updating profil picture" });
          throw e;
        }
        res.status(200).json({
          success: "Email successfully updated",
          res: r,
        });
      });
    }
  });
});

app.post("/changePassword/:id", async (req, res) => {
  const user_acl_ID = req.params.id;
  const email = req.body.current_user_mail;
  const current_user_hashed_password = req.body.current_user_hashed_password;
  const plain_value_old_password = req.body.plain_value_old_password;
  const isOldPasswordCorrect = await bcrypt.compare(
    plain_value_old_password,
    current_user_hashed_password
  );

  if (isOldPasswordCorrect) {
    const plain_new_password = req.body.plain_new_password;
    const arePasswordsTheSame = await bcrypt.compare(
      plain_new_password,
      current_user_hashed_password
    );
    if (arePasswordsTheSame) {
      res.status(409).json({
        error:
          "Votre nouveau mot de passe ne doit pas être similaire à votre ancien mot de passe",
      });
    } else {
      const hashed_new_password = await bcrypt.hash(
        plain_new_password,
        saltRounds
      );
      let query = "";
      if (parseInt(user_acl_ID, 10)) {
        query = `update hoome_user_acl set password='${hashed_new_password}' where email='${email}'`;
      } else {
        query = `update hoome_main_user set password='${hashed_new_password}' where email='${email}'`;
      }
      connection.query(query, (err, result) => {
        if (err) {
          res.status(500).json({ error: "Error Updating password" });
          throw err;
        }
        console.log("query", result);
        res.status(200).json({
          success: "Password successfully updated",
          res: hashed_new_password,
        });
      });
    }
  } else {
    res.status(409).json({
      error: `L'ancien mot de passe est incorrect`,
    });
  }
});

app.get("/list-ACL", (req, res) => {
  const request = "SELECT user_acl_ID, email FROM hoome_user_acl";
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting list ACL" });
      throw error;
    }
    res.status(200).json({
      success: "List ACL successfully got",
      res: result,
    });
  });
});

app.get("/list-ACL/:id", (req, res) => {
  let request = "";
  if (isNaN(parseInt(req.params.id))) {
    request = `SELECT * FROM hoome_user_acl WHERE email = '${req.params.id}'`;
  } else {
    request = `SELECT * FROM hoome_user_acl WHERE user_acl_ID = ${parseInt(
      req.params.id
    )}`;
  }
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting ACL" });
      throw error;
    }
    res.status(200).json({
      success: "ACL successfully got",
      res: result[0],
    });
  });
});

app.get("/list-CEC", (req, res) => {
  const request =
    "SELECT main_user_ID, email FROM hoome_main_user WHERE role_ID = (SELECT role_ID FROM hoome_role_users WHERE code_role = 'CEC')";
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting list CEC" });
      throw error;
    }
    res.status(200).json({
      success: "List CEC successfully got",
      res: result,
    });
  });
});

app.get("/list-CEC/:id", (req, res) => {
  let request = "";
  if (isNaN(parseInt(req.params.id))) {
    request = `SELECT * FROM hoome_main_user WHERE email = '${req.params.id}'`;
  } else {
    request = `SELECT * FROM hoome_main_user WHERE main_user_ID = ${parseInt(
      req.params.id
    )}`;
  }
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting CEC" });
      throw error;
    }
    res.status(200).json({
      success: "CEC successfully got",
      res: result[0],
    });
  });
});

app.get("/masterCEC/:id", (req, res) => {
  const requestACL = `SELECT * FROM hoome_user_acl WHERE user_acl_ID = ${req.params.id}`;
  connection.query(requestACL, (error, result) => {
    console.log(["value result", result, "user_acl_id", req.params.id]);
    if (error) {
      res.status(500).json({ error: "Error getting CECs's ACL" });
      throw error;
    }
    connection.query(
      `SELECT main_user_ID, email FROM hoome_main_user WHERE main_user_ID = ${result[0].CEC_ID}`,
      (error, result) => {
        if (error) {
          res.status(500).json({ error: "Error getting CECs's ACL" });
          throw error;
        }
        res.status(200).json({
          success: "CECs's ACL successfully got",
          res: result,
        });
      }
    );
  });
});

app.put("/update-ACL-CEC/:acl/:cec", (req, res) => {
  const request = `UPDATE hoome_user_acl SET CEC_ID = (SELECT main_user_ID FROM hoome_main_user WHERE email = '${req.params.cec}') WHERE email = '${req.params.acl}';`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error updating ACL" });
      throw error.message;
    }
    res.status(200).json({
      success: "ACL successfully updated",
      res: result,
    });
  });
});

app.put("/remove-ACL-CEC/:acl", (req, res) => {
  const request = `UPDATE hoome_user_acl SET CEC_ID = null WHERE email = '${req.params.acl}';`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error removing ACL from CEC" });
      throw error.message;
    }
    res.status(200).json({
      success: "ACL successfully removed from CEC",
      res: result,
    });
  });
});

app.get("/users", (req, res) => {
  const request = "SELECT main_user_ID, email FROM hoome_main_user";
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting list users" });
      throw error;
    }
    res.status(200).json({
      success: "List users successfully got",
      res: result,
    });
  });
});

app.get("/user/:id", (req, res) => {
  let request = "";
  if (isNaN(parseInt(req.params.id))) {
    request = `SELECT * FROM hoome_main_user WHERE email = '${req.params.id}'`;
  } else {
    request = `SELECT * FROM hoome_main_user WHERE main_user_ID = ${parseInt(
      req.params.id
    )}`;
  }
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting user" });
      throw error;
    }
    res.status(200).json({
      success: "Users successfully got",
      res: result[0],
    });
  });
});

app.get("/users_infos", (req, res) => {
  connection.query(`SELECT * FROM hoome_role_users`, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting user" });
      throw error;
    }
    res.status(200).json({
      success: "Users successfully got",
      res: result,
    });
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // try {
  //   // const sql = `SELECT * FROM hoome_user_acl where email='${email}'`;
  //   const sqlWithRole = `SELECT huse.*, hrole.*  FROM hoome_user_acl AS huse LEFT JOIN hoome_role_users AS hrole 
  //     ON huse.hoomeRoleUserRoleID = hrole.role_ID WHERE email='${email}'`;
  //   connection.query(sqlWithRole, async (error, result) => {
  //     if (error) {
  //       res.status(403).json({ message: error });
  //       //throw error;
  //     }
  //     if (result.length > 0) {
  //       const hashedPassword = result[0].password;
  //       const same = await bcrypt.compare(password, hashedPassword);
  //       if (same) {
  //         res.status(202).json({
  //           message: "success",
  //           res: result[0],
  //         });
  //       } else {
  //         res.status(401).json({ message: "error_password" });
  //       }
  //     } else {
  //       const sql_other_user = `SELECT * FROM hoome_main_user where email='${email}'`;
  //       connection.query(sql_other_user, async (error, result) => {
  //         if (error) {
  //           res.status(500).json({ message: error });
  //           throw error;
  //         }
  //         if (result.length > 0) {
  //           const hashedPassword = result[0].password;
  //           const same = await bcrypt.compare(password, hashedPassword);
  //           if (same) {
  //             res.status(202).json({
  //               message: "success",
  //               res: result[0],
  //             });
  //           } else {
  //             res.status(401).json({ message: "Unauthorized " });
  //           }
  //         }
  //       });
  //     }
  //   });
  // } catch (error) {
  //   res.status(500).json({ message: error });
  // }

  const query =
    `SELECT huse.*, hrole.*  FROM hoome_user_acl AS huse LEFT JOIN hoome_role_users AS hrole 
    ON huse.hoomeRoleUserRoleID = hrole.role_ID WHERE email='${email}'`

  try {
    connection.query(query, async (error, result) => {
      if (error) throw error
      if (!result.length) {
        res.status(202).json({ message: 'email_not_found' })
      } else {
        const hashedPassword = await bcrypt.compare(password, result[0].password)
        if (hashedPassword) {
          res.status(200).json({ message: 'success', res: result[0] })
        } else {
          res.status(200).json({ message: 'error_password' })
        }
      }
    })
  } catch (error) {
    res.status(400).json({ message: error })
  }
});

app.post("/checkDuplicate", (req, res) => {
  const email = req.body.email;
  const sql = `select * from hoome_user_acl where email = '${email}'`;
  connection.query(sql, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error checking duplication" });
      throw error;
    }
    if (result.length > 0) {
      res.status(403).json({
        error: "Got duplication",
        res: result[0],
      });
    } else {
      const sql_main = `select * from hoome_main_user where email = '${email}'`;
      connection.query(sql_main, async (error, result) => {
        if (error) {
          res.status(500).json({ error: "Error checking duplication" });
          throw error;
        }
        if (result.length > 0) {
          res.status(403).json({
            error: "User is already registered",
            res: result[0],
          });
        } else {
          res.status(200).json({
            success: "No duplication",
            res: result[0],
          });
        }
      });
    }
  });
});

app.get("/role-user/:id", (req, res) => {
  const request = `SELECT role_ID, code_role, label, active FROM hoome_role_users WHERE role_ID = ${req.params.id}`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting role" });
      throw error;
    }
    res.status(200).json({
      success: "Role successfully got",
      res: result[0],
    });
  });
});

app.get("/ACLforCEC/:id", (req, res) => {
  const request = `SELECT * FROM hoome_user_acl WHERE CEC_ID = ${req.params.id}`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting CECs's ACL" });
      throw error;
    }
    res.status(200).json({
      success: "CECs's ACL successfully got",
      res: result,
    });
  });
});

app.get("/ACLforACLSpecific/:id", (req, res) => {
  const request = `SELECT * FROM hoome_user_acl WHERE ACL_ID = ${req.params.id}`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting ACLs's ACL" });
      throw error;
    }
    res.status(200).json({
      success: "ACLs's ACL successfully got",
      res: result,
    });
  });
});

// app.get('/ACLforADA/:id', (req, res) => {
//     const request = `SELECT * FROM hoome_user_acl WHERE ADA_ID = ${req.params.id}`;
//     connection.query(request, (error, result) => {
//         if (error) {
//             res.status(500).json({ error: 'Error getting ADAs\'s ACL' });
//             throw error;
//         }
//         res.status(200).json({
//             success: 'ADAs\'s ACL successfully got',
//             res: result
//         });
//     });
// });

// app.get('/ACLforADM/:id', (req, res) => {
//     const request = `SELECT * FROM hoome_user_acl WHERE ADM_ID = ${req.params.id}`;
//     connection.query(request, (error, result) => {
//         if (error) {
//             res.status(500).json({ error: 'Error getting ADMs\'s ACL' });
//             throw error;
//         }
//         res.status(200).json({
//             success: 'ADMs\'s ACL successfully got',
//             res: result
//         });
//     });
// });

// app.get('/ACLforADV/:id', (req, res) => {
//     const request = `SELECT * FROM hoome_user_acl WHERE ADV_ID = ${req.params.id}`;
//     connection.query(request, (error, result) => {
//         if (error) {
//             res.status(500).json({ error: 'Error getting ADVs\'s ACL' });
//             throw error;
//         }
//         res.status(200).json({
//             success: 'ADVs\'s ACL successfully got',
//             res: result
//         });
//     });
// });

// app.get('/ACLforCBI/:id', (req, res) => {
//     const request = `SELECT * FROM hoome_user_acl WHERE CBI_ID = ${req.params.id}`;
//     connection.query(request, (error, result) => {
//         if (error) {
//             res.status(500).json({ error: 'Error getting CBIs\'s ACL' });
//             throw error;
//         }
//         res.status(200).json({
//             success: 'CBIs\'s ACL successfully got',
//             res: result
//         });
//     });
// });

// app.get('/ACLforPAR/:id', (req, res) => {
//     const request = `SELECT * FROM hoome_user_acl WHERE PAR_ID = ${req.params.id}`;
//     connection.query(request, (error, result) => {
//         if (error) {
//             res.status(500).json({ error: 'Error getting PARs\'s ACL' });
//             throw error;
//         }
//         res.status(200).json({
//             success: 'PARs\'s ACL successfully got',
//             res: result
//         });
//     });
// });

// ========================================= CEC notes privées ==============================================
app.get("/note_privees", (req, res) => {
  const request = `SELECT user_acl_ID, note_privees FROM hoome_user_acl`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting CEC's private notes" });
      throw error;
    }
    res.status(200).json({
      success: "CEC's private notes successfully got",
      res: result,
    });
  });
});

app.get("/note_privee/:id", (req, res) => {
  const request = `SELECT user_acl_ID, note_privees FROM hoome_user_acl WHERE user_acl_ID = ${req.params.id}`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting ACL's private notes" });
      throw error;
    }
    res.status(200).json({
      success: "ACL's private notes successfully got",
      res: result,
    });
  });
});

app.post("/note_privee_update/:id", (req, res) => {
  const note_privee = req.body.note_privee;
  const request = `UPDATE hoome_user_acl SET note_privees = '${note_privee}' WHERE user_acl_id = ${req.params.id}`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error updating private note" });
      throw error;
    }
    res.status(200).json({
      success: "Private note successfully updated",
      res: result[0],
    });
  });
});

// ======================================== DOCUMENTS ========================================================

app.get("/documents", (req, res) => {
  // let data = fs.readFileSync(__dirname + '/documents/documments.json', { encoding: 'utf8' });
  // data = JSON.parse(data);
  // res.status(200).send(data);
  const request = `select * from hoome_documents`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({
        error: "Error getting documents",
      });
      throw error;
    }
    res.status(200).json({
      success: "Documents successfully getted",
      res: result,
    });
  });
});

app.get("/documents/:id", (req, res) => {
  let request = "";
  if (parseInt(req.params.id) === NaN) {
    request = `SELECT * FROM hoome_documents WHERE ref_unique = '${req.params.id}'`;
  } else {
    request = `SELECT * FROM hoome_documents WHERE document_ID = ${parseInt(
      req.params.id
    )}`;
  }
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({
        error: "Error getting document",
      });
      throw error;
    }
    res.status(200).json({
      success: "Document successfully getted",
      res: result[0],
    });
  });
});

app.get("/document-id/:id", (req, res) => {
  const sql = `SELECT document_ID FROM hoome_documents WHERE ref_unique = '${req.params.id}'`;
  connection.query(sql, (error, result) => {
    if (error) {
      res.status(500).json({
        error: "Error getting document Id",
      });
      throw error;
    }
    res.status(200).json({
      success: "Document Id successfully getted",
      res: result[0],
    });
  });
});

app.get("/document-user/:id", (req, res) => {
  const sql = `SELECT user_acl_ID, document_ID, name FROM hoome_acl_document WHERE user_acl_ID = ${req.params.id}`;
  connection.query(sql, (error, result) => {
    if (error) {
      res.status(500).json({
        error: "Error getting document user",
      });
      throw error;
    }
    res.status(200).json({
      success: "Document user successfully getted",
      res: result,
    });
  });
});

app.post("/addDocuments", async (req, res) => {
  /**
   * updated on 2020/09/19 by tefy.
   * refactor is needed for this endpoint...
   */
  let data = fs.readFileSync(__dirname + "/documents/documments.json", {
    encoding: "utf8",
  });
  data = JSON.parse(data);

  let final_sql_script = ``;
  for (let i = 0; i < data.length; i++) {
    const sql = `insert into hoome_documents (sens, section, theme, ref_unique, texte_long, texte_court) values ("${data[i].sens}", "${data[i].section}", "${data[i].theme}", "${data[i].ref_unique}", "${data[i].texte_long}", "${data[i].texte_court}");`;
    final_sql_script += sql;
    await connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({
          error: "Error Adding documents",
        });
        throw err;
      }
    });
    if (i === data.length - 1) {
      res.status(200).json({
        success: "Documents user successfully Added",
        res: data,
      });
    }
  }
  // console.log(final_sql_script);
  // fs.writeFileSync(__dirname + "/documents/documents.sql", final_sql_script);
  // connection.query(final_sql_script, (err, result) => {
  // 	if (err) {
  // 		console.log(JSON.stringify(err));
  // 		res.status(500).json({
  // 			error: "Error Adding documents",
  // 		});
  // 		throw err;
  // 	}
  // 	res.status(200).json({
  // 		success: "Documents user successfully Added",
  // 		res: data,
  // 	});
  // });
});

app.post("/addDocument", (req, res) => {
  const sens = req.body.sens;
  const section = req.body.section;
  const theme = req.body.theme;
  const ref_unique = req.body.ref_unique;
  const texte_long = req.body.texte_long;
  const texte_court = req.body.texte_court;

  const sql = `insert into hoome_documents
    (sens, section, theme, ref_unique, texte_long, texte_court)
    values ("${sens}", "${section}", "${theme}", "${ref_unique}", "${texte_long}", "${texte_court}")`;

  connection.query(sql, (error, result) => {
    if (error) {
      res.status(500).json({
        error: "Error Adding document",
      });
      throw error;
    }
    res.status(200).json({
      success: "Document successfully Added",
      res: result[0],
    });
  });
});

app.post("/deleteDocument", (req, res) => {
  const document_ID = req.query.document_ID;
  const sql = `delete from hoome_documents where document_ID='${document_ID}'`;

  connection.query(sql, (error, result) => {
    if (error) {
      res.status(500).json({
        error: "Error Deleting document",
      });
      throw error;
    }
    res.status(200).json({
      success: "Document successfully Deleted",
      res: result[0],
    });
  });
});

app.post("/upload/:id", (req, res) => {
  const user_acl_ID = parseInt(req.params.id);
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({
        error: "Error uploading document",
      });
      throw err;
    }
  });
  form.on("fileBegin", async (name, file) => {
    let path_file = "";
    const f_arr = file.name.split(".");
    const file_extension = f_arr[f_arr.length - 1];
    // move temp file to upload folder
    file.path = path.join(
      __dirname,
      "uploads",
      `${user_acl_ID}`,
      `${name}.${file_extension}`
    );
    path_file = await file.path.replace(/\\/g, `\\\\`);
    // insert to database
    const sql = `INSERT INTO hoome_acl_document (user_acl_ID, document_ID, name, server_path, created_at) 
		VALUES (${user_acl_ID}, (SELECT document_ID FROM hoome_documents WHERE ref_unique = '${name}'), '${name}.${file_extension}', '${path_file}', NOW())`;
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(500).json({
          error: "Error saving document",
        });
        throw error;
      }
      res.status(200).json({
        success: "Document Saved",
        res: result[0],
      });
    });
  });
});

app.get("/read-file/:id/:path", (req, res) => {
  const sql = `SELECT server_path FROM hoome_acl_document WHERE user_acl_ID = ${req.params.id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    // searching to current dir
    const r = result.filter((elem) => {
      let arr_res = [];
      if (elem.server_path.indexOf("/") > -1) {
        arr_res = elem.server_path.split("/");
      }
      if (elem.server_path.indexOf("\\") > -1) {
        arr_res = elem.server_path.split("\\");
      }
      const length = arr_res.length;
      if (length > 0) {
        const file_name = arr_res[length - 1].split(".")[0];
        return file_name === req.params.path;
      }
    });
    // read file
    if (r.length > 0) {
      const dir = r[0].server_path;
      let arr_dir = [];
      if (dir.indexOf("/") > -1) {
        arr_dir = dir.split("/");
      }
      if (dir.indexOf("\\") > -1) {
        arr_dir = dir.split("\\");
      }
      const file_extension = arr_dir[arr_dir.length - 1].split(".")[1];
      fs.readFile(dir, (err, data) => {
        if (err) {
          res.status(500).json({
            error: "Error Reading file",
          });
          throw err;
        } else {
          if (file_extension.toUpperCase() === "TXT") {
            res.contentType("text/plain");
            res.status(200).send(data);
          } else if (file_extension.toUpperCase() === "PDF") {
            res.contentType("application/pdf");
            res.status(200).send(data);
          } else if (file_extension.toUpperCase() === "DOC") {
            res.contentType("application/msword");
            res.status(200).send(data);
          } else if (file_extension.toUpperCase() === "DOCX") {
            res.contentType(
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            );
            res.status(200).send(data);
          } else if (file_extension.toUpperCase() === "XLS") {
            res.contentType("application/vnd.ms-excel");
            res.status(200).send(data);
          } else if (file_extension.toUpperCase() === "XLSX") {
            res.contentType(
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.status(200).send(data);
          } else if (
            file_extension.toUpperCase() === "JPG" ||
            file_extension.toUpperCase() === "JPEG"
          ) {
            res.contentType("image/jpeg");
            res.status(200).send(data);
          } else if (file_extension.toUpperCase() === "PNG") {
            res.contentType("image/png");
            res.status(200).send(data);
          }
        }
      });
    }
  });
});

app.get("/download/:path/:dossier", (req, res) => {
  let arr_dir = [];
  const file_path = path.join(
    __dirname,
    `${req.params.dossier}`,
    `${req.params.path}`
  );
  if (file_path.indexOf("/") > -1) {
    arr_dir = file_path.split("/");
  }
  if (file_path.indexOf("\\") > -1) {
    arr_dir = file_path.split("\\");
  }
  const file_extension = arr_dir[arr_dir.length - 1].split(".")[1];
  fs.readFile(file_path, (err, data) => {
    if (err) {
      res.status(404).json({
        error: "Error Downloading file",
      });
      res.end();
    } else {
      if (file_extension.toUpperCase() === "PDF") {
        res.contentType("application/pdf");
        res.download(file_path);
        res.status(200);
      } else if (file_extension.toUpperCase() === "DOC") {
        res.contentType("application/msword");
        res.download(file_path);
        res.status(200);
      } else if (file_extension.toUpperCase() === "DOCX") {
        res.contentType(
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        res.download(file_path);
        res.status(200);
      } else if (file_extension.toUpperCase() === "XLS") {
        res.contentType("application/vnd.ms-excel");
        res.download(file_path);
        res.status(200);
      } else if (file_extension.toUpperCase() === "XLSX") {
        res.contentType(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.download(file_path);
        res.status(200);
      }
    }
  });
});

// ========================================================== DOCUMENT RULES =======================================

app.get("/rules", (req, res) => {
  const sql = `SELECT theme, information, clause, document FROM hoome_document_rules`;
  connection.query(sql, (error, result) => {
    if (error) {
      res.status(500).json({
        error: "Error getting document rules",
      });
      throw error;
    }
    res.status(200).json({
      success: "Document rules successfully getted",
      res: result,
    });
  });
});

app.get("/rules/:id", (req, res) => {
  let request = "";
  if (isNaN(parseInt(req.params.id))) {
    request = `SELECT * FROM hoome_document_rules WHERE theme = '${req.params.id}'`;
  } else {
    request = `SELECT * FROM hoome_document_rules WHERE ID_doc_rule = ${req.params.id}`;
  }
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({
        error: "Error getting document rule",
      });
      throw error;
    }
    res.status(200).json({
      success: "Document rule successfully getted",
      res: result,
    });
  });
});

app.post("/addRules", (req, res) => {
  let data = fs.readFileSync(__dirname + "/rules/documents_rules.json", {
    encoding: "utf-8",
  });
  data = JSON.parse(data);
  const delete_entries = `DELETE FROM hoome_document_rules`;
  connection.query(delete_entries, (err, result) => {
    if (err) {
      res.status(500).json({
        error: "Error Deleting lines in table",
      });
      throw err;
    }
  });
  const reset_auto_increment =
    "ALTER TABLE hoome_document_rules AUTO_INCREMENT = 0";
  connection.query(reset_auto_increment, (err, result) => {
    if (err) {
      res.status(500).json({
        error: "Error Deleting lines in table",
      });
      throw err;
    }
  });
  for (let i = 0; i < data.length; i++) {
    const sql = `INSERT INTO hoome_document_rules (theme, information, clause, document) VALUES ("${data[i].theme}", "${data[i].information}", "${data[i].condition}", "${data[i].documents}")`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({
          error: "Error Adding document rules",
        });
        throw err;
      }
    });
  }
  res.status(200).json({
    success: "Documents rules successfully Added",
    res: data,
  });
});

app.put("/update-rule/:id/:document", (req, res) => {
  const request = `UPDATE hoome_document_rules SET document = CONCAT(document, ', ${req.params.document}') WHERE ID_doc_rule = ${req.params.id};`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error updating document rule" });
      throw error.message;
    }
    res.status(200).json({
      success: "Document rule successfully updated",
      res: result,
    });
  });
});

app.get("/rules-file", (req, res) => {
  let data = fs.readFileSync(__dirname + "/rules/documents_rules.json", {
    encoding: "utf-8",
  });
  data = JSON.parse(data);
  console.log(["Valuer data :", data]);
  res.status(200).json({
    success: "Document rules successfully getted",
    res: data,
  });
});

// ========================================================= Statistics ================================================================
app.get("/statistics-file", (req, res) => {
  try {
    const statistics_path = path.join(
      __dirname,
      "statistics",
      "statistics.json"
    );
    let data = fs.readFileSync(statistics_path, {
      encoding: "utf-8",
    });
    data = JSON.parse(data);
    res.status(200).json({
      success: "Statistics successfully getted",
      res: data,
    });
  } catch (error) {
    console.log(`error in /statistics-file: ${JSON.stringify(error)}`);
  }
});

// =================================================================== UPLOADS =========================================================

app.get("/uploads/:file", function (req, res) {
  file = req.params.file;
  var img = fs.readFileSync(__dirname + "/uploads/" + file);
  res.writeHead(200, { "Content-Type": "application/pdf" });
  res.end(img, "binary");
});

app.get("/uploads-file/:file", (req, res) => {
  file = req.params.file;
  const docPath = path.join(__dirname + "/uploads/" + file);
  res.download(docPath, file, null);
});

app.get("/uploads-file-general/:file", (req, res) => {
  file = req.params.file;
  var fileValue = fs.readFileSync(__dirname + "/uploads_file/" + file);
  res.end(fileValue, "binary");
  // const docPath = path.join(__dirname + "/uploads_file/" + file);
  //res.writeHead(200, { "Content-Type": "application/pdf" });
  // res.download(docPath, file, null);
});

// =================================================================== DIRECTORY =========================================================

app.put("/create-dir-upload/:id", (req, res) => {
  const user_acl_ID = parseInt(req.params.id);
  let server_path = "";
  server_path = path.join(__dirname, "uploads", `${user_acl_ID}`);
  hoome_utils.create_dir(server_path);
  res
    .status(200)
    .json({ success: "Directory for document successfully created" });
});

app.put("/create-dir-upload", (req, res) => {
  const url_request = `${process.env.API_URL}/list-ACL`;
  let request = http.request(url_request, (r) => {
    r.on("readable", () => {
      const list = JSON.parse(r.read());
      const lenght = list.res.length;
      for (let i = 0; i < lenght; i++) {
        let server_path = "";
        server_path = path.join(
          __dirname,
          "uploads",
          `${list.res[i].user_acl_ID}`
        );
        hoome_utils.create_dir(server_path);
      }
      res
        .status(200)
        .json({ success: "Directory for document successfully created" });
    });
  });
  request.end();
});

app.put("/create-file/:id", (req, res) => {
  const dossier = req.body.dossier;
  const file = req.body.file;
  const extension = req.body.extension;
  const content = req.body.content;
  const user_acl_ID = parseInt(req.params.id);
  let server_path = "";
  server_path = path.join(
    __dirname,
    dossier,
    `${user_acl_ID}_${file}.${extension}`
  );
  hoome_utils.create_file(server_path, `${content}`);
  res.status(200).json({ success: "File successfully created" });
});

app.put("/create-file", (req, res) => {
  const dossier = req.body.dossier;
  const file = req.body.file;
  const extension = req.body.extension;
  const content = req.body.content;
  const url_request = `${process.env.API_URL}/list-ACL`;
  let request = http.request(url_request, (r) => {
    r.on("readable", () => {
      const list = JSON.parse(r.read());
      const lenght = list.res.length;
      for (let i = 0; i < lenght; i++) {
        let server_path = "";
        server_path = path.join(
          __dirname,
          dossier,
          `${user_acl_ID}_${file}.${extension}`
        );
        hoome_utils.create_file(server_path, `${content}`);
      }
      res
        .status(200)
        .json({ success: "Directory for document successfully created" });
    });
  });
  request.end();
});

// ======================================================= PDF - Download ===============================================================
app.get("/list-download", (req, res) => {
  const request =
    "SELECT user_acl_ID, email FROM hoome_acl_document_download";
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting list document download" });
      throw error;
    }
    res.status(200).json({
      success: "List document download successfully got",
      res: result,
    });
  });
});

app.get("/list-download/:id", (req, res) => {
  let request = `SELECT * FROM hoome_acl_document_download WHERE acl_document_ID = ${req.params.id}`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting document download" });
      throw error;
    }
    res.status(200).json({
      success: "document download successfully got",
      res: result[0],
    });
  });
});

app.get("/list-download-user/:id", (req, res) => {
  let request = `SELECT * FROM hoome_acl_document_download WHERE user_acl_ID = ${req.params.id}`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error getting document download" });
      throw error;
    }
    res.status(200).json({
      success: "document download successfully got",
      res: result,
    });
  });
});

app.post("/pdf-download", async (req, res) => {
  const user_acl_ID = req.body.user_acl_ID;
  const ref_unique = req.body.ref_unique;
  const signature_electronique = req.body.signature_electronique;
  const message = req.body.messages;

  let server_path = path.join(
    __dirname,
    "download",
    `${user_acl_ID}`,
    `${ref_unique}.pdf`
  );

  server_path = await server_path.replace(/\\/g, `\\\\`);

  const request = `INSERT INTO hoome_acl_document_download (user_acl_ID, document_ID, ref_unique, signature_electronique, server_path, created_at, message)
	VALUES (${user_acl_ID}, (SELECT document_ID FROM hoome_documents WHERE ref_unique = '${ref_unique}'), '${ref_unique}', ${signature_electronique}, '${server_path}', NOW(), '${message}')`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error updating private note" });
      throw error;
    }
    res.status(200).json({
      success: "Private note successfully updated",
      res: result[0],
    });
  });
});

app.put("/set-pdf-download", (req, res) => {
  const signature_electronique = req.body.signature_electronique;
  const ref_unique = req.body.ref_unique;
  const request = `UPDATE hoome_acl_document_download SET signature_electronique = ${signature_electronique} WHERE ref_unique = '${ref_unique}'`;
  connection.query(request, (error, result) => {
    if (error) {
      res.status(500).json({ error: "Error updating private note" });
      throw error;
    }
    res.status(200).json({
      success: "Private note successfully updated",
      res: result[0],
    });
  });
});

app.post("/sendMail", async (req, res) => {
  const nodemailer = require("nodemailer");
  const { google } = require("googleapis");
  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(
    "15599357168-hc2ofr5fok6mem1ogcbncsjo0asln78v.apps.googleusercontent.com", // ClientID
    "9J9nSXs4FrGOS2bAZ1Egk_57", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );
  oauth2Client.setCredentials({
    refresh_token:
      "1//04McxuUzJ_J3-CgYIARAAGAQSNwF-L9IrvS9WuWFa3g_24NWbR6KksQZDUEs_6QtZs8brN6ldtYgnOmNeuLBfgYijZxBcFfky11Y",
  });
  const accessToken = oauth2Client.getAccessToken();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "hoomeadm@gmail.com",
      clientId:
        "15599357168-hc2ofr5fok6mem1ogcbncsjo0asln78v.apps.googleusercontent.com",
      clientSecret: "9J9nSXs4FrGOS2bAZ1Egk_57",
      refreshToken:
        "1//04McxuUzJ_J3-CgYIARAAGAQSNwF-L9IrvS9WuWFa3g_24NWbR6KksQZDUEs_6QtZs8brN6ldtYgnOmNeuLBfgYijZxBcFfky11Y",
      accessToken: accessToken,
    },
  });

  const email = req.body.email;
  const subject = req.body.subject;
  const html_message = req.body.html;
  let info = await transporter.sendMail(
    {
      from: "hoomeadm@gmail.com", // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      // text: "Hello world?", // plain text body
      html: html_message, // html body
    },
    (err, info) => {
      err
        ? res.status(500).json({ state: "error", error: err })
        : res.status(200).json({ state: "mail_send" });
      transporter.close();
    }
  );

  // res.status(200).json(info.messageId);
});

/**
 * Commentaire API in Send Email   | 
 */
// const mailgun = require("mailgun-js");
// const DOMAIN = "sandbox0d54045de52a4e5eabffa57908410143.mailgun.org";
// const mg = mailgun({
// 	apiKey: "3193089eb1174e33c6898bd7c98ee31f-9dda225e-6237fc64",
// 	domain: DOMAIN,
// });
// const email = req.body.email;
// const subject = req.body.subject;
// const html_message = req.body.html;
// const data = {
// 	from: "Hoome Administrator <me@samples.mailgun.org>",
// 	to: email,
// 	subject: subject,
// 	html: html_message,
// };
// mg.messages().send(data, function (error, body) {
// 	if (error) {
// 		console.log(`error when sending email: ${error}`);
// 		res.json({ error: "Erreur lors de l'envoi de l'email" });
// 	} else {
// 		res.json({ success: "L'email a bien été envoyé" });
// 	}
// });

// https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1


app.post("/sendNotification_to_mail", async (req, res) => {
  const nodemailer = require("nodemailer");
  const { google } = require("googleapis");
  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(
    "15599357168-hc2ofr5fok6mem1ogcbncsjo0asln78v.apps.googleusercontent.com", // ClientID
    "9J9nSXs4FrGOS2bAZ1Egk_57", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );
  oauth2Client.setCredentials({
    refresh_token:
      "1//04McxuUzJ_J3-CgYIARAAGAQSNwF-L9IrvS9WuWFa3g_24NWbR6KksQZDUEs_6QtZs8brN6ldtYgnOmNeuLBfgYijZxBcFfky11Y",
  });
  const accessToken = oauth2Client.getAccessToken();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "hoomeadm@gmail.com",
      clientId:
        "15599357168-hc2ofr5fok6mem1ogcbncsjo0asln78v.apps.googleusercontent.com",
      clientSecret: "9J9nSXs4FrGOS2bAZ1Egk_57",
      refreshToken:
        "1//04McxuUzJ_J3-CgYIARAAGAQSNwF-L9IrvS9WuWFa3g_24NWbR6KksQZDUEs_6QtZs8brN6ldtYgnOmNeuLBfgYijZxBcFfky11Y",
      accessToken: accessToken,
    },
  });

  const email = req.body.email;
  const subject = req.body.subject;
  const html_message = req.body.html;
  let info = await transporter.sendMail(
    {
      from: "hoomeadm@gmail.com", // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: html_message, // html body
    },
    (err, info) => {
      err
        ? res.status(500).json(`Erreur lors de l'envoi du mail: ${err}`)
        : res.status(200).json(`L'email a été envoyé`);
      transporter.close();
    }
  );
});


// Creation Server

// // Certificate
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/1274.fr/privkey.pem;', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/1274.fr/fullchain.pem;', 'utf8');
// // const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

// const credentials = {
// 	key: privateKey,
// 	cert: certificate
// 	// ca: ca
// };

// httpsServer.listen(443, () => {
// 	console.log('HTTPS Server running on port 443');
// });

// Starting both http & https servers
const httpServer = http.createServer(app);

httpServer.listen(3000, () => {
  console.log("HTTP Server running on port 3000");
});

// app.listen(3000, () => {
//   console.log("server is running on port 3000 ");
// });

// test pour push melman
// test repush
// third test

module.exports = app;
