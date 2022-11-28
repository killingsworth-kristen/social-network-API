const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
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
        get: (date) => {
            if (date) return date.toISOString().split("T") [0];
          },
    }
},
{
    toJSON: {
      getters: true
    }
}
);

module.exports= reactionSchema;