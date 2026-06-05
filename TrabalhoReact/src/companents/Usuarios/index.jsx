import axios from "axios";
import {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Usuarios() {
    const [idBusca, setIdBusca] = useState("");
    const [cliente, setCliente] = useState(null);
    const [error, setError] = useState("");
    const [buscando, setBuscando] = useState(false);

    const fetchClientePorId = () => {
        if (!idBusca) return;
        setBuscando(true);
        setError("");
        setCliente(null);

        axios.get('https://6a209a8de96c1d13b587aa15.mockapi.io/api/react/clientes/' + idBusca
        ).then((response) => {
            setCliente(response.data);
        }).catch((error) => {
            setError("Cliente não encontrado ou erro na busca.");
            console.error("Erro ao buscar cliente por ID:", error);
        })
            .finally(() => {
                setBuscando(false);
            });
    };

    return (
        <div className="container mt-4">
            <h2>Buscar Cliente por ID</h2>
            <div className="mb-3">
                <label htmlFor="idUsuario" className="form-label">ID do Cliente:</label>
                <input
                    type="number"
                    id="idUsuario"
                    className="form-control"
                    placeholder="Digite o ID do cliente"
                    value={idBusca}
                    onChange={(e) => setIdBusca(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && fetchClientePorId()}
                />
            </div>
            <button
                className="btn btn-primary"
                onClick={fetchClientePorId}
                disabled={buscando || !idBusca}
            >
                {buscando ? "Buscando..." : "Buscar"}
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {cliente && (
                <div className="mt-4">-
                    <h4>Dados do Usuário</h4>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th>Nome:</th>
                                <td>{cliente.name}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{cliente.email}</td>
                            </tr>
                            <tr>
                                <th>CPF:</th>
                                <td>{cliente.cpf}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}