module.exports = (sequelize, type) => {
	return sequelize.define(
		"hoome_project_course",
		{
			project_course_id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			nature_projet: {
				type: type.STRING,
				defaultValue: "",
			},
			choix_type_bien: {
				type: type.STRING,
				defaultValue: "",
			},
			etat_du_bien: {
				type: type.STRING,
				defaultValue: "",
			},
			usage: {
				type: type.STRING,
				defaultValue: "",
			},
			geographie: {
				type: type.STRING,
				defaultValue: "",
			},
			ville: {
				type: type.STRING,
				defaultValue: "",
			},
			pays: {
				type: type.STRING,
				defaultValue: "",
			},
			residence_principale: {
				type: type.STRING,
				defaultValue: "",
			},
			projet_propriete: {
				type: type.STRING,
				defaultValue: "",
			},
			montant_restant: {
				type: type.STRING,
				defaultValue: "",
			},
			credit_mensualite: {
				type: type.STRING,
				defaultValue: "",
			},
			duree_restante: {
				type: type.STRING,
				defaultValue: "",
			},
			etat_avancement: {
				type: type.STRING,
				defaultValue: "",
			},
			nombre_participants: {
				type: type.STRING,
				defaultValue: "",
			},
			montant_total: {
				type: type.STRING,
				defaultValue: "",
			},
			montant_apport_personnel: {
				type: type.STRING,
				defaultValue: "",
			},
			montant_apport: {
				type: type.STRING,
				defaultValue: "",
			},
			epargne_complementaire: {
				type: type.STRING,
				defaultValue: "",
			},
			date_debut: {
				type: type.STRING,
				defaultValue: "",
			},
			date_fin: {
				type: type.STRING,
				defaultValue: "",
			},
			taux: {
				type: type.STRING,
				defaultValue: "",
			},
			situation: {
				type: type.STRING,
				defaultValue: "",
			},
			contrat: {
				type: type.STRING,
				defaultValue: "",
			},
			annees: {
				type: type.STRING,
				defaultValue: "",
			},
			depuis: {
				type: type.STRING,
				defaultValue: "",
			},
			situation_co: {
				type: type.STRING,
				defaultValue: "",
			},
			contrat_co: {
				type: type.STRING,
				defaultValue: "",
			},
			annees_co: {
				type: type.STRING,
				defaultValue: "",
			},
			depuis_co: {
				type: type.STRING,
				defaultValue: "",
			},
			revenus_mensuels: {
				type: type.STRING,
				defaultValue: "",
			},
			primes_annuelles: {
				type: type.STRING,
				defaultValue: "",
			},
			revenus_mensuels_co: {
				type: type.STRING,
				defaultValue: "",
			},
			primes_annuelles_co: {
				type: type.STRING,
				defaultValue: "",
			},
			pension_alimentaire_percue: {
				type: type.STRING,
				defaultValue: "",
			},
			montant_loyer: {
				type: type.STRING,
				defaultValue: "",
			},
			autres_revenus: {
				type: type.STRING,
				defaultValue: "",
			},
			loyer: {
				type: type.STRING,
				defaultValue: "",
			},
			credits_mensualites: {
				type: type.STRING,
				defaultValue: "",
			},
			pension_alimentaire_versee: {
				type: type.STRING,
				defaultValue: "",
			},
			civilite: {
				type: type.STRING,
				defaultValue: "",
			},
			nom: {
				type: type.STRING,
				defaultValue: "",
			},
			prenom: {
				type: type.STRING,
				defaultValue: "",
			},
			date_naissance: {
				type: type.STRING,
				defaultValue: "",
			},
			situation_familiale: {
				type: type.STRING,
				defaultValue: "",
			},
			personnes_charge: {
				type: type.STRING,
				defaultValue: "",
			},
			email: {
				type: type.STRING,
				defaultValue: "",
			},
			telephone: {
				type: type.STRING,
				defaultValue: "",
			},
			civilite_co: {
				type: type.STRING,
				defaultValue: "",
			},
			nom_co: {
				type: type.STRING,
				defaultValue: "",
			},
			prenom_co: {
				type: type.STRING,
				defaultValue: "",
			},
			date_naissance_co: {
				type: type.STRING,
				defaultValue: "",
			},
			email_co: {
				type: type.STRING,
				defaultValue: "",
			},
			telephone_co: {
				type: type.STRING,
				defaultValue: "",
			},
			proposition_banque: {
				type: type.STRING,
				defaultValue: "",
			},
			validation: {
				type: type.STRING,
				defaultValue: "",
			},
			id_acl: {
				type: type.INTEGER,
			},
			collaborators: {
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
