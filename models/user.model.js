const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 128,
        match: /^[a-zA-Z]+(?:[-' ]?[a-zA-Z]+)+$/,
        trim: true
    },
    tel: {
        type: String,
        unique: true,
        minLength: 7,
        maxLength: 15,
        match: /^\d*$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 254,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        
        return next();
    }
    catch (err) {
        return next(err);
    }
});

UserSchema.methods.comparePassword = async function(data) {
    return bcrypt.compare(data, this.password);
};

module.exports = mongoose.model('User', UserSchema);
