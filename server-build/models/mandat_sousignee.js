"use strict";

const MandatSousignee = (Sequelize, sequelize) => {
  const mandatSousignee = sequelize.define(
    "mandat_sousignee",
    {
      // Generalite
      refe_doss: Sequelize.STRING,
      type_mand: Sequelize.STRING,
      // Client vendeur 1
      cli1_first_name: Sequelize.STRING,
      cli1_last_name: Sequelize.STRING,
      cli1_date_birth: Sequelize.DATE,
      cli1_place_birth: Sequelize.STRING,
      cli1_address: Sequelize.STRING,
      cli1_nationality: Sequelize.STRING,
      // Client vendeur 2
      cli2_first_name: Sequelize.STRING,
      cli2_last_name: Sequelize.STRING,
      cli2_date_birth: Sequelize.DATE,
      cli2_place_birth: Sequelize.STRING,
      cli2_address: Sequelize.STRING,
      cli2_nationality: Sequelize.STRING,
      // Client societé
      cli_soci_name: Sequelize.STRING,
      cli_soci_capi: Sequelize.INTEGER,
      cli_soci_num_uni_ident: Sequelize.STRING,
      cli_soci_rcs: Sequelize.STRING,
      cli_soci_sieg: Sequelize.STRING,
      cli_soci_dir: Sequelize.STRING,
      cli_soci_dir_role: Sequelize.STRING,
      // Avocat Mandataire
      avi_mand_name: Sequelize.STRING,
      avi_mand_capi: Sequelize.STRING,
      avi_mand_num_uni_ident: Sequelize.STRING,
      avi_mand_rcs: Sequelize.STRING,
      avi_mand_sieg: Sequelize.STRING,
      avi_mand_dir: Sequelize.STRING,
      avi_mand_dir_role: Sequelize.STRING,
      // Objet du mandat 
      obj_proj_sess: Sequelize.STRING,
      obj_bati_comm: Sequelize.STRING,
      obj_adre: Sequelize.STRING,
      obj_type_des: Sequelize.STRING,
      obj_descr: Sequelize.STRING,
      obj_nomb_lot: Sequelize.STRING,
      // conditions financière
      cf_prix_net: Sequelize.INTEGER,
      cf_cond_part: Sequelize.STRING,
      cf_marg_neg: Sequelize.INTEGER,
      // Honoraire fixe de l'avi mandataire
      hf_hono_fixe_ht: Sequelize.INTEGER,
      hf_tout_taxe: Sequelize.INTEGER,
      hf_hono_fixe_ttc: Sequelize.INTEGER,
      hf_mod_pai: Sequelize.STRING,
      // Honoraire complementaire de avi mandataire
      hc_pour_hono_ht: Sequelize.INTEGER,
      hc_prop_ht: Sequelize.INTEGER,
      hc_pour_hono_ttc: Sequelize.INTEGER,
      hc_prop_ttc: Sequelize.INTEGER,
      hc_mod_pai: Sequelize.STRING,
      hc_disp_part: Sequelize.STRING,
      // Exclusivité
      excl_mand_acce_acte: Sequelize.STRING,
      excl_soci: Sequelize.STRING,
      excl_capi: Sequelize.STRING,
      excl_num_uni_ident: Sequelize.INTEGER,
      excl_mand_rcs: Sequelize.STRING,
      excl_mand_sieg: Sequelize.STRING,
      excl_mand_dir: Sequelize.STRING,
      excl_mand_dir_role: Sequelize.STRING,
      // Courriel directives 
      cd_courriel: Sequelize.STRING,
      // Validation finale 
      vd_lieu: Sequelize.STRING,
      vd_date: Sequelize.DATE,
      vd_sieg_avi_mand: Sequelize.INTEGER,
      sign_cli: Sequelize.STRING,
      sign_avi: Sequelize.STRING
    },
    { freezaTableName: true }
  );

  return mandatSousignee;
};

module.exports = { MandatSousignee };
