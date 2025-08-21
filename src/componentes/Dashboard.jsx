import { useEffect } from "react";
import AgregarRegistro from "./AgregarRegistro";
import ListaRegistros from "./ListaRegistros";
import TiempoUso from "./TiempoUso";
import GraficoSesiones from "./GraficoSesiones";
import Logout from "./logout";
import GraficoMinutos from "./GraficoMinutos";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) { 
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="contenedorDashboard">
      <h1 className="tituloDashboard text-center">Dashboard</h1>
      <div className="filaDashboard">
        <div className="columnaDashboard">
          <AgregarRegistro />
        </div>
        <div className="columnaDashboard">
          <ListaRegistros />
        </div>
      </div>
      <div className="filaDashboard">
        <div className="columnaDashboard">
          <TiempoUso />
        </div>
        <div className="columnaDashboard">
          <GraficoSesiones />
        </div>
      </div>
      <div className="filaDashboard">
        <div className="columnaDashboard">
          <GraficoMinutos />
        </div>
      </div>
      <div className="filaDashboard justify-content-center">
        <Logout />
      </div>
    </div>
  );
}

export default Dashboard;