const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShiftSchema = new Schema({
    start: {
        type: String,
        required: [true, 'Start Day and Time required']
    },
    end: {
        type: String,
        required: [true, 'End day and time required']
    },
    lakerID: { 
        type: String,
        required: [true, 'LakerID required']
    },
    opened: {
        type: Boolean,
        default: false
    },
    position: String
});

module.exports = mongoose.model('Shift', ShiftSchema);