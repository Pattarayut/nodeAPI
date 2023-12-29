import express from "express";

const router = express.Router();
import usersController from "../controllers/usersController";
import { body } from "express-validator";
import verifyToken from "../middleware/passportJWT";

router.post(
  "/register",
  [
    body("username")
      .not()
      .isEmpty()
      .withMessage("กรุณากรอกชื่อผู้ใช้งานระบบด้วย"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("กรุณากรอกรหัสผ่านด้วย")
      .isLength({ min: 8 })
      .withMessage("รหัสผ่านต้อง 8 ตัวอักษรขึ้นไป"),
  ],
  usersController.register
);
router.post(
  "/login",
  [
    body("username")
      .not()
      .isEmpty()
      .withMessage("กรุณากรอกชื่อผู้ใช้งานระบบด้วย"),
    body("password").not().isEmpty().withMessage("กรุณากรอกรหัสผ่านด้วย"),
  ],
  usersController.login
);

router.get("/list", verifyToken, usersController.list);
router.get("/read/:id", verifyToken, usersController.read);
router.post("/create", verifyToken, usersController.create);
router.put("/update/:id", verifyToken, usersController.update);
router.delete("/remove/:id", verifyToken, usersController.remove);
router.get(
  "/checkTimeToken/:token",
  verifyToken,
  usersController.checkTimeToken
);

export default router;
