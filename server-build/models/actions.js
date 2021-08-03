module.exports = (sequelize, type) => {
	return sequelize.define(
		"actions",
		{
			id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			//sens, section, theme, ref_unique, texte_long, texte_court
			resource_id: type.STRING,
			resource_type: type.STRING,
			actor_id: type.STRING,
			actor_type: type.STRING,
			event: type.STRING,
			context: type.STRING
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
};
