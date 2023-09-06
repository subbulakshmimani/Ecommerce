const express = require('express');
const user_controller = require('../controllers/user_controller');
const router = express.Router();




router.get('/register', user_controller.register);
router.post('/add_register', user_controller.addregister);
router.get('/', user_controller.home);
router.get('/login', user_controller.login);
router.get('/logout', user_controller.logout);
router.post('/login_form', user_controller.loginform);
router.get('/api/v1/sessionDetails', user_controller.session_api);
router.post('/update_user', user_controller.update_user);
router.get('/profile', user_controller.profile_details);
router.get('/account_user', user_controller.user_details);

module.exports = router;