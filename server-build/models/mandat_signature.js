"use strict";

const MandatSignature = (Sequelize, sequelize) => {
  const mandatSignature = sequelize.define(
    "mandat_signature",
    {
      type_bien: Sequelize.STRING,                  // BIEN EN COPROPRIETE / TERRAIN A BATIR /   MAISON INDIVIDUEL
      just_prop: Sequelize.STRING,                  // Justificatif de propriété
      card_iden_vend: Sequelize.STRING,             // Pièce(s) d’identité du/des Vendeur(s), et de l’ensemble des associés si SCI
      stat: Sequelize.STRING,                       // Statuts (Si SCI)
      kbis_3_mont: Sequelize.STRING,                // Kbis de moins de trois mois (Si SCI)
      plan_appa: Sequelize.STRING,                  // Plan de l’appartement
      dete_fume: Sequelize.BOOLEAN,                 // Détecteur de fumée
      proc_verb_3_last: Sequelize.STRING,           // 3 derniers procès-verbaux d’Assemblée Générale
      appe_char_trim_4_last: Sequelize.STRING,      // 4  derniers relevés trimestriels d’appel de charges
      fonc_taxe_last: Sequelize.STRING,             // Dernière taxe Foncière
      habi_taxe_last: Sequelize.STRING,             // Dernière taxe d’Habitation (si propriétaire occupant)
      rapp_born_geom: Sequelize.STRING,             // Rapport de bornage du géomètre 
      copr_proc_load: Sequelize.STRING,             // Procédure en cours dans la copropriété 
      copr_lots_numb: Sequelize.STRING,             // Nombre de lots de la copropriété
      bail_loca: Sequelize.STRING,                  // Bail de location 
      leav_lette_loca: Sequelize.STRING,            // Lettre de congé par locataire
      leav_lette_prop: Sequelize.STRING,            // Lettre de congé par proprietaire
      leav_just_prop: Sequelize.STRING,             // Justificatifs A/R ou acte huissier
      fact_edf_plus_1_an: Sequelize.STRING,         // Factures EDF GDF sur 1 an + autres
      law_carrez: Sequelize.STRING,                 // LOI CARREZ - Certificat de surface Loi Carrez au nom des vendeurs - DIAGNOSTIC
      dpe: Sequelize.STRING,                        // DPE - Diagnostic de Performance Énergétique - DIAGNOSTIC
      amiante: Sequelize.STRING,                    // AMIANTE - Diagnostic Amiante Parties Privatives (DAPP) - DIAGNOSTIC
      plomb: Sequelize.STRING,                      // PLOMB – Constat de risque d’exposition au Plomb (CREP) - DIAGNOSTIC
      termites: Sequelize.STRING,                   // TERMITES – État relatif à la présence de Termites et autres Xylophages - DIAGNOSTIC
      erp: Sequelize.STRING,                        // ERP – État des risques et pollutions - DIAGNOSTIC
      gaz: Sequelize.STRING,                        // GAZ - État de l’installation intérieure de Gaz - DIAGNOSTIC
      electricite: Sequelize.STRING,                // ELECTRICITE - État de l’installation intérieure d’électricité - DIAGNOSTIC
      merule: Sequelize.STRING,                     // MERULE – Diagnostic Mérule - DIAGNOSTIC
      bruit: Sequelize.STRING,                      // BRUIT - État des nuisances sonores et aériennes (ENSA) - DIAGNOSTIC
      etud_geot: Sequelize.STRING                   // Étude géotechnique – Étude des sols - DIAGNOSTIC

    },
    { freezaTableName: true }
  );

  return mandatSignature;
};

module.exports = { MandatSignature };
