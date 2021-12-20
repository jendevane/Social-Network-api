const { Schema, model } = require('mongoose');



const UserSchema = new Schema(
    {
        username: {
            type: String,
            Unique: true,
            Required: true,
            Trimmed: true,

        },
  
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        
        thoughts: [
            {
                type:Schema.Types.ObjectId,
                ref:'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],    
    },   
    {
        toJSON: {
            virtuals: false,
            
        },
        
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

// create the user model using the userSchema
const User = model('User', UserSchema);

// export the user model
module.exports = User;