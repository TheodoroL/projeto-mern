import mongoose from "mongoose";
import { hash } from "bcrypt";
export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    }
});

UserSchema.pre("save", async function (next): Promise<void> {
    this.password = await hash(this.password, 10);
    next();
});

export const UserModelMongoose = mongoose.models.User || mongoose.model("User", UserSchema);