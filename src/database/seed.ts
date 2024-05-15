import receiverService from "../receivers/receiver-service";
import receivers from "../../receivers.json";

const receiversToInsert = receivers.map(async (receiver) => {
  await receiverService.create(receiver as any);
});

await Promise.all(receiversToInsert);

console.log("Seed completed!");
