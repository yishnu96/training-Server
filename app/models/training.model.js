const mongoose = require('mongoose');

const trainingSchema = mongoose.Schema({
    title : String,
    discription : String,
    duration : Number,
    courses : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Training', trainingSchema);