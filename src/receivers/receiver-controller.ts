import { Request, Response } from "express";
import db from "../database/client";
import { receivers } from "./receiver-schema";
import receiverValidator from "./receiver-validator";

class ReceiverController {
  async create(request: Request, response: Response) {
    const payload = request.body;

    const result = receiverValidator.validate(payload);

    if (!result.success) {
      const errors = result.error.errors.map((error) => error.message);

      return response.status(400).json({ errors });
    }

    const receiver = (
      await db.insert(receivers).values(payload).returning()
    )[0];

    return response.status(201).json(receiver);
  }
}

export default ReceiverController;
