import { broadcast } from "./websocketServer";

export const broadcastNewPayment = (payment: any) => {
    broadcast({ type: "NEW_PAYMENT", data: payment });
};
