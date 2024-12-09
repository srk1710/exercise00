import { useState } from "react";

type Payment = {
    name: string;
    amount: number;
    code: number;
    grid: string[][];
}

type UsePaymentsResult = {
    payments: Payment[];
    loading: boolean;
    error: string | null;
    fetchPayments: () => Promise<void>;
    createPayment: (payment: Payment) => Promise<void>;
}

export const usePayments = (): UsePaymentsResult => {
    const apiUrl = 'http://localhost:3000/api';

    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPayments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiUrl}/payments`);
            if (!response.ok) {
                throw new Error(`Error fetching payments: ${response.statusText}`);
            }
            const data = await response.json();
            setPayments(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const createPayment = async (payment: Payment) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}/payments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payment),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error creating payment: ${response.statusText}`);
            }

            await fetchPayments();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { payments, loading, error, fetchPayments, createPayment };
};
