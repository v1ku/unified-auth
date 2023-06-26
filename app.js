const express = require('express');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');

const app = express();


require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


app.use(passport.initialize());
app.use(cookieParser());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {

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
const speakeasy = require('speakeasy');

app.post('/login/email', (req, res) => {
    // get the email from the request body
    const email = req.body.email;
    
    // generate a secret and an OTP
    const secret = speakeasy.generateSecret();
    const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    });
    
    // send an email with the OTP
    transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Your OTP for login',
        text: `Your OTP for login is ${otp}.`
    }, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error sending email.');
        } else {
            console.log(info);
            res.send('OTP sent to email.');
        }
    });
});



app.post('/login/email', (req, res) => {
    // get the email from the request body
    const email = req.body.email;
    
    // generate a secret and an OTP
    const secret = speakeasy.generateSecret();
    const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    });
    
    // send an email with the OTP
    transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Your OTP for login',
        text: `Your OTP for login is ${otp}.`
    }, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error sending email.');
        } else {
            console.log(info);
            res.send('OTP sent to email.');
        }
    });
});

app.post('/verify/email', (req, res) => {
    // get the email and OTP from the request body
    const email = req.body.email;
    const otp = req.body.otp;
    
    // verify the OTP
    const verified = speakeasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token: otp
    });
    
    if (verified) {
        // OTP is correct
        // create a JWT and send it in a cookie
        const token = jwt.sign({ user: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.send('Logged in.');
    } else {
        // OTP is incorrect
        res.status(401).send('Incorrect OTP.');
    }
});



app.listen(port, () => {
    console.log(`UnifiedAuth is running at http://localhost:${port}`);
});