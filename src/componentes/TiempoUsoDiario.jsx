import { selectTiempoTotalDiario } from '../features/registrosSlice';
import {useSelector } from 'react-redux';

const TiempoUsoDiario = () => {

  const tiempoUsoTotalDiario = useSelector(selectTiempoTotalDiario);



  return (
    <div className="contenedorTiempo">
      <h2 className="tituloTiempo">Tiempo de uso diario</h2>
      <p className="tiempo"><strong>{tiempoUsoTotalDiario}m</strong></p>
    </div>
  );
}

export default TiempoUsoDiario

