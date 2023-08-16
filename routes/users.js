const express = require('express');

const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication ,usersController.profile);
router.post('/update/:id', passport.checkAuthentication ,usersController.update);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

// Use passport as middleware
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/sign-in'}
) ,usersController.createSession);

router.get('/sign-out', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/users/auth/google/callback', passport.authenticate('google', {failureRedirect: '/sign-in'}), usersController.createSession);

module.exports = router;
