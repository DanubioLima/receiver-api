import { Request, Response } from "express";
import db from "../database/client";
import { receivers } from "../database/schema";
import z from "zod";

class ReceiverController {
  async create(request: Request, response: Response) {
    const { name, email, document, pix_key_type, pix_key } = request.body;

    const payload = { name, email, document, pix_key_type, pix_key };

    const schema = z.object({
      name: z.string().min(3),
      email: z.string().email().nullable(),
      document: z.string().max(14),
      pix_key_type: z.enum(
        ["CPF", "CNPJ", "EMAIL", "TELEFONE", "CHAVE_ALEATORIA"],
        { message: "pix_key_type is required" }
      ),
      pix_key: z.string({ message: "pix_key is required" }).max(140).min(3),
    });

    const result = schema.safeParse(payload);

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
