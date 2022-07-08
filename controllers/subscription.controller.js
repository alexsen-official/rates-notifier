const { Subscription, User } = require('../models');

class SubscriptionController {
    async get(req, res) {
        try {
            const result = await Subscription.findById(req.params.id);
            res.json(result);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    
    async getAll(req, res) {
        try {
            const result = await Subscription.find();
            res.json(result);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    
    async create(req, res) {
        try {
            const result = await Subscription.create(req.body);
    
            await User.findOneAndUpdate(
                { _id: result.userId },
                { $push: { subscriptions: result._id } }
            );
            
            res.json(result);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    
    async update(req, res) {
        try {
            const result = await Subscription.updateOne(
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
            const result = await Subscription.findById(req.params.id);
    
            await User.findOneAndUpdate(
                { _id: result.userId },
                { $pull: { subscriptions: result._id } }
            );
            
            await result.delete();
            
            res.json(result);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new SubscriptionController();
