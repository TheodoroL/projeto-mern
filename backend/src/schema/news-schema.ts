import mongoose from "mongoose";


export const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        require: true

    },
    text: {
        type: String,
        required: true

    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    users: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: {
        type: Array,
        required: true
    },
    coments: {
        type: Array,
        required: true
    }
});

export const newsModelMonoogse = mongoose.model("News", newsSchema);