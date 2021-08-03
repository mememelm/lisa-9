module.exports = (sequelize, type) => {
	return sequelize.define(
		"notification",
		{
			notification_ID: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			target: {
				type: type.INTEGER,
				allowNull: false,
			},
			content: {
				type: type.STRING,
				allowNull: false,
			},
			when: {
				type: type.STRING,
				defaultValue: "",
			},
			seen: {
				type: type.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
};
