const mongoose = require('mongoose');

const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fRate: {
        type: String,
        required: true
    },
    sRate: {
        type: String,
        required: true
    },
    notifyAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
