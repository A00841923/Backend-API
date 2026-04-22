import { Router } from "express";
import { getUsers, getUser, postUser, putUser, deleteUser, putScore } from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser); // :id -> se puede mandar cualquier variable
router.post("/users", postUser);
router.put("/users/:id", putUser);
router.put("/users/:id/score", putScore);
router.delete("/users/:id", deleteUser);

export default router;