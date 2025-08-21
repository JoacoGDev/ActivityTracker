import React from 'react';

const Logout = () => {
    const salir = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("apiKey");
        localStorage.removeItem("id");
        window.location.href = "/";
    }

    return (
        <div className="logoutContainer">
            <input type="button" value="Logout" onClick={salir} className="btn btn-primary btn-block botonLogout" />
        </div>
    );
}

export default Logout;