const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    cpf: {type: String, required: true, minLength: 11},
    birthDate: {type: Date, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, minLength: 6},
    address: {type: String, required: true},
    number: {type: String, required: true},
    complement: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true, minLength: 2},
    country: {type: String, required: true},
    zipCode: {type: String, required: true, minLength: 8}
});

module.exports = mongoose.model('users', userSchema);