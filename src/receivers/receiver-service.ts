import db from "../database/client";
import { Receiver, receivers } from "./receiver-schema";
import { asc, ilike, count, and, eq } from "drizzle-orm";

type ListReceiverFilter = {
  name?: string;
  status?: Receiver["status"];
  pix_type?: Receiver["pix_key_type"];
  pix_key?: string;
  page?: number;
};

class ReceiverService {
  async list(filter: ListReceiverFilter) {
    const page = filter?.page;

    const [total, receiversList] = await Promise.all([
      this.countReceivers(),
      this.paginateReceivers(filter),
    ]);

    return {
      totalReceivers: total,
      page: page,
      pageSize: 10,
      receivers: receiversList,
    };
  }

  private async countReceivers() {
    const { count: totalReceivers } = (
      await db.select({ count: count() }).from(receivers)
    )[0];

    return totalReceivers;
  }

  private async paginateReceivers(filter: ListReceiverFilter) {
    const { name, page, pix_type, pix_key, status } = filter;

    const result = await db
      .select()
      .from(receivers)
      .limit(10)
      .orderBy(asc(receivers.name))
      .offset((page - 1) * 10)
      .where(
        and(
          name ? ilike(receivers.name, `%${name}%`) : void 0,
          status ? eq(receivers.status, status) : void 0,
          pix_type ? eq(receivers.pix_key_type, pix_type) : void 0,
          pix_key ? eq(receivers.pix_key, pix_key) : void 0,
        ),
      );

    return result;
  }

  async findById(id: string) {
    const receiver = (
      await db.select().from(receivers).where(eq(receivers.id, id))
    ).at(0);

    return receiver;
  }

  async update(receiver: Receiver, payload: Partial<Receiver>) {
    if (receiver.status === "DRAFT") {
      await db
        .update(receivers)
        .set(payload)
        .where(eq(receivers.id, receiver.id));

      return;
    }

    // receivers with status VALID can update only the email
    if (payload.email) {
      await db
        .update(receivers)
        .set({ email: payload.email })
        .where(eq(receivers.id, receiver.id));
    }
  }
}

export default new ReceiverService();
