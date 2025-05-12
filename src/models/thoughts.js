import { Schema, model, Types, } from "mongoose";
import { formatTimestamp } from "../utils/timeStamp.js";


const reactionSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => formatTimestamp(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const thoughtSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        },
        createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => formatTimestamp(timestamp),
        },
        username: {
        type: String,
        required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
        virtuals: true,
        getters: true,
        },
        id: false,
    }
    );
    thoughtSchema.virtual("reactionCount").get(function () {
        return this.reactions.length;
    }   );

    
    const Thought = model("Thought", thoughtSchema);
    export default Thought;