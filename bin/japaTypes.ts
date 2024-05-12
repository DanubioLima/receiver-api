import { Assert } from "@japa/assert";

declare module "@japa/runner" {
  interface TestContext {
    assert: Assert;
  }

  interface Test<Context, TestData> {
    // notify TypeScript about custom test properties
  }
}
