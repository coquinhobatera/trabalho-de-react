import Usuarios from "./companents/Usuarios";
import Formulario from "./companents/Formulario";
import ListaCarros from "./companents/ListaCarros";
import Cor from "./companents/Cor";

export default function App() {
  return (
    <div>
      <Formulario />
      <hr />
      <Usuarios />
      <hr />
      <ListaCarros />
      <hr />
      <Cor />
    </div>
  );
}
