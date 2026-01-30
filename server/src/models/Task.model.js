const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description : {
            type: String
        },
        project:{
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Project',
             required : true
        },
        assignedTo:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required : true
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
       },

         status: {
           type: String,
          enum: ["to-do", "in-progress", "done"],
           default: "to-do"
        },
        deadline:{
            type: Date,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);