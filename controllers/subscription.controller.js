const { Subscription, User } = require('../models');

class SubscriptionController {
    get = async (req, res) =>  {
        try {
            const result = await Subscription.findById(req.params.id);
            res.json(result);
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    }
    
    getAll = async (req, res) =>  {
        try {
            const result = await Subscription.find();
            res.json(result);
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    }
    
    create = async (req, res) =>  {
        try {
            const result = await Subscription.create(req.body);
    
            await User.findOneAndUpdate(
                { _id: result.userId },
                { $push: { subscriptions: result._id } }
            );
            
            res.json(result);
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    }
    
    update = async (req, res) =>  {
        try {
            const result = await Subscription.updateOne(
                { _id: req.params.id },
                { $set: req.body }
            );
            
            res.json(result);
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    }
    
    delete = async (req, res) =>  {
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
            res.status(500).json(err.message);
        }
    }
}

module.exports = new SubscriptionController();
