import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
    time: Date,
    name: String,
    attribute: String,
    value_avg: Number,
    unit: String,
    status: String,
});

export const gabungandata = mongoose.model('data', dataSchema,'data');