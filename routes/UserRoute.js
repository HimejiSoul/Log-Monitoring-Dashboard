import express from "express";
import { 
    // savedata,
    getGabungan,
    deletedata,
    getSummary,
} from "../Models/UserController.js";

const router = express.Router();

router.get('/data', getGabungan);
router.get('/dataSummary', getSummary);
// router.post('/data', savedata);
router.delete('/data/:id', deletedata);

export default router;