import { useEffect, useState } from "react";
import { useGrid } from "../hooks/useGrid/useGrid";
import { CodeDisplay, InputField } from "../components";

export const GeneratorPage = () => {
    const { fetchGrid } = useGrid();
    const [grid, setGrid] = useState<string[][] | null>(null);
    const [code, setCode] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [biasChar, setBiasChar] = useState<string>("");
    const [isInputLocked, setIsInputLocked] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleBiasCharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBiasChar = e.target.value.toLowerCase();

        if (!isInputLocked) {
            setBiasChar(newBiasChar);
            if (newBiasChar) {
                setIsInputLocked(true);

                const newTimeoutId = setTimeout(() => {
                    setIsInputLocked(false);
                    setTimeoutId(null);
                }, 4000);

                setTimeoutId(newTimeoutId);
            }
        }
    };


    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        let secondCounter = 0;

        if (isGenerating) {
            fetchGrid(true, biasChar)
                .then((data) => {
                    setGrid(data.grid);
                    setCode(data.code);
                })
                .catch((error) => console.error(error));

            interval = setInterval(() => {
                secondCounter++;
                if (secondCounter % 2 === 0) {
                    fetchGrid(true, biasChar)
                        .then((data) => {
                            setGrid(data.grid);
                            setCode(data.code);
                        })
                        .catch((error) => console.error(error));
                } else {
                    fetchGrid(false, biasChar)
                        .then((data) => {
                            setGrid(data.grid);
                        })
                        .catch((error) => console.error(error));
                }
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isGenerating, biasChar]);

    const emptyGrid = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => "")
    );

    const displayGrid = grid || emptyGrid;

    return (
        <div style={styles.page}>
            <div style={styles.gridWrapper}>
                <div style={styles.controls}>
                    <InputField
                        label="Character"
                        value={biasChar}
                        onChange={handleBiasCharChange}
                        maxLength={1}
                        placeholder="Character"
                        disabled={isInputLocked}
                    />

                    <button style={styles.button} onClick={() => setIsGenerating(!isGenerating)}>
                        {isGenerating ? "Stop Generating" : "Generate 2D Grid"}
                    </button>
                </div>

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
                <CodeDisplay code={code} />
            </div>
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
    gridWrapper: {
        position: "relative" as const,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
    },
    controls: {
        display: "flex",
        alignItems: "end",
        marginBottom: "20px",
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
    },
    gridContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "24px"
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
};

