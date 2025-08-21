// BotonEliminar.js

import React from "react";

const BotonEliminar = ({ id, onDelete }) => {
  const idUsuario = localStorage.getItem("id");
  const apiKey = localStorage.getItem("apiKey");

  const eliminarRegistro = async () => {
    try {
      const response = await fetch(`https://movetrack.develotion.com/registros.php?idRegistro=${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json; charset=UTF-8', 
          'apikey': apiKey, 
          'iduser': idUsuario
        }
      });

      if (response.ok) {
        onDelete(id);  
      } else {
        console.error("Error al eliminar el registro:", response.statusText);
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      alert("Hubo un problema al eliminar el registro");
    }
  };

  return (
    <button onClick={eliminarRegistro} className="btn btn-danger">
      Eliminar
    </button>
  );
};

export default BotonEliminar;

