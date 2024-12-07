import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
    const location = useLocation();

    return (
        <nav style={styles.nav}>
            <Link
                to="/"
                style={{
                    ...styles.link,
                    ...(location.pathname === '/' ? styles.activeLink : {}),
                }}
            >
                Generator
            </Link>
            <Link
                to="/payments"
                style={{
                    ...styles.link,
                    ...(location.pathname === '/payments' ? styles.activeLink : {}),
                }}
            >
                Payments
            </Link>
        </nav>
    );
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "center",
        padding: "10px",
        backgroundColor: "#007BFF",
    },
    link: {
        margin: "0 10px",
        color: "white",
        textDecoration: "none",
        fontSize: "18px",
        padding: "5px 15px",
        borderRadius: "5px",
        transition: "background-color 0.3s",
    },
    activeLink: {
        backgroundColor: "white",
        color: "#007BFF",
        fontWeight: "bold",
    },
};