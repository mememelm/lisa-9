const express = require('express');
const router = express.Router();

// import controller 
const eligible = require('../controllers/user_eligible');
const mandat_sousignee = require('../controllers/mandat_sousignee');
const mandat_signature = require('../controllers/mandat_signature');
const mandat_promesse = require('../controllers/mandat_promesse');
const mandat_commercialisation = require('../controllers/mandat_commercialisation');
const lisa_societe = require('../controllers/lisa_societe');
const lisa_vendeur = require('../controllers/lisa_vendeur');
const mandat = require('../controllers/mandat');
const estimation = require('../controllers/estimation_bien');
const role = require('../controllers/role');
const user_acl = require('../controllers/user-acl');


// Routes for user_eligible 
router.post('/eligibles/add', eligible.addUserEligible);
router.post('/eligibles/update', eligible.updateUserEligibles);
//router.get('/eligibles/getAll', eligible.getAllUserEligible);
router.post('/eligibles/search/name', eligible.getByNameUserEligible);
router.post('/eligibles/verify/phone', eligible.verificationByCodeNumberUserEligible);
//router.post('/eligibles/getByUser', authenticate, eligible.getByUsereligible) verificationByCodeNumberUserEligible
router.post('/eligibles/delete', eligible.deleteUserEligible);


// Routes for mandat_sousignee
router.post('/mandat_sousignee/add', mandat_sousignee.addMandatSousignee);
router.post('/mandat_sousignee/update', mandat_sousignee.updateMandatSousignees);
router.get('/mandat_sousignee/getAll', mandat_sousignee.getAllMandatSousignee);
router.post('/mandat_sousignee/search/id', mandat_sousignee.getByIdMandatSousignee);
router.post('/mandat_sousignee/delete', mandat_sousignee.deleteMandatSousignee);


// Routes for mandat_signature
router.post('/mandat_signature/add', mandat_signature.addMandatSignature);
router.post('/mandat_signature/update', mandat_signature.updateMandatSignatures);
router.get('/mandat_signature/getAll', mandat_signature.getAllMandatSignature);
router.post('/mandat_signature/search/id', mandat_signature.getByIdMandatSignature);
router.post('/mandat_signature/delete', mandat_signature.deleteMandatSignature);


// Routes for mandat_promesse
router.post('/mandat_promesse/add', mandat_promesse.addMandatPromesse);
router.post('/mandat_promesse/update', mandat_promesse.updateMandatPromesses);
router.get('/mandat_promesse/getAll', mandat_promesse.getAllMandatPromesse);
router.post('/mandat_promesse/search/id', mandat_promesse.getByIdMandatPromesse);
router.post('/mandat_promesse/delete', mandat_promesse.deleteMandatPromesse);


// Routes for mandat_commercialisation
router.post('/mandat_commercialisation/add', mandat_commercialisation.addMandatCommercialisation);
router.post('/mandat_commercialisation/update', mandat_commercialisation.updateMandatCommercialisations);
router.get('/mandat_commercialisation/getAll', mandat_commercialisation.getAllMandatCommercialisation);
router.post('/mandat_commercialisation/search/id', mandat_commercialisation.getByIdMandatCommercialisation);
router.post('/mandat_commercialisation/delete', mandat_commercialisation.deleteMandatCommercialisation);


// Routes for lisa_societe
router.post('/lisa_societe/add', lisa_societe.addLisaSociete);
router.post('/lisa_societe/update', lisa_societe.updateLisaSocietes);
router.get('/lisa_societe/getAll', lisa_societe.getAllLisaSociete);
router.post('/lisa_societe/search/id', lisa_societe.getByIdLisaSociete);
router.post('/lisa_societe/delete', lisa_societe.deleteLisaSociete);


// Routes for lisa_vendeur
router.post('/lisa_vendeur/add', lisa_vendeur.addLisaVendeur);
router.post('/lisa_vendeur/update', lisa_vendeur.updateLisaVendeurs);
router.get('/lisa_vendeur/getAll', lisa_vendeur.getAllLisaVendeur);
router.post('/lisa_vendeur/search/mandatId', lisa_vendeur.getByMandatIdLisaVendeur);
router.post('/lisa_vendeur/search/id', lisa_vendeur.getByIdLisaVendeur);
router.post('/lisa_vendeur/delete', lisa_vendeur.deleteLisaVendeur);


// Routes for mandat
router.post('/mandat/add', mandat.addMandat);
router.post('/mandat/update', mandat.updateMandats);
router.get('/mandat/getAll', mandat.getAllMandat);
router.post('/mandat/search/id', mandat.getByIdMandat);
router.post('/mandat/delete', mandat.deleteMandat);

// estimation bien
router.get('/estimation/getAll', estimation.getAll)
router.post('/estimation/add', estimation.add)

router.post('/role-add', role.add)
router.put('/role-update/:role_ID', role.update)
router.delete('/role-delete/:role_ID', role.destroy)
router.get('/role-get', role.get)
router.get('/role-get/:role_ID', role.getById)

router.get('/user-acl-get', user_acl.get)
router.put('/user-acl-update/:user_acl_ID', user_acl.update)

module.exports = router;