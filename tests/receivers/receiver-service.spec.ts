import { NewReceiver } from "../../src/receivers/receiver-schema";
import receiverService from "../../src/receivers/receiver-service";
import { testSetup } from "../test-helpers";
import { test } from "@japa/runner";

test.group("ReceiverService - create", (group) => {
  group.each.setup(testSetup);

  test("should create a new receiver", async ({ assert }) => {
    // ARRANGE
    const payload = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      document: "06795621928",
      pix_key_type: "CPF",
      pix_key: "06795621928",
    } satisfies NewReceiver;

    // ACT
    const receiver = await receiverService.create(payload);

    // ASSERT
    assert.equal(receiver.name, payload.name);
    assert.equal(receiver.email, payload.email);
    assert.isNotNull(receiver.id);
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
    } satisfies NewReceiver;

    // ACT
    const receiver = await receiverService.create(payload);

    // ASSERT
    assert.equal(receiver.status, "DRAFT");
  });
});
