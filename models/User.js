const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String, 
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [RegExp(/^([a-zA-Z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/), "Please enter a valid email"]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
    ],
},
{
    toJSON: {
      virtuals: true,
    }
}
);

userSchema.virtual(`friendCount`).get(function () {
    return this.friends.length
})

const User = model(`user`,userSchema);

module.exports = User;
