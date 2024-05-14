import ReceiverController from "./receivers/receiver-controller";
import express from "express";

const receiverController = new ReceiverController();

const routes = express.Router();

routes.post("/receivers", receiverController.create);
routes.delete("/receivers", receiverController.delete);
routes.get("/receivers", receiverController.list);

export default routes;
