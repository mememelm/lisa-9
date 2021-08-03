module.exports = (sequelize, type) => {
	return sequelize.define(
		"hoome_recommandation_v0",
		{
			recommendation_ID: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			prenom: {
				type: type.STRING,
				defaultValue: "",
			},
			nom: {
				type: type.STRING,
				defaultValue: "",
			},
			phone_number: {
				type: type.STRING,
				defaultValue: "",
			},
			email: {
				type: type.STRING,
				defaultValue: "",
			},
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
};
