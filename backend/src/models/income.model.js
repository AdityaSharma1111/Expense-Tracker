import mongoose, {Schema} from "mongoose";
import {User} from "./user.model.js"

const incomeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    icon: {
        type: String
    },
    source: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

export const Income = mongoose.model("Income", incomeSchema);