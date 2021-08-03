module.exports = (sequelize, type) => {
	return sequelize.define(
		"hoome_documents",
		{
			document_ID: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			//sens, section, theme, ref_unique, texte_long, texte_court
			sens: type.STRING,
			section: type.STRING,
			theme: type.STRING,
			ref_unique: type.STRING,
			texte_long: type.STRING,
			texte_court: type.STRING,
			file: type.BLOB
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
};
