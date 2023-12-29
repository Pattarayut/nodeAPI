import express from "express";

const router = express.Router();
import productController from "../controllers/productController";
import verifyToken from "../middleware/passportJWT";

router.get("/list", verifyToken, productController.list);
router.get("/read/:id", verifyToken, productController.read);
router.post("/create", verifyToken, productController.create);
router.put("/update/:id", verifyToken, productController.update);
router.delete("/remove/:id", verifyToken, productController.remove);

export default router;
