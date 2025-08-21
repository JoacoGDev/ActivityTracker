import TiempoUsoTotal from "./TiempoUsoTotal";
import TiempoUsoDiario from "./TiempoUsoDiario";

const TiempoUso = () => {
  return (
    <div className="contenedorTiempoUso cajaDashboard">
      <h1 className="tituloTiempoUso text-center">Tiempo de Uso</h1>
      <div className="filaTiempoUso">
        <div className="columnaTiempoUso">
          <TiempoUsoTotal />
        </div>
        <div className="columnaTiempoUso">
          <TiempoUsoDiario />
        </div>
      </div>
    </div>
  );
}

export default TiempoUso;