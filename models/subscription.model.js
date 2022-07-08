const mongoose = require('mongoose');

const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
    fRate: {
        type: String,
        required: true
    },
    sRate: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
