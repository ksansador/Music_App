const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require("nanoid");

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    token: {
        type: String,
        require: true,
    }
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.set('toJSON', {
   transform: (doc, ret) => {
       delete ret.password;
       return ret;
   }
});

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
