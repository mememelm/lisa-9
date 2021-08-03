module.exports = (sequelize, type) => {
	return sequelize.define(
		"accounts",
		{
			id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			//sens, section, theme, ref_unique, texte_long, texte_court
			username: type.STRING,
			password: type.STRING,
			email: type.STRING,
			type: type.STRING
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
};
