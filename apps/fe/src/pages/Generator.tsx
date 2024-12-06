import { useEffect, useState } from "react";
import { useGrid } from "../hooks/useGrid";

export const GeneratorPage = () => {
    const { fetchGrid } = useGrid();
    const [grid, setGrid] = useState<string[][] | null>(null);
    const [code, setCode] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        let secondCounter = 0;

        if (isGenerating) {
            fetchGrid(true)
                .then((data) => {
                    setGrid(data.grid);
                    setCode(data.code);
                })
                .catch((error) => console.error(error));

            interval = setInterval(() => {
                secondCounter++;
                if (secondCounter % 2 === 0) {
                    fetchGrid(true)
                        .then((data) => {
                            setGrid(data.grid);
                            setCode(data.code);
                        })
                        .catch((error) => console.error(error));
                } else {
                    fetchGrid(false)
                        .then((data) => {
                            setGrid(data.grid);
                        })
                        .catch((error) => console.error(error));
                }
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isGenerating]);

    const emptyGrid = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => "")
    );

    const displayGrid = grid || emptyGrid;

    return (
        <div style={styles.page}>
            <div style={styles.gridWrapper}>
                <button style={styles.button} onClick={() => setIsGenerating(!isGenerating)}>
                    {isGenerating ? "Stop Generating" : "Generate 2D Grid"}
                </button>
                <div style={styles.gridContainer}>
                    <table style={styles.grid}>
                        <tbody>
                            {displayGrid.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, colIndex) => (
                                        <td key={colIndex} style={styles.cell}>
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={styles.codeDisplay}>
                    {code ? `Code: ${code}` : "Code: --"}
                </div>
            </div>
        </div>
    );
};

// Styles
const styles = {
    page: {
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f9",
    },
    gridWrapper: {
        position: "relative" as const,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
    },
    button: {
        position: "absolute" as const,
        top: "-50px",
        right: "0",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        zIndex: 1,
    },
    gridContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    grid: {
        borderCollapse: "collapse" as const,
        width: "500px",
        height: "500px",
    },
    cell: {
        width: "50px",
        height: "50px",
        border: "1px solid #ddd",
        textAlign: "center" as const,
        verticalAlign: "middle" as const,
        fontSize: "20px",
        fontFamily: "monospace",
    },
    codeDisplay: {
        marginTop: "20px",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333",
    },
};
