import z from "zod";

class ReceiverValidator {
  validate(payload) {
    const schema = z
      .object({
        name: z.string().min(3),
        email: z.string().email().nullable(),
        document: z.string().max(14),
        pix_key_type: z.enum(
          ["CPF", "CNPJ", "EMAIL", "TELEFONE", "CHAVE_ALEATORIA"],
          { message: "pix_key_type is required" }
        ),
        pix_key: z.string({ message: "pix_key is required" }).max(140).min(3),
      })
      .strict()
      .refine(
        (data) => {
          if (data.pix_key_type === "CPF") {
            return /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/.test(
              data.pix_key
            );
          }

          return true;
        },
        { message: "pix_key_type has an invalid CPF" }
      )
      .refine(
        (data) => {
          if (data.pix_key_type === "CNPJ") {
            return /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/.test(
              data.pix_key
            );
          }

          return true;
        },
        { message: "pix_key_type has an invalid CNPJ" }
      )
      .refine(
        (data) => {
          if (data.pix_key_type === "EMAIL") {
            return /^[a-z0-9+_.-]+@[a-z0-9.-]+$/.test(data.pix_key);
          }

          return true;
        },
        { message: "pix_key_type has an invalid email" }
      )
      .refine(
        (data) => {
          if (data.pix_key_type === "TELEFONE") {
            return /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/.test(data.pix_key);
          }

          return true;
        },
        { message: "pix_key_type has an invalid phone" }
      )
      .refine(
        (data) => {
          if (data.pix_key_type === "CHAVE_ALEATORIA") {
            return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
              data.pix_key
            );
          }

          return true;
        },
        { message: "pix_key_type has an invalid random key" }
      );

    return schema.safeParse(payload);
  }
}

export default new ReceiverValidator();
