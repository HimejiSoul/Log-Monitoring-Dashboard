import { gabungandata } from "./UserModel.js"

export const getGabungan = async (req, res) => {
    try {
        const {startDate, endDate } = req.query;

        const filter = {};

        if (startDate && endDate) {
        filter.time = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),   
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
            status: "SUCCESS",
        };

        if (startDate && endDate) {
            filter.time = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const summaryResults = await gabungandata.aggregate([
            { $match: filter }, 
            {
                $group: {
                    _id: "$name",
                    name: {$first: "$name"},
                    attribute: { $first: "$attribute" },
                    unit: { $first: "$unit" },
                    status: { $first: "$status" },
                    average: { $avg: { $toDouble: "$value_avg" } },
                },
            },
            { $sort: { name: 1 } } 
        ]).exec();
        // console.log("Summary results:", summaryResults);
        res.json(summaryResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// export const savedata = async (req, res) => {
//     const data = new gabungandata(req.body);
//     try {
//         const insertdata = await data.save();
//         res.status(201).json(insertdata);
//     } catch (error) {
//         res.status(400).json({message: error.message});
//     }
// }

export const deletedata = async (req, res) => {
    try {
        const deletedata = await gabungandata.deleteOne({_id:req.params.id});
        res.status(200).json(deletedata);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}