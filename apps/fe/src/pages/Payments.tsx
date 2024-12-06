
export const PaymentsPage = () => {
    return (
        <div style={styles.page}>
            <h1 style={styles.heading}>Payments</h1>
            <p style={styles.description}>
                Welcome to the Payments page! Here, you can manage your transactions and view payment history.
            </p>
        </div>
    );
};

const styles = {
    page: {
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f9",
    },
    heading: {
        fontSize: "32px",
        color: "#333",
        marginBottom: "20px",
    },
    description: {
        fontSize: "18px",
        color: "#555",
        textAlign: "center" as const,
        maxWidth: "600px",
    },
};
