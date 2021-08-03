"use strict";

const MandatCommercialisation = (Sequelize, sequelize) => {
  const mandatCommercialisation = sequelize.define(
    "mandat_commercialisation",
    {
        prestataire_avi_type: Sequelize.STRING,             // Questionnaire de vente d’un bien immobilier (A remplir par le vendeur)
        prest_avi_id: Sequelize.INTEGER,             // Questionnaire d’état civil de l’acheteur (A remplir par l’acheteur)      
        comm_sign_date: Sequelize.STRING, 
        comm_duree: Sequelize.STRING, 
        bien_local_comm: Sequelize.STRING, 
        bien_local_code_post: Sequelize.STRING, 
        bien_price: Sequelize.STRING, 
        bien_hono_incl: Sequelize.STRING, 
        validation_mandataire: Sequelize.BOOLEAN,
        validation_prestataire: Sequelize.BOOLEAN,
        Signature: Sequelize.BOOLEAN,

        item1_mise_vente_sign: Sequelize.STRING, 
        item1_prep_mise_vente_bien: Sequelize.STRING, 
        item1_commercial_bien: Sequelize.STRING, 
        item1_suivi_sign_notaire: Sequelize.STRING, 
        item2_duration: Sequelize.STRING, 
        item3_prix_net: Sequelize.STRING,
        item4_obligation: Sequelize.STRING,
        
  
    },
    { freezaTableName: true }
  );

  return mandatCommercialisation;
};

module.exports = { MandatCommercialisation };
