import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const carros = [
    { id: 1, marca: "Toyota", modelo: "Corolla", ano: 2020 },
    { id: 2, marca: "Honda", modelo: "Civic", ano: 2019 },
    { id: 3, marca: "Ford", modelo: "Mustang", ano: 2021 },
    { id: 4, marca: "Chevrolet", modelo: "Camaro", ano: 2018 },
    { id: 5, marca: "Volkswagen", modelo: "Golf", ano: 2022 },
    { id: 6, marca: "BMW", modelo: "Série 3", ano: 2020 },
    { id: 7, marca: "Audi", modelo: "A4", ano: 2019 },
    { id: 8, marca: "Mercedes-Benz", modelo: "C-Class", ano: 2021 },
    { id: 9, marca: "Hyundai", modelo: "Elantra", ano: 2018 },
    { id: 10, marca: "Kia", modelo: "Optima", ano: 2022 },
    { id: 11, marca: "Nissan", modelo: "Altima", ano: 2020 },
    { id: 12, marca: "Subaru", modelo: "Impreza", ano: 2019 },
    { id: 13, marca: "Mazda", modelo: "3", ano: 2021 },
    { id: 14, marca: "Lexus", modelo: "IS", ano: 2018 },
    { id: 15, marca: "Acura", modelo: "TLX", ano: 2022 },
    { id: 16, marca: "Infiniti", modelo: "Q50", ano: 2020 },
    { id: 17, marca: "Jaguar", modelo: "XE", ano: 2019 },
    { id: 18, marca: "Land Rover", modelo: "Range Rover Evoque", ano: 2021 },
    { id: 19, marca: "Volvo", modelo: "S60", ano: 2018 },
    { id: 20, marca: "Tesla", modelo: "Model 3", ano: 2022 }
];

export default function ListaCarros() {
    const [marcaSelecionada, setMarcaSelecionada] = useState("Todas");
    const marca = ["Todas", ...new Set(carros.map(c => c.marca))];
    const carrosFiltrados = marcaSelecionada === "Todas" ? carros : carros.filter(c => c.marca === marcaSelecionada);
    
    return (
        <div className="container mt-4">
            <h2>Lista de Carros</h2>
            <div className="mb-3">
                <label htmlFor="filtroMarca" className="form-label">Filtrar por Marca:</label>
                <select
                    id="filtroMarca"
                    className="form-select w-auto"
                    value={marcaSelecionada}
                    onChange={(e) => setMarcaSelecionada(e.target.value)}
                >
                    {marca.map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Ano</th>
                    </tr>
                </thead>
                <tbody>
                    {carrosFiltrados.map((carro) => (
                        <tr key={carro.id}>
                            <td>{carro.id}</td>
                            <td>{carro.marca}</td>
                            <td>{carro.modelo}</td>
                            <td>{carro.ano}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
