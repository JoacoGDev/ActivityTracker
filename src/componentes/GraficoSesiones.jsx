import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraficoSesiones = () => {
  const registros = useSelector(state => state.registros.registros || []);
  const actividades = useSelector(state => state.actividades.actividades || []);

  

  const sesionesPorActividad = useMemo(() => {
    const conteo = {};
    registros.forEach(({ idActividad }) => {
      conteo[idActividad] = (conteo[idActividad] || 0) + 1;
    });
    return conteo;
  }, [registros]);

  const labels = Object.keys(sesionesPorActividad).map(id => {
    const actividad = actividades.find(act => act.id === parseInt(id));
    return actividad.nombre;
  });
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Sesiones por Actividad',
        data: Object.values(sesionesPorActividad),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Sesiones por Actividad',
      },
    },
  };

  return (
    <div className="contenedorGrafico cajaDashboard">
      <h2 className="tituloGrafico text-center">Sesiones por Actividad</h2>
      <div className="graficoContainer">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default GraficoSesiones;
