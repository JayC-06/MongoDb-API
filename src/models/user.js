import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
  },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },  
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    },],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
},
    id: false,
})
    userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
});

    const User = model('User', userSchema);
    
    export default User;