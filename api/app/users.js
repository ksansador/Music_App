const express = require('express');
const User = require('../models/User');
const multer = require("multer");
const config = require("../config");
const {nanoid} = require("nanoid");
const path = require("path");

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

router.post('/', upload.single('image'), async (req, res) => {
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

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
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