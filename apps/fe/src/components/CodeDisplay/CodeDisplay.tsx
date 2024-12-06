
type CodeDisplayProps = {
    code: string | null;
}

export const CodeDisplay = ({ code }: CodeDisplayProps) => {
    return (
        <div style={styles.codeDisplay}>
            {code ? `Code: ${code}` : "Code: --"}
        </div>
    );
};

const styles = {
    codeDisplay: {
        marginTop: "20px",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333",
    },
};
