const { Schema, Types } = require('mongoose');
const {format} = require("date-fns");

const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => format(createdAtVal, "MMM do, yyyy 'at' hh:mm aa")

    },

    });




module.exports = reactionSchema;