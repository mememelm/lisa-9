module.exports = (sequelize, type) => {
	return sequelize.define(
		"hoome_main_user",
		{
			main_user_ID: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			email: type.STRING,
			password: type.STRING,
			role_ID: type.INTEGER,
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
};
