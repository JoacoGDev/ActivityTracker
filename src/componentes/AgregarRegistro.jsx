import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { guardarRegistros, agregarRegistro as agregarRegistroAction } from '../features/registrosSlice';
import { guardarActividades } from '../features/actividadesSlice'; // Importar la acción para guardar actividades

const AgregarRegistro = () => {
  const dispatch = useDispatch();
  const actividad = useRef(null), tiempo = useRef(null), fecha = useRef(null);
  const idUsuario = localStorage.getItem("id");
  const apiKey = localStorage.getItem("apiKey");
  const [error, setError] = useState(null);
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    fetch('https://movetrack.develotion.com/actividades.php', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json; charset=UTF-8', 'apikey': apiKey, 'iduser': idUsuario
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la petición, Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      dispatch(guardarActividades(data.actividades)); 
      setActividades(data.actividades); 
    })
    .catch(error => {
      console.error("Error en la petición: ", error);
    });
  }, [dispatch, apiKey, idUsuario]);

  const agregarRegistro = () => {
    const actividadValue = actividad.current.value;
    const tiempoValue = tiempo.current.value;
    const fechaValue = fecha.current.value;

    if (!actividadValue || !tiempoValue || !fechaValue) {
      setError("Todos los campos son requeridos");
      return;
    }
    if (tiempoValue <= 0) {
      setError("El tiempo debe ser mayor a 0");
      return;
    }

    if (tiempoValue > 400) {
      setError("Ingrese un tiempo valido");
      return;
    }
    
    const fechaIngresada = new Date(fechaValue);
    if (fechaIngresada > Date.now()) {
      setError("La fecha no puede ser mayor a la actual");
      return;
    }

    const dataRegistros = {
      "idActividad": actividadValue,
      "idUsuario": localStorage.getItem("id"),
      "tiempo": tiempoValue,
      "fecha": fechaValue
    };

    fetch("https://movetrack.develotion.com/registros.php", {
      method: "POST",
      body: JSON.stringify(dataRegistros),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8', 'apikey': apiKey, 'iduser': idUsuario
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.codigo === 200) {
        dataRegistros.id = data.idRegistro;
        dispatch(agregarRegistroAction(dataRegistros));
      } else {
        console.error("Error al agregar el registro: ", data.mensaje);
      }
    })
    .catch(error => {
      console.error("Error al agregar el registro: ", error);
    });
  };

  return (
    <div className="contenedorDashboard d-flex justify-content-center align-items-center">
      <div className="cajaDashboard col-md-6 col-12">
        <h1 className="tituloFormulario text-center">Agregar Registro</h1>
        <div>
          <label htmlFor="slcActividades" className="etiquetaDashboard">Actividades</label>
          <select id="slcActividades" ref={actividad} className="form-control entradaDashboard">
            {
              actividades.map(objA => (
                <option key={objA.id} value={objA.id}>
                  {objA.nombre}
                </option>
              ))
            }
          </select>
          <label htmlFor="slcTiempo" className="etiquetaDashboard">Tiempo en minutos</label>
          <input type="text" id="slcTiempo" ref={tiempo} className="form-control entradaDashboard" />
          <label htmlFor="dtFecha" className="etiquetaDashboard">Fecha</label>
          <input type="date" id="dtFecha" ref={fecha} className="form-control entradaDashboard" /><br />
          <input
            type="button"
            value="Crear"
            onClick={agregarRegistro}
            className="btn btn-primary btn-block botonDashboard"
          />
        </div>
        {error && <div className="error-message text-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default AgregarRegistro;