type InputFieldProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number;
    placeholder?: string;
    disabled?: boolean;
}

export const InputField = ({
    label,
    value,
    onChange,
    maxLength = 255,
    placeholder = "",
    disabled = false,
}: InputFieldProps) => {
    return (
        <div style={styles.inputWrapper}>
            <label style={styles.label}>{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                placeholder={placeholder}
                style={styles.input}
                disabled={disabled}
            />
        </div>
    );
};

const styles = {
    inputWrapper: {
        display: "flex",
        flexDirection: "column" as const,
    },
    label: {
        marginBottom: "5px",
        fontSize: "16px",
        color: "#333",
    },
    input: {
        padding: "5px 10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
};
