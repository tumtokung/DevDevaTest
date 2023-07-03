const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        // id: {
        //     type: String,
        //     unique: true,
        //     required: true,
        // },

        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum : ['male','female',''],
            // required: true,
        },
        birthDate: {
            type: String,
            // required: true,
        },
        image: {
            type: String,
            // required: true,
        },
    },
    { timestamps: true }
);

module.exports = user = mongoose.model("user", userSchema);