import express from "express";
import { 
    // getUserById,
    // updateUser,
    savedata,
    getGabungan,
    deletedata,
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/data', getGabungan);
// router.get('/users/:id', getUserById);
router.post('/data', savedata);
router.delete('/data/:id', deletedata);

export default router;