const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ["ACTIVE", "IN_PROGRESS", "COMPLETE", "EXPIRED"],
        default: "ACTIVE"
    },
    deadline: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
}, { timestamps: true });

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
