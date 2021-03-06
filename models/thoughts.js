const { Schema, model } = require('mongoose');
const reactionSchema = require('./reactions');
const {format} = require("date-fns");

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => format(createdAtVal, "MMM do, yyyy 'at' hh:mm aa")


    },
    username: {
        type: String,
        required: true
    },
    

    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;