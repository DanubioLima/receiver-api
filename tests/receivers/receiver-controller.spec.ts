import { test } from "@japa/runner";
import request from "supertest";
import { createReceivers, fetchReceivers, testSetup } from "../test-helpers";

const appUrl = `http://localhost:${process.env.PORT}`;

test.group("ReceiverController - create", (group) => {
  group.each.setup(testSetup);

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

  test("should return `status` as DRAFT when create a new receiver", async ({
    assert,
  }) => {
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
    assert.equal("DRAFT", response.body.status);
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

test.group("ReceiverController - delete", (group) => {
  group.each.setup(testSetup);

  test("should soft delete receivers", async ({ assert }) => {
    // ARRANGE
    const [{ id: id_receiver_1 }, { id: id_receiver_2 }] =
      await createReceivers([
        {
          name: "John Doe",
          email: "johndoe@gmail.com",
          document: "06795621928",
          pix_key_type: "CPF",
          pix_key: "06795621928",
        },
        {
          name: "Guilherme",
          email: "guilherme@gmail.com",
          document: "06795621928",
          pix_key_type: "EMAIL",
          pix_key: "guilherme@gmail.com",
        },
      ]);

    const payload = { receivers: [id_receiver_1, id_receiver_2] };

    // ACT
    const response = await request(appUrl).delete("/receivers").send(payload);

    const [receiver_1, receiver_2] = await fetchReceivers();

    // ASSERT
    assert.equal(200, response.status);
    assert.isNotNull(receiver_1.deletedAt);
    assert.isNotNull(receiver_2.deletedAt);
  });
});
