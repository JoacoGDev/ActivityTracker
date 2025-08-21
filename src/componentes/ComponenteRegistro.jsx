import { useSelector } from "react-redux";
import BotonEliminar from "./BotonEliminar";

const ComponenteRegistro = ({ id, idActividad, fecha, tiempo, onDelete }) => {
  const actividades = useSelector(state => state.actividades.actividades || []);
  const actividad = actividades.find(act => act.id === parseInt(idActividad));
  
  return (
    <tr id={`registro-${id}`}>
      <td>
        <img 
          src={`https://movetrack.develotion.com/imgs/${actividad.imagen}.png`} 
          alt={actividad.nombre} 
          style={{ width: "50px", height: "50px" }} 
        />
      </td>
      <td>{actividad.nombre}</td>
      <td>{fecha}</td>
      <td>{tiempo}</td>
      <td>
        <BotonEliminar id={id} onDelete={onDelete} />
      </td>
    </tr>
  );
}

export default ComponenteRegistro;
