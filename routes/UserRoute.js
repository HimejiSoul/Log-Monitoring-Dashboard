import express from "express";
import { 
    // getUserById,
    // updateUser,
    savedata,
    getGabungan,
    deletedata,
} from "../Models/UserController.js";

const router = express.Router();

router.get('/data', getGabungan);
router.post('/data', savedata);
router.delete('/data/:id', deletedata);

export default router;