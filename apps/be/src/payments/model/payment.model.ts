import mongoose, { Schema, Document } from "mongoose";

export type PaymentType = {
    name: string;
    amount: number;
    code: number;
    grid: string[][];
};

const PaymentSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        code: { type: Number, required: true },
        grid: { type: [[String]], required: true },
    },
    { timestamps: true }
);

export const Payment = mongoose.model<Document & PaymentType>("Payment", PaymentSchema);
