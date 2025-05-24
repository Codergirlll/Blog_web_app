

const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    },
});

const CounterModel = mongoose.model("Counter", CounterSchema);

module.exports = CounterModel