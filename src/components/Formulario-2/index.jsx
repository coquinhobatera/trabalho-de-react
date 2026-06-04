import { useState, useEffect } from 'react'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Formulario2() {
    // Estados
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [clientes, setClientes] = useState([]);
    const [idBusca, setIdBusca] = useState("1"); 
    const [cliente, setCliente] = useState(null); 
    const [idSelecionado, setIdSelecionado] = useState("");

    //
    const carros = [
        {id: 1, marca: "Toyota", modelo: "Corolla", ano: 2020},
        {id: 2, marca: "Honda", modelo: "Civic", ano: 2020},
        {id: 3, marca: "Ford", modelo: "Mustang", ano: 2020},
        {id: 4, marca: "Chevrolet", modelo: "Camaro", ano: 2020},
        {id: 5, marca: "Nissan", modelo: "Altima", ano: 2020}
    ] 
    const coresBackground = [
        "#D1E7DD", // Verde Suave
        "#F8D7DA", // Vermelho Suave
        "#CFF4FC", // Azul Suave
        "#FFF3CD"  // Amarelo Suave
    ];

    const carroSelecionado = carros.find(carro => carro.id === parseInt(idSelecionado));

  
    /* Funções */
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

    // GET ==================================================================================
    const fetchClientes = ()=>{
        axios.get("https://6a209a80e96c1d13b587a9b1.mockapi.io/clientes")
        .then((response)=>{

            //const verbo = response.config.method.toUpperCase(); // Retorna 'GET'
            //const status = response.status;                     // Retorna 200


            setClientes(response.data)
        })
        .catch(() => alert("Erro na requisição"));
    }
    // Reação
    useEffect(()=>{
        fetchClientes();
    },[]);
    // GET ID =============================================================================
       const fetchClientePorId = (id) => {
       
        if (!id) return; 

        axios.get(`https://6a209a80e96c1d13b587a9b1.mockapi.io/clientes/${id}`)
        .then((response) => {
            // Guarda o cliente
            setCliente(response.data); 
        })
        .catch((error) => {
            alert(`Erro na requisição.`);
            setCliente(null); 
        });
    };
  
    useEffect(() => {
        fetchClientePorId(idBusca);
    }, []);

    // Função disparada ao clicar no botão de busca
    const buscarPorId = (e) => {
        e.preventDefault();
        fetchClientePorId(idBusca);
    };


    // Envio dados POST ====================================================================
    const handleSubmit =(e) =>{
        // Evita Recarregamento
        e.preventDefault();

        const newPost ={
            name: nome,
            email,
            cpf
        }
        // Passa para o axio
        axios.post("https://6a209a80e96c1d13b587a9b1.mockapi.io/clientes", newPost)
        .then(response => {
            alert(response.data);
           // setCreatedPost(response.data)
         
        })
        .catch((error)=>{
            alert(error)
        })
        // Seta como enviado
        fetchClientes();
        //setEnviado(true);

    }
    
  return (
    <div className="container">
        <h1>Cadastro de Cliente</h1>
      
                <form onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="nome" className="form-label">Nome:</label>
                        <input type="text" id="nome" placeholder="Preencha o nome" value={nome} className="form-control mb-3" required onChange={(e)=>setNome(e.target.value)}/> 
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="text" id="email" placeholder="Preencha o email" value={email} className="form-control mb-3" required onChange={(e)=>setEmail(e.target.value)}/> 
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="cpf" className="form-label">CPF:</label>
                        <input type="text" id="cpf" placeholder="Preencha o cpf" value={cpf} className="form-control mb-3" required onChange={(e)=>setCpf(e.target.value)}/> 
                    </div>
                    <button className="btn btn-success">Enviar</button>
                </form>
        <h2>Listagem de Clientes Cadastrados</h2>
        <ul className='list-group'>
            {clientes.map((cliente)=>(
                <li key={cliente.id} className="list-group-item">{cliente.id} - {cliente.name} - {cliente.email}</li>
            ))}
        </ul>

 <div className="container mt-5">
            <h1 className="mb-4">Buscar Cliente por ID</h1>

            {/* Formulário de Busca */}
            <form onSubmit={buscarPorId} className="row g-3 mb-4">
                <div className="col-auto">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Digite o ID do cliente"
                        value={idBusca}
                        onChange={(e) => setIdBusca(e.target.value)}
                        min="1"
                        required
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary">Buscar</button>
                </div>
            </form>
           
            {cliente ? (
                <div className="card col-md-6 shadow-sm">
                    <div className="card-header bg-success text-white">
                        Dados do Cliente (ID: {cliente.id})
                    </div>
                    <div className="card-body">
                        <p className="card-text"><strong>Nome:</strong> {cliente.name || "Não informado"}</p>
                        <p className="card-text"><strong>CPF:</strong> {cliente.cpf || "Não informado"}</p>
                        <p className="card-text"><strong>Email:</strong> {cliente.email || "Não informado"}</p>
                    </div>
                </div>
            ) : (
                <div className="alert alert-warning col-md-6">
                    Nenhum cliente exibido no momento. Digite um ID válido e clique em Buscar.
                </div>
            )}
        </div>

        <hr/>
   <div className="mb-5">
                <h1>Lista de Carros</h1>
                <div className="col-md-4 my-3">
                    <label htmlFor="selectCarro" className="form-label">Filtrar por marca:</label>
                    <select 
                        id="selectCarro" 
                        className="form-select"
                        value={idSelecionado}
                        onChange={(e) => setIdSelecionado(e.target.value)}
                    >
                        <option value="">Escolha uma marca...</option>
                        {carros.map((carro) => (
                            <option key={carro.id} value={carro.id}>
                                {carro.marca}
                            </option>
                        ))}
                    </select>
                </div>

                {carroSelecionado && (
                    <div className="mt-4 p-3 bg-light border rounded col-md-4">
                        <p className="fs-5 mb-0">
                         {carroSelecionado.modelo} - {carroSelecionado.marca} - {carroSelecionado.ano}
                        </p>
                    </div>
                )}
            </div>

        <hr/>


        </div>
    );
}