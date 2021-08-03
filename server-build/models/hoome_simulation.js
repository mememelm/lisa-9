module.exports = (sequelize, type) => {
	return sequelize.define(
		"hoome_simulation",
		{
			simulation_ID: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			user: {
				type: type.INTEGER,
			},
			endettement: {
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
