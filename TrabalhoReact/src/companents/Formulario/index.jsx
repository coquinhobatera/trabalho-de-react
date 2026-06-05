import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const gerarCPF = () => {
    const random = (n) => Math.floor(Math.random() * n);
    const n = Array.from({ length: 9 }, () => random(10));

    let d1 = n.reduce((s, v, i) => s + v * (10 - i), 0);
    d1 = 11 - (d1 % 11);
    if (d1 > 9) d1 = 0;
    n.push(d1);

    let d2 = n.reduce((s, v, i) => s + v * (11 - i), 0);
    d2 = 11 - (d2 % 11);
    if (d2 > 9) d2 = 0;
    n.push(d2);

    return n.join('');
};

export default function Formulario() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState(gerarCPF);
    const [createdPost, setCreatedPost] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [clientes, setClientes] = useState([]);

    const fetchClientes = () => {
        axios
            .get("https://6a209a8de96c1d13b587aa15.mockapi.io/api/react/clientes")
            .then((response) => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar clientes:", error);
            });
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);

        const newPost = { name: nome, email: email, cpf: cpf };

        axios
            .post("https://6a209a8de96c1d13b587aa15.mockapi.io/api/react/clientes", newPost)
            .then((response) => {
                setCreatedPost(response.data);
                setNome("");
                setEmail("");
                setCpf(gerarCPF());
                fetchClientes();
            })
            .catch((error) => {
                console.error("Erro ao enviar formulário:", error);
            })
            .finally(() => {
                setEnviando(false);
            });
    };

    return (
        <div className="container">
            <h1>Cadastro de Clientes</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        className="form-control"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpf" className="form-label">CPF (gerado automaticamente):</label>
                    <input
                        type="text"
                        id="cpf"
                        className="form-control"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        readOnly
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={enviando}>
                    {enviando ? "Enviando..." : "Enviar"}
                </button>
            </form>

            <h2 className="mt-4">Clientes Cadastrados</h2>
            <ul className="list-group">
                {clientes.map((cliente) => (
                    <li key={cliente.id} className="list-group-item">
                        {cliente.id} - {cliente.name} - {cliente.email} - {cliente.cpf}
                    </li>
                ))}
            </ul>
        </div>
    );
}