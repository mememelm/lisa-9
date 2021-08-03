"use strict";

const HoomeRoleUser = (Sequelize, sequelize) => {
  const hoomeRoleUser = sequelize.define(
    "hoome_role_user",
    {
		role_ID: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		label: Sequelize.STRING,
		abbreviation: Sequelize.STRING,
		active: Sequelize.INTEGER
    },
    { freezaTableName: true, timestamps: false, }
  );

  return hoomeRoleUser;
};

module.exports = { HoomeRoleUser };


