module.exports = (sequelize, type) => {
	return sequelize.define(
		"api_keys",
		{
			id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			//sens, section, theme, ref_unique, texte_long, texte_court
			type: type.STRING,
			secret: type.STRING,
			role_id: type.STRING,
			integration_id: type.STRING,
			last_seen_at: type.DATE,
			last_seen_version: type.STRING
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
};
