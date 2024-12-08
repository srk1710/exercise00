import { PaymentType } from "../payments/model/payment.model";
import { broadcast } from "./websocketServer";

export const broadcastNewPayment = (payment: PaymentType) => {
    broadcast({ type: "NEW_PAYMENT", data: payment });
};
