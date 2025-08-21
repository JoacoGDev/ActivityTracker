const MensajeMotivador = ({ minutosHoy, minutosAyer }) => {
    let mensaje = "¡Que no decaiga!";
    let estilo = "alert alert-danger text-center fw-bold"; 
  
    if (minutosHoy > minutosAyer) {
      mensaje = "¡Bien hecho!";
      estilo = "alert alert-success text-center fw-bold"; 
    } else if (minutosHoy === minutosAyer && minutosHoy > 0 && minutosAyer > 0) {
      mensaje = "¡Excelente, sigue manteniendo el ritmo!";
      estilo = "alert alert-warning text-center fw-bold";
    }
  
    return <div className={estilo}>{mensaje}</div>;
  };
  
  export default MensajeMotivador;