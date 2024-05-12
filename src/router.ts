import ReceiverController from "./controllers/receiver-controller";
import express from "express";

const receiverController = new ReceiverController();

const routes = express.Router();

routes.post("/receivers", receiverController.create);

export default routes;