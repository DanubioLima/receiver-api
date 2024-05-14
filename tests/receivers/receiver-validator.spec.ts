import { test } from "@japa/runner";
import receiverValidator from "../../src/receivers/receiver-validator";

test.group("ReceiverValidator", () => {
  test("should return success as false when missing `pix_key_type` field", async ({
    assert,
  }) => {
    // ARRANGE
    const payload = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      document: "06795621928",
      pix_key: "06795621928",
    };

    // ACT
    const result = receiverValidator.validate(payload);

    // ASSERT
    assert.equal(false, result.success);
  });

  test("should return success as false when missing `pix_key` field", async ({
    assert,
  }) => {
    // ARRANGE
    const payload = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      document: "06795621928",
      pix_key_type: "CPF",
    };

    // ACT
    const result = receiverValidator.validate(payload);

    // ASSERT
    assert.equal(false, result.success);
  });

  test("should return success as false when send invalid email", async ({
    assert,
  }) => {
    // ARRANGE
    const payload = {
      name: "John Doe",
      email: "invalid-email",
      document: "06795621928",
      pix_key_type: "CPF",
    };

    // ACT
    const result = receiverValidator.validate(payload);

    // ASSERT
    assert.equal(false, result.success);
  });
});

test.group("ReceiverValidator - `pix_key` field", () => {
  test("should return false when type is CPF for an invalid CPF", async ({
    assert,
  }) => {
    // ARRANGE
    const payload = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      document: "69964182325",
      pix_key: "1234567891",
      pix_key_type: "CPF",
    };

    // ACT
    const result = receiverValidator.validate(payload);

    // ASSERT
    assert.equal(false, result.success);
  });

  test("should return false when type is CNPJ for an invalid CNPJ", async ({
    assert,
  }) => {
    // ARRANGE
    const payload = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      document: "69964182325",
      pix_key: "1234567891",
      pix_key_type: "CNPJ",
    };

    // ACT
    const result = receiverValidator.validate(payload);

    // ASSERT
    assert.equal(false, result.success);
  });

  test("should return false when type is EMAIL for an invalid email", async ({
    assert,
  }) => {
    // ARRANGE
    const payload = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      document: "69964182325",
      pix_key: "invalid-email",
      pix_key_type: "EMAIL",
    };

    // ACT
    const result = receiverValidator.validate(payload);

    // ASSERT
    assert.equal(false, result.success);
  });

  test("should return false when type is TELEFONE for an invalid phone", async ({
    assert,
  }) => {
    // ARRANGE
    const payload = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      document: "69964182325",
      pix_key: "98082034",
      pix_key_type: "TELEFONE",
    };

    // ACT
    const result = receiverValidator.validate(payload);

    // ASSERT
    assert.equal(false, result.success);
  });

  test("should return false when type is CHAVE_ALEATORIA for an invalid random key", async ({
    assert,
  }) => {
    // ARRANGE
    const payload = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      document: "69964182325",
      pix_key: "invalid-random-key",
      pix_key_type: "CHAVE_ALEATORIA",
    };

    // ACT
    const result = receiverValidator.validate(payload);

    // ASSERT
    assert.equal(false, result.success);
  });
});
