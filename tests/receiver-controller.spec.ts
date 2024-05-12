import { test } from "@japa/runner";
import request from "supertest";

const appUrl = `http://localhost:${process.env.PORT}`;

test.group("ReceiverController", () => {
  test("should create a new receiver", async ({ assert }) => {
    // ARRANGE
    const payload = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      document: "06795621928",
      pix_key_type: "CPF",
      pix_key: "06795621928",
    };

    // ACT
    const response = await request(appUrl).post("/receivers").send(payload);

    // ASSERT
    assert.equal(201, response.status);
    assert.equal(payload.email, response.body.email);
  });

  test("should return error when not send `pix_key_type` field", async ({
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
    const response = await request(appUrl).post("/receivers").send(payload);

    // ASSERT
    assert.equal(400, response.status);
    assert.equal("pix_key_type is required", response.body.errors[0]);
  });

  test("should return error when not send `pix_key` field", async ({
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
    const response = await request(appUrl).post("/receivers").send(payload);

    // ASSERT
    assert.equal(400, response.status);
    assert.equal("pix_key is required", response.body.errors[0]);
  });
});
