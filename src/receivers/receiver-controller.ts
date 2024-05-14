import { Request, Response } from "express";
import db from "../database/client";
import { pixKeyTypeEnum, receivers, statusEnum } from "./receiver-schema";
import receiverValidator from "./receiver-validator";
import { inArray } from "drizzle-orm";
import receiverService from "./receiver-service";
import z from "zod";

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

  async list(request: Request, response: Response) {
    const parseSchema = z
      .object({
        name: z.string().optional(),
        page: z
          .string()
          .default("1")
          .transform((val) => Number(val)),
        status: z.enum(statusEnum.enumValues).optional(),
        pix_type: z.enum(pixKeyTypeEnum.enumValues).optional(),
        pix_key: z.string().optional(),
      })
      .safeParse(request.query);

    if (!parseSchema.success) {
      return response.status(400).json({ message: "invalid params" });
    }

    const result = await receiverService.list(parseSchema.data);

    return response.status(200).json(result);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const payload = request.body;

    const receiver = await receiverService.findById(id);

    await receiverService.update(receiver, payload);

    return response.status(200).json({ message: "Receiver updated" });
  }
}

export default ReceiverController;
