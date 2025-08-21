import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const Registro = () => {

  const usuario = useRef(null), password = useRef(null), pais = useRef(null);
  const [paises, setPaises] = useState([]), [error, setError] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {

  fetch('https://movetrack.develotion.com/paises.php')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la petición, Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setPaises(data.paises);
    })
    .catch(error => {
      console.error("Error en la petición: ", error);
      setError("Error al obtener los países");
    });

  }, []);


  const Registrar = () => {

    const usuarioValue = usuario.current.value;
    const passwordValue = password.current.value;
    const paisValue = pais.current.value

    if (!usuarioValue || !passwordValue) {
      setError("Usuario y contraseña no pueden estar vacíos");
      return;
    }

    if (usuarioValue.length < 6) {
      setError("El usuario debe tener al menos 6 caracteres");
      return;
    }
  
    if (passwordValue.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    const dataRegistro = {
      "usuario": usuarioValue,
      "password": passwordValue,
      "isPais": paisValue
    }

    fetch("https://movetrack.develotion.com/usuarios.php", {
      method: "POST",
      body: JSON.stringify(dataRegistro),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la petición, Status: ${response.status}`);
        }

        return response.json();
      })
      .then(data => {
        localStorage.setItem("user", dataRegistro.usuario); 
        localStorage.setItem("apiKey", data.apiKey);  
        localStorage.setItem("idUsuario", data.id);
        navigate("/dashboard");
      })
      .catch(error => {
        console.error("Error en la petición: ", error);
        setError("Error al registrar el usuario");
      });
  };



      return (
        <div className="contenedorPagina d-flex justify-content-center align-items-center">
          <div className="contenedorInicios col-md-6 col-12">
            <h1 className="text-center tituloFormulario text-center">Registro</h1>
            <div>
              <label htmlFor="txtUsuario" className = "etiquetaFormulario">Usuario:</label>
              <input type="text" id="txtUsuario" ref={usuario} className="form-control entradaFormulario"/>
              <label htmlFor="txtPassword" className = "etiquetaFormulario">Contraseña:</label>
              <input type="password" id="txtPassword" ref={password} className="form-control entradaFormulario"/>
              <label htmlFor="pais" className = "etiquetaFormulario">País:</label>
              <select id="pais" ref={pais} className="form-control entradaFormulario">
                {paises.map(objP => (
                  <option key={objP.id} value={objP.id}>
                    {objP.name}
                  </option>
                ))}
              </select><br />
              <input type="button" value="Registrarse" onClick={Registrar} className="btn btn-primary btn-block botonFormulario" />
            </div>
            {error && <div className="error-message text-danger mt-3">{error}</div>}
            <div className="text-center mt-3">
              <Link to="/" className="enlaceFormulario">¿Ya estás registrado? Inicia Sesión</Link>
            </div>
          </div>
        </div>
      );
}

export default Registro