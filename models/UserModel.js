import mongoose from "mongoose";

const GabunganSchema = mongoose.Schema({
    sumber: String,
    timestamp: Date,
    app_name: String,
    pengukuran: String,
    value: Number,
    unit: String,
    satuan: String,
    status: String,
    status_reading: String
});

export const gabungandata = mongoose.model('gabungan', GabunganSchema,"gabungan");