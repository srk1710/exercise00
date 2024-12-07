import { useEffect } from "react";
import { usePayments } from "../hooks/usePayments/usePayments";

export const PaymentsPage = () => {
    const { payments, loading, error, fetchPayments } = usePayments();

    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <div style={styles.page}>

            {loading && <p>Loading...</p>}
            {error && <p style={styles.error}>{error}</p>}

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.nameColumn}>Name</th>
                        <th style={styles.rightAligned}>Amount</th>
                        <th style={styles.rightAligned}>Code</th>
                        <th style={styles.rightAligned}>Grid Size</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={index}>
                            <td style={styles.nameColumn}>{payment.name}</td>
                            <td style={styles.rightAligned}>{payment.amount}</td>
                            <td style={styles.rightAligned}>{payment.code}</td>
                            <td style={styles.rightAligned}>{payment.grid.flat().length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
    heading: {
        fontSize: "32px",
        color: "#333",
        marginBottom: "20px",
    },
    error: {
        color: "red",
        marginBottom: "20px",
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
        fontWeight: "bold" as const,
        width: "50%",
        borderBottom: "1px solid #ddd",
    },
    rightAligned: {
        textAlign: "right" as const,
        padding: "12px",
        borderBottom: "1px solid #ddd",
    },
};
