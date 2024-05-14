import { test } from "@japa/runner";
import request from "supertest";
import { createReceivers, fetchReceivers, testSetup } from "../test-helpers";

const appUrl = `http://localhost:${process.env.PORT}`;

test.group("ReceiverController - create", (group) => {
  group.each.setup(testSetup);

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

test.group("ReceiverController - list", (group) => {
  group.each.setup(testSetup);

  test("should search a receiver by name", async ({ assert }) => {
    // ARRANGE
    const [_, receiver_2] = await createReceivers([
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
        document: "98907100055",
        pix_key_type: "EMAIL",
        pix_key: "guilherme@gmail.com",
      },
    ]);

    // ACT
    const name = receiver_2.name.slice(0, 3);
    const page = 1;
    const response = await request(appUrl)
      .get("/receivers")
      .query({ name, page });

    // ASSERT
    assert.equal(response.status, 200);
    assert.deepInclude(response.body, {
      totalReceivers: 2,
      page: 1,
      pageSize: 10,
    });
    assert.lengthOf(response.body.receivers, 1);
    assert.includeDeepMembers(response.body.receivers, [
      {
        id: receiver_2.id,
        name: "Guilherme",
        email: "guilherme@gmail.com",
        document: "98907100055",
        status: "DRAFT",
        pix_key_type: "EMAIL",
        pix_key: "guilherme@gmail.com",
        deletedAt: null,
        createdAt: receiver_2.createdAt.toISOString(),
        updatedAt: receiver_2.updatedAt.toISOString(),
      },
    ]);
  });

  test("should search a receiver by status", async ({ assert }) => {
    // ARRANGE
    const [_, receiver_2] = await createReceivers([
      {
        name: "John Doe",
        email: "johndoe@gmail.com",
        document: "06795621928",
        pix_key_type: "CPF",
        pix_key: "06795621928",
      },
      {
        name: "Guilherme",
        status: "VALID",
        email: "guilherme@gmail.com",
        document: "98907100055",
        pix_key_type: "EMAIL",
        pix_key: "guilherme@gmail.com",
      },
    ]);

    // ACT
    const response = await request(appUrl)
      .get("/receivers")
      .query({ status: "VALID" });

    // ASSERT
    assert.equal(response.status, 200);
    assert.deepInclude(response.body, {
      totalReceivers: 2,
      page: 1,
      pageSize: 10,
    });
    assert.lengthOf(response.body.receivers, 1);
    assert.includeDeepMembers(response.body.receivers, [
      {
        id: receiver_2.id,
        name: "Guilherme",
        email: "guilherme@gmail.com",
        document: "98907100055",
        status: "VALID",
        pix_key_type: "EMAIL",
        pix_key: "guilherme@gmail.com",
        deletedAt: null,
        createdAt: receiver_2.createdAt.toISOString(),
        updatedAt: receiver_2.updatedAt.toISOString(),
      },
    ]);
  });

  test("should search a receiver by pix_key_type", async ({ assert }) => {
    // ARRANGE
    const [receiver_1] = await createReceivers([
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
        document: "98907100055",
        pix_key_type: "EMAIL",
        pix_key: "guilherme@gmail.com",
      },
    ]);

    // ACT
    const response = await request(appUrl)
      .get("/receivers")
      .query({ pix_type: "CPF" });

    // ASSERT
    assert.equal(response.status, 200);
    assert.deepInclude(response.body, {
      totalReceivers: 2,
      page: 1,
      pageSize: 10,
    });
    assert.lengthOf(response.body.receivers, 1);
    assert.includeDeepMembers(response.body.receivers, [
      {
        id: receiver_1.id,
        name: "John Doe",
        email: "johndoe@gmail.com",
        document: "06795621928",
        status: "DRAFT",
        pix_key_type: "CPF",
        pix_key: "06795621928",
        deletedAt: null,
        createdAt: receiver_1.createdAt.toISOString(),
        updatedAt: receiver_1.updatedAt.toISOString(),
      },
    ]);
  });

  test("should search a receiver by pix_key", async ({ assert }) => {
    // ARRANGE
    const [receiver_1] = await createReceivers([
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
        document: "98907100055",
        pix_key_type: "EMAIL",
        pix_key: "guilherme@gmail.com",
      },
    ]);

    // ACT
    const response = await request(appUrl)
      .get("/receivers")
      .query({ pix_key: "06795621928" });

    // ASSERT
    assert.equal(response.status, 200);
    assert.deepInclude(response.body, {
      totalReceivers: 2,
      page: 1,
      pageSize: 10,
    });
    assert.lengthOf(response.body.receivers, 1);
    assert.includeDeepMembers(response.body.receivers, [
      {
        id: receiver_1.id,
        name: "John Doe",
        email: "johndoe@gmail.com",
        document: "06795621928",
        status: "DRAFT",
        pix_key_type: "CPF",
        pix_key: "06795621928",
        deletedAt: null,
        createdAt: receiver_1.createdAt.toISOString(),
        updatedAt: receiver_1.updatedAt.toISOString(),
      },
    ]);
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
          document: "98907100055",
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

test.group("ReceiverController - update", (group) => {
  group.each.setup(testSetup);

  test("should update fields from receiver with status DRAFT", async ({
    assert,
  }) => {
    // ARRANGE
    const [receiver] = await createReceivers([
      {
        name: "John Doe",
        email: "johndoe@gmail.com",
        document: "06795621928",
        pix_key_type: "CPF",
        pix_key: "06795621928",
      },
    ]);

    const payload = { name: "João", email: "joao@gmail.com" };

    // ACT
    const response = await request(appUrl)
      .put(`/receivers/${receiver.id}`)
      .send(payload);

    const [receiver_1] = await fetchReceivers();

    // ASSERT
    assert.equal(response.status, 200);
    assert.equal(receiver_1.name, "João");
    assert.equal(receiver_1.email, "joao@gmail.com");
  });

  test("should update only the email for receivers with status VALID", async ({
    assert,
  }) => {
    // ARRANGE
    const [receiver] = await createReceivers([
      {
        name: "John Doe",
        email: "johndoe@gmail.com",
        document: "06795621928",
        status: "VALID",
        pix_key_type: "CPF",
        pix_key: "06795621928",
      },
    ]);

    const payload = { name: "João", email: "joao@gmail.com" };

    // ACT
    const response = await request(appUrl)
      .put(`/receivers/${receiver.id}`)
      .send(payload);

    const [receiver_1] = await fetchReceivers();

    // ASSERT
    assert.equal(response.status, 200);
    assert.equal(receiver_1.name, "John Doe");
    assert.equal(receiver_1.email, "joao@gmail.com");
  });
});
