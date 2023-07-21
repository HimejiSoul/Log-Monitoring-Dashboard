import { gabungandata } from "../models/UserModel.js";

export const getGabungan = async (req, res) => {
    try {
        const gabungan = await gabungandata.find().sort({ timestamp: -1 });
        res.json(gabungan); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const savedata = async (req, res) => {
    const data = new gabungandata(req.body);
    try {
        const insertdata = await data.save();
        res.status(201).json(insertdata);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deletedata = async (req, res) => {
    try {
        const deletedata = await gabungandata.deleteOne({_id:req.params.id});
        res.status(200).json(deletedata);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}