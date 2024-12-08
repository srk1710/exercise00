import { useEffect, useState } from "react";
import { usePayments } from "../hooks/usePayments/usePayments";
import { useGrid } from "../hooks/useGrid/useGrid";
import { CodeDisplay, InputField } from "../components";
import { useWebSocket } from "../hooks/useWebSockets/useWebSocket";

export const PaymentsPage = () => {
    const { payments, loading, error, fetchPayments, createPayment } = usePayments();
    const { fetchGrid } = useGrid();
    const { messages } = useWebSocket();

    const [grid, setGrid] = useState<string[][] | null>(null);
    const [code, setCode] = useState<string | null>(null);
    const [paymentName, setPaymentName] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        fetchGrid(true)
            .then((data) => {
                setGrid(data.grid);
                setCode(data.code);
            })
            .catch((error) => console.error(error));

        interval = setInterval(() => {
            fetchGrid(true)
                .then((data) => {
                    setGrid(data.grid);
                    setCode(data.code);
                })
                .catch((error) => console.error(error));
        }, 2000);

        fetchPayments();

        return () => {
            if (interval) clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            setIsUpdating(true);
            fetchPayments().finally(() => setIsUpdating(false));
        }
    }, [messages]);

    const handleAddPayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!grid) return;

        await createPayment({
            name: paymentName,
            amount: Number(amount),
            code: Number(code),
            grid
        });

        setPaymentName("");
        setAmount("");
    };

    const isButtonDisabled = !paymentName || !amount;

    return (
        <div style={styles.page}>
            <CodeDisplay code={code} />

            <form style={styles.form} onSubmit={handleAddPayment}>
                <InputField
                    label="Payment"
                    value={paymentName}
                    onChange={(e) => setPaymentName(e.target.value)}
                    placeholder="Enter payment name"
                />
                <InputField
                    label="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
                <button
                    type="submit"
                    style={isButtonDisabled ? { ...styles.addButton, ...styles.disabledButton } : styles.addButton}
                    disabled={isButtonDisabled}
                >
                    + Add
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {isUpdating && <p>Updating payments...</p>}
            {!loading && (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.nameColumn}>Name</th>
                            <th style={styles.fixedWidth}>Amount</th>
                            <th style={styles.fixedWidth}>Code</th>
                            <th style={styles.fixedWidth}>Grid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={index}>
                                <td style={styles.nameColumn}>{payment.name}</td>
                                <td style={styles.fixedWidth}>{payment.amount}</td>
                                <td style={styles.fixedWidth}>{payment.code}</td>
                                <td style={styles.fixedWidth}>{payment.grid.flat().length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

const styles = {
    page: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f9",
        padding: "20px",
    },
    error: {
        color: "red",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        gap: "10px",
        marginTop: "32px",
        marginBottom: "20px",
        alignItems: "flex-end",
        width: "100%",
        maxWidth: "800px",
    },
    addButton: {
        padding: "8px 16px",
        fontSize: "16px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.2s ease",
    },
    disabledButton: {
        backgroundColor: "#a0c4ff",
        cursor: "not-allowed",
    },
    table: {
        width: "100%",
        maxWidth: "800px",
        borderCollapse: "collapse" as const,
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
    },
    nameColumn: {
        textAlign: "left" as const,
        padding: "12px",
        width: "50%",
        border: "1px solid #ddd",
    },
    fixedWidth: {
        textAlign: "center" as const,
        padding: "12px",
        width: "10%",
        border: "1px solid #ddd",
    },
    connectionStatus: {
        marginBottom: "10px",
        fontSize: "14px",
        color: "#555",
    },
};
