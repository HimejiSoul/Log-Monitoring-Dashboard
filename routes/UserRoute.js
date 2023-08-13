import express from "express";
import { 
    getGabungan,
    deletedata,
    getSummary,
} from "../Models/UserController.js";

const router = express.Router();

router.get('/data', getGabungan);
router.get('/dataSummary', getSummary);
router.delete('/data/:id', deletedata);

export default router;