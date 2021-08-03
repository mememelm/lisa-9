"use-strict";

const hoomeUserAcl = (sequelize, type) => {
  const user = sequelize.define(
    "hoome_user_acl",
    {
      user_acl_ID: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: type.STRING,
      password: type.STRING,
      salary: type.DOUBLE,
      birthday: type.STRING,
      resident_french: type.STRING,
      carte_sejour: type.STRING,
      date_sejour: type.STRING,
      date_mariage: type.STRING,
      civility: type.STRING,
      lastname: type.STRING,
      firstname: type.STRING,
      phone_number: type.STRING,
      address: type.STRING,
      fonction: type.STRING,
      loyer: type.DOUBLE,
      situation_familiale: type.STRING,
      train_de_vie: type.STRING,
      income: type.DOUBLE,
      enfants: type.INTEGER,
      profile_pic: type.STRING,
      postal_code: type.STRING,
      city: type.STRING,
      nationalite: type.STRING,
      ages_enfants: type.STRING,
      nb_enfants_charges: type.INTEGER,
      logement: type.STRING,
      pays: type.STRING,
      employeur: type.STRING,
      type_contrat: type.STRING,
      prive: type.BOOLEAN,
      publique: type.BOOLEAN,
      anciennete: type.STRING,
      banque: type.STRING,
      banque_sollicite: type.STRING,
      credit_encours: type.STRING,
      patrimoine: type.STRING,
      courtier_sollicite: type.STRING,
      simulation: type.STRING,
      bnc_bic_2019: type.STRING,
      bnc_bic_2018: type.STRING,
      ADG_ID: type.INTEGER,
      ADA_ID: type.INTEGER,
      ADM_ID: type.INTEGER,
      CEC_ID: type.INTEGER,
      CBI_ID: type.INTEGER,
      PAR_ID: type.INTEGER,
      ADV_ID: type.INTEGER,
      ACL_ID: type.INTEGER,
      note_privees: type.STRING,
      progression: {
        type: type.INTEGER,
        defaultValue: 0,
      },
      account_state: {
        type: type.BOOLEAN,
        defaultValue: 0,
      },
      toque_number: type.STRING
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return user;
};

module.exports = { hoomeUserAcl };
