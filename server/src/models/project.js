const mongooes = require("mongoose");

const projectSchema = new mongooes.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
    },
    createdBy:{
        type: mongooes.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [
        {
            type: mongooes.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
},  { timestamps: true }    

);

module.exports = mongooes.model("Project", projectSchema);