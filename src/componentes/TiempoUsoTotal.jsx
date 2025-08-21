import { useSelector } from "react-redux";
import { selectTiempoTotal } from "../features/registrosSlice";


const TiempoUsoTotal = () => {

  const tiempoUsoTotal = useSelector(selectTiempoTotal);

  const horas = Math.floor(tiempoUsoTotal / 60);
  const minutos = tiempoUsoTotal % 60;

  return (
    <div className="contenedorTiempo">
      <h2 className="tituloTiempo">Tiempo de uso total</h2>
      <p className="tiempo"><strong>{horas}h {minutos}m</strong></p>
    </div>

  );
};

export default TiempoUsoTotal