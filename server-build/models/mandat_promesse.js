"use strict";

const MandatPromesse = (Sequelize, sequelize) => {
  const mandatPromesse = sequelize.define(
    "mandat_promesse",
    {
      ques_vent_immp: Sequelize.STRING,             // Questionnaire de vente d’un bien immobilier (A remplir par le vendeur)
      ques_civi_ache: Sequelize.STRING,             // Questionnaire d’état civil de l’acheteur (A remplir par l’acheteur)
      card_ident_ache: Sequelize.STRING,            // Pièce(s) d’identité du/des Acheteurs et de l’ensemble des associés (Si SCI)
      stat_sci: Sequelize.STRING,                   // Statuts de la SCI (Si SCI)
      kbis_3_mont: Sequelize.STRING,                // Kbis de moins de trois mois (Si SCI)
      offr_acha_ferm: Sequelize.STRING,             // Offre d’achat ferme
      just_epar: Sequelize.STRING,                  // Justificatif d’épargne (Si apport)
      just_domi_3_mont: Sequelize.STRING,           // Justificatif de domicile de moins de trois mois
      copr_regl: Sequelize.STRING,                  // Règlement de copropriété + tous les modificatifs éventuels
      carn_entr_imme: Sequelize.STRING,             // Carnet d’entretien de l’immeuble
      diag_part_comm: Sequelize.STRING,             // Diagnostics des parties communes
      pre_etat_date: Sequelize.STRING,              // Pré état daté
      compt_annu_charg_last: Sequelize.STRING,      // Dernier compte rendu annuel de charges
      plan_imme: Sequelize.STRING                   // Plans de l’immeuble
  
    },
    { freezaTableName: true }
  );

  return mandatPromesse;
};

module.exports = { MandatPromesse };
