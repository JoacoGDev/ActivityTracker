import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const usuario = useRef(null);
  const contrasena = useRef(null);

  let navigate = useNavigate();

  const [boton, setBoton] = useState(false);
  const [contrasenaCont, setContrasenaCont] = useState('');
  const [usuarioCont, setUsuarioCont] = useState('');

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {  
        navigate("/dashboard");
    }
  }, []);
  
  useEffect(() => {
    setBoton(!usuarioCont || !contrasenaCont);
  }, [usuarioCont, contrasenaCont]);

  const ingresar = () => {
    let user = usuario.current.value.trim();
    let contra = contrasena.current.value;
    let usuarioNuevo = {
        usuario: user,
        password: contra
    }
fetch("https://movetrack.develotion.com/login.php", {
  method: 'POST',  
  body: JSON.stringify(usuarioNuevo),
  headers: {
    "Content-Type": "application/json; charset=UTF-8"
  }
})
.then(response => response.json())
.then(datos => {
    if (datos.codigo === 200) {
        localStorage.setItem("user", usuarioNuevo.usuario);
        localStorage.setItem("apiKey", datos.apiKey); 
        localStorage.setItem("idUsuario", datos.id);   // ⚠️ usá idUsuario mejor
        navigate("/dashboard");
    }
    else {
        alert("Usuario o contraseña incorrectos");  
    }
})}

  return (
    <div className="contenedorPagina d-flex justify-content-center align-items-center">
      <div className="contenedorInicios col-md-6 col-12">
        <h1 className="tituloFormulario text-center">Login</h1>
        <div>
          <label htmlFor="txtUsuario" className="etiquetaFormulario">Usuario:</label>
          <input type="text" id="txtUsuario" ref={usuario} onChange={(e) => setUsuarioCont(e.target.value)} className="form-control entradaFormulario"/>
          <label htmlFor="txtContra" className="etiquetaFormulario">Contraseña:</label>
          <input type="password" id="txtContra" ref={contrasena} onChange={(e) => setContrasenaCont(e.target.value)} className="form-control entradaFormulario"/>
          <input type="button" value="Ingresar" onClick={ingresar} disabled={boton} className="btn btn-primary btn-block botonFormulario"/>
        </div>
        <div className="text-center mt-3">
          <Link to="/registro" className="enlaceFormulario">¿No estas registrado? Regístrate</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;