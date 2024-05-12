import { Request, Response } from "express";
import db from "../database/client";
import { receivers } from "../database/schema";

class ReceiverController {
  async create(request: Request, response: Response) {
    const { name, email, document, pix_key_type, pix_key } = request.body;

    const payload = { name, email, document, pix_key_type, pix_key };

    const receiver = (
      await db.insert(receivers).values(payload).returning()
    )[0];

    return response.status(201).json(receiver);
  }
}

export default ReceiverController;
