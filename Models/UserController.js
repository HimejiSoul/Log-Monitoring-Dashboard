import { gabungandata } from "./UserModel.js"

export const getGabungan = async (req, res) => {
    try {
        const {startDate, endDate } = req.query;

        const filter = {};

        if (startDate && endDate) {
        filter.time = {
          $gte: new Date(startDate), // Greater than or equal to the start date
          $lte: new Date(endDate),   // Less than or equal to the end date
        };
    }
    
    const gabungan = await gabungandata
        .find(filter)               
        .sort({ time: -1 });   

    res.json(gabungan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSummary = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const filter = {
            // You can add any specific filter conditions based on startDate and endDate if needed.
        };

        const summaryResults = await gabungandata.aggregate([
            { $match: { "status": "SUCCESS", ...filter } },
            {
                $group: {
                    _id: "$name",
                    attribute: { $first: "$attribute" },
                    unit: { $first: "$unit" },
                    status: { $first:"$status"}
                }
            },
            {
                $sort: { name: -1,_id:1 }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    attribute: 1,
                    unit: 1,
                    status: 1
                }
            }
        ]).exec();

        res.json(summaryResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


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