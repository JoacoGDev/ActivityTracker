import { Bar } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import MensajeMotivador from './MensajeMotivador'; // Importamos el componente

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoMinutos = () => {
  const registros = useSelector(state => state.registros.registros || []);

  // Obtener los últimos 7 días con formato 'YYYY-MM-DD' 
  const ultimos7Dias = Array.from({ length: 7 }, (_, i) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - i);
    return fecha.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
  }).reverse();

  const minutosPorDia = useMemo(() => {
    return ultimos7Dias.reduce((acumulado, diaFecha) => {
      acumulado[diaFecha] = registros
        .filter(registro => {
          const fechaRegistro = new Date(registro.fecha).toISOString().split('T')[0]; 
          return fechaRegistro === diaFecha;
        })
        .reduce((sum, registro) => sum + Number(registro.tiempo), 0);
      return acumulado;
    }, {});
  }, [registros]);

  // Obtener los minutos de ayer y hoy
  const hoy = ultimos7Dias[ultimos7Dias.length - 1];
  const ayer = ultimos7Dias[ultimos7Dias.length - 2];

  const minutosHoy = minutosPorDia[hoy] || 0;
  const minutosAyer = minutosPorDia[ayer] || 0;

  const data = {
    labels: ultimos7Dias, 
    datasets: [{
      label: 'Minutos ejercitados',
      data: ultimos7Dias.map(dia => minutosPorDia[dia] || 0),
      backgroundColor: 'rgba(32, 175, 3, 0.56)',
      borderColor: 'rgb(45, 109, 2)',
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Minutos ejercitados en los últimos 7 días' },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="contenedorGrafico cajaDashboard">
      <h2 className="tituloGrafico text-center">Minutos ejercitados en los últimos 7 días</h2>
      <MensajeMotivador minutosHoy={minutosHoy} minutosAyer={minutosAyer} />
      <div className="graficoContainer">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default GraficoMinutos;
