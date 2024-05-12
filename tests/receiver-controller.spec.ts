import { test } from "@japa/runner";
import request from "supertest";

const appUrl = `http://localhost:${process.env.PORT}`;

test.group("ReceiverController", () => {
  test("should return 200", () => {
    request(appUrl).get("/").expect(200);
  });
});
