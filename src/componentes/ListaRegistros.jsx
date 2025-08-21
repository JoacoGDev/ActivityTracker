import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guardarRegistros, eliminarRegistro } from '../features/registrosSlice';
import ComponenteRegistro from "./ComponenteRegistro";

const ListaRegistros = () => {
  const dispatch = useDispatch();
  const registros = useSelector(state => state.registros.registros);
  const actividades = useSelector(state => state.actividades.actividades);

  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState('todos');

  useEffect(() => {
    const idUsuario = localStorage.getItem("idUsuario");
    const apiKey = localStorage.getItem("apiKey");

    if (!idUsuario || !apiKey) return;

    fetch(`https://movetrack.develotion.com/registros.php?idUsuario=${idUsuario}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'apikey': apiKey,
        'iduser': idUsuario,
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(guardarRegistros(data.registros));
        setRegistrosFiltrados(data.registros);
      })
      .catch(error => console.error("Error al obtener registros:", error));
  }, [dispatch]);

  useEffect(() => {
    setRegistrosFiltrados(registros);
  }, [registros]);

  // Verificar si las actividades están disponibles
  

  const handleEliminarRegistro = (id) => {
    dispatch(eliminarRegistro(id));
  };

  const filtrarRegistrosPorFecha = () => {
    const ahora = new Date();
    let registrosFiltradosPorFecha = [...registros];

    if (filtroFecha === 'semana') {
      const haceUnaSemana = new Date();
      haceUnaSemana.setDate(ahora.getDate() - 7);
      registrosFiltradosPorFecha = registrosFiltradosPorFecha.filter(registro => {
        const fechaRegistro = new Date(registro.fecha);
        return fechaRegistro >= haceUnaSemana && fechaRegistro <= ahora;
      });
    } else if (filtroFecha === 'mes') {
      const haceUnMes = new Date();
      haceUnMes.setMonth(ahora.getMonth() - 1);
      registrosFiltradosPorFecha = registrosFiltradosPorFecha.filter(registro => {
        const fechaRegistro = new Date(registro.fecha);
        return fechaRegistro >= haceUnMes && fechaRegistro <= ahora;
      });
    }

    setRegistrosFiltrados(registrosFiltradosPorFecha);
  };

  const handleFiltroFechaChange = (event) => {
    setFiltroFecha(event.target.value);
  };

  useEffect(() => {
    filtrarRegistrosPorFecha(); 
  }, [filtroFecha]);

  useEffect(() => {
    filtrarRegistrosPorFecha(); 
  }, [registros]);

  if (actividades.length === 0) {
    return (
      <div className="Registros">
        <h1>Registros (FiltroFecha)</h1>
        <p>Cargando actividades...</p>
      </div>
    );
  }

  return (
    <div className="contenedorRegistros cajaDashboard">
      <h1 className="tituloRegistros text-center">Registros (FiltroFecha)</h1>
      <select id="filtroFecha" className="form-select" value={filtroFecha} onChange={handleFiltroFechaChange}>
          <option value="todos">Todos</option>
          <option value="semana">Última semana</option>
          <option value="mes">Último mes</option>
        </select>
      {registros.length > 0 ? (
        <div className="tablaRegistrosContainer">
          <table className="tablaRegistros">
            <thead>
              <tr>
                <th></th>
                <th>Actividad</th>
                <th>Fecha</th>
                <th>Tiempo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.map(objRegistro => (
                <ComponenteRegistro 
                  key={objRegistro.id} 
                  {...objRegistro} 
                  onDelete={handleEliminarRegistro} 
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mensajeNoRegistros">No hay registros disponibles.</p>
      )}
      
    </div>
  );
}

export default ListaRegistros;