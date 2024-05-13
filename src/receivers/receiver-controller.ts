import { Request, Response } from "express";
import db from "../database/client";
import { receivers } from "./receiver-schema";
import receiverValidator from "./receiver-validator";
import { inArray } from "drizzle-orm";

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

  async delete(request: Request, response: Response) {
    const { receivers: receiversToDelete } = request.body;

    await db
      .update(receivers)
      .set({ deletedAt: new Date() })
      .where(inArray(receivers.id, receiversToDelete));

    return response.status(200).json({ message: "Receivers deleted" });
  }
}

export default ReceiverController;
