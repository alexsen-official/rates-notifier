const { User } = require('../models');

class UserController {
    async get(req, res) {
        try {
            const result = await User.findById(req.params.id);
            res.json(result);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    
    async getAll(req, res) {
        try {
            const result = await User.find();
            res.json(result);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    
    async create(req, res) {
        try {
            const result = await User.create(req.body);
            res.json(result);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    
    async login(req, res) {
        try {
            const result = await User
                .findOne({ email: req.body.email })
                .select('+password');
            
            const valid = await result.comparePassword(req.body.password);
            
            if (valid) {
                result.password = undefined;
                res.json(result);
            }
            else {
                res.status(401).json(new Error('Invalid password!'));
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    
    async update(req, res) {
        try {
            const result = await User.updateOne(
                { _id: req.params.id },
                { $set: req.body }
            );
        
            res.json(result);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    
    async delete(req, res) {
        try {
            const result = await User.deleteOne({ _id: req.params.id });
            res.json(result);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new UserController();
