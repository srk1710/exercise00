type CodeDisplayProps = {
    code: string | null;
};

export const CodeDisplay = ({ code }: CodeDisplayProps) => {
    return (
        <div style={styles.container}>
            <div style={styles.liveLabel}>Live</div>
            <div style={styles.codeBox}>
                <p style={styles.label}>Your Code Now:</p>
                <p style={styles.codeText}>{code ? code : " --"}</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
    },
    liveLabel: {
        backgroundColor: "#ff4d4f",
        color: "white",
        padding: "4px 12px",
        borderRadius: "4px",
        fontWeight: "bold",
        textTransform: "uppercase" as const,
        letterSpacing: "1px",
        marginBottom: "10px",
        fontSize: "14px",
    },
    codeBox: {
        border: "2px solid #007BFF",
        borderRadius: "8px",
        padding: "16px 24px",
        backgroundColor: "#f0f8ff",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center" as const,
    },
    label: {
        margin: "0 0 8px 0",
        fontSize: "14px",
        color: "#555",
    },
    codeText: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#007BFF",
        margin: 0,
    },
};
