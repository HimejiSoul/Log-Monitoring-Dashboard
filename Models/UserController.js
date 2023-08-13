import { gabungandata } from "./UserModel.js"

export const getGabungan = async (req, res) => {
    try {
        const {startDate, endDate } = req.query;
        console.log("Received startDate:", startDate);
        console.log("Received endDate:", endDate);
        const filter = {};

        if (startDate && endDate) {
            filter.time = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };

        } else {
            const defaultStartDate = new Date();
            const defaultEndDate = new Date();
            defaultStartDate.setDate(defaultStartDate.getDate() - 7);
            filter.time = {
                $gte: defaultStartDate,
                $lte: defaultEndDate,
            };
            console.log("Default startDate:", defaultStartDate);
            console.log("Default endDate:", defaultEndDate);
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
        console.log("Received startDate:", startDate);
        console.log("Received endDate:", endDate);
        const filter = {
            status: "SUCCESS",
        };

        if (startDate && endDate) {
            filter.time = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }else {
            const defaultStartDate = new Date();
            const defaultEndDate = new Date();
            defaultStartDate.setDate(defaultStartDate.getDate() - 7);
            filter.time = {
                $gte: defaultStartDate,
                $lte: defaultEndDate,
            };
            console.log("Default startDate:", defaultStartDate);
            console.log("Default endDate:", defaultEndDate);
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
        res.json(summaryResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletedata = async (req, res) => {
    try {
        const deletedata = await gabungandata.deleteOne({_id:req.params.id});
        res.status(200).json(deletedata);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}