const express = require('express');
const multer = require('multer');
const config = require("../config");
const {nanoid} = require("nanoid");
const { OAuth2Client } = require('google-auth-library')
const User = require('../models/User');
const path = require("path");
const axios = require("axios");

const client = new OAuth2Client(config.google.clientId);
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.post('/', upload.single('avatarImage'), async (req, res) => {
    try {
        const {email, password, displayName, avatarImage} = req.body;

        const userData = {
            email,
            password,
            displayName,
            avatarImage: avatarImage || null,
        };

        if (req.file) {
            userData.avatarImage = 'http://localhost:8000/uploads/' + req.file.filename;
        }

        const user = new User(userData);

        user.generateToken();
        await user.save();

       return  res.send(user);
    } catch (e) {
       return res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(401).send({message: 'Credentials are wrong!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
       return  res.status(401).send({message: 'Credentials are wrong!'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});
    res.send({message: 'Username and password correct!', user})
});

router.post('/facebookLogin', async( req, res) => {
   const inputToken = req.body.accessToken;
   const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;


    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const response = await axios.get(debugTokenUrl);

        if(response.data.data.error) {
            return res.send.status(401).send({message: 'Facebook token incorrect!'});
        }

        if(req.body.id !== response.data.data.user_id) {
            return res.status(401). send({message: 'Wrong user id'});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if(!user) {
            user = new User({
                email: req.body.email,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
                avatarImage: req.body.picture.data.url,
            });
        }

        user.generateToken();
        await  user.save({validateBeforeSave: false});

        return res.send({message: 'Login or register successful!', user});
    } catch (e) {
        return res.status(401).send({message: 'Facebook token incorrect Sorry!'});
    }
});

router.post('/googleLogin', async (req, res) => {
    const { token }  = req.body
    
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.google.clientId,
        });

        const { name, email, picture } = ticket.getPayload();

        let user = await User.findOne({email});


        if(!user) {
            user = new User({
                email,
                password: nanoid(),
                displayName: name,
                avatarImage: picture,
            });
        }

        user.generateToken();

        await user.save({validateBeforeSave: false});

        res.send({message: 'Login or register success', user});
    } catch (e) {
        return res.status(401).send({message: 'Google token incorrect Sorry!'});
    }
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    return res.send({success, user});
});

module.exports = router;