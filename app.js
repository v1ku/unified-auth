const express = require('express');
const app = express();
require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


app.use(passport.initialize());
app.use(cookieParser());


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
    // You will eventually check if the user is registered in your database
    // For now, let's just return the profile information received from Google
    return cb(null, profile);
}));


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to UnifiedAuth');
});



app.get('/auth/google', 
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // On successful authentication, create a JWT and send it to the user in a cookie
        const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    }
);


app.listen(port, () => {
    console.log(`UnifiedAuth is running at http://localhost:${port}`);
});