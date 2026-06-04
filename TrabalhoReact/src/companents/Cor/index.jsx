import { useState, useEffect } from "react";
const cores = ["#FF5733", "#33FF57", "#3357FF", "#F333FF"];

export default function Cor() {
    const [indice, setIndice] = useState(0);
    const hex = cores[indice];

    useEffect(() => {
        document.body.style.backgroundColor = cores[indice];
    }, [indice]);

    useEffect(() => {
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const proximaCor = () => {
        setIndice((i) => (i + 1) % cores.length);
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1 style={{ color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                Mudança de Cor
            </h1>

            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                Cor Atual: {hex}
            </p>
            <button
                onClick={proximaCor}
                style={{
                    marginTop: "1rem",
                    padding: "0.75rem 1.5rem",
                    fontSize: "1rem",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#fff",
                    color: "#333",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    transition: "background-color 0.3s, color 0.3s",
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#333";
                    e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#fff";
                    e.target.style.color = "#333";
                }}
            >
                Próxima Cor
            </button>
        </div>
    );
}