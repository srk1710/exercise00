import { useEffect, useState } from "react";
import { usePayments } from "../hooks/usePayments/usePayments";
import { useGrid } from "../hooks/useGrid/useGrid";
import { CodeDisplay } from "../components";

export const PaymentsPage = () => {
    const { payments, loading, error, fetchPayments } = usePayments();
    const { fetchGrid } = useGrid();
    const [grid, setGrid] = useState<string[][] | null>(null);
    const [code, setCode] = useState<string | null>(null);

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


    return (
        <div style={styles.page}>
            <CodeDisplay code={code} />

            {loading && <p>Loading...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {!loading && !error &&
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.nameColumn}>Name</th>
                            <th style={styles.fixedWidth}>Amount</th>
                            <th style={styles.fixedWidth}>Code</th>
                            <th style={styles.fixedWidth}>Grid Size</th>
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
            }
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
    table: {
        width: "100%",
        maxWidth: "800px",
        borderCollapse: "collapse" as const,
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
        marginTop: "32px"
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
};
