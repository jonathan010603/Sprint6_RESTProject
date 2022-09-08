import { formatDate, onlyNum, validateBirthDate } from "../utils.js";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cpf: {
        type: String, required: true, unique: true,
        set: raw => onlyNum(raw), minLength: 11, maxLength: 11
    },
    birthDate: {
        type: String, required: true,
        validate: [validateBirthDate, "User must be 18 or older"],
        set: rawDate => formatDate(new Date(rawDate))
    },
    email: {
        type: String, required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Not a valid email']
    },
    password: { type: String, required: true, minLength: 6, select: false },
    address: { type: String, required: true },
    number: { type: String, required: true },
    complement: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true, set: raw => onlyNum(raw), minLength: 8, maxLength: 8 },
    __v: { type: Number, select: false }
});

export default mongoose.model('users', userSchema);