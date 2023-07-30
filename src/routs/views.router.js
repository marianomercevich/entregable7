/* import { Router } from "express";
import { MongoDBProductManager } from "../dao/mongo-manager/productmanager.js";

const router = Router();
const managerDB = new MongoDBProductManager();

router.get("/", async (req, res) => {
  const products = await managerDB.limitHandler(req, res);
   res.render("Products", products);
});

export default router; */