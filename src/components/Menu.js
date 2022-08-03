import React from 'react';
import { useNavigate } from "react-router-dom";

import { logout } from "../services/firebase";

const Menu = ({opActive, me}) => {
    const navigate = useNavigate();

    return (
        <div className="col-auto p-4 d-none d-md-block">
            <div className="col d-flex flex-column justify-content-center align-items-center pb-5 pt-2">
                <i className="icon-condominium text-primary display-1" />
                <div className="text-center">Condominio <br/> <b>San Vicente de Paul 4444</b></div>
            </div>
            <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
                <i className={"icon-home bnt-menu " + (opActive === 'dashboard' ? 'active' : '')} />
                <span className={"ms-2 text-secondary " + (opActive === 'dashboard' ? 'fw-bold border-bottom-2-primary' : '')}>Inicio</span>
            </div>
            <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => navigate('/parking')}>
                <i className={"icon-parking bnt-menu " + (opActive === 'parking' ? 'active' : '')} />
                <span className={"ms-2 text-secondary " + (opActive === 'parking' ? 'fw-bold border-bottom-2-primary' : '')}>Estacionamiento</span>
            </div>
            <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => navigate('/feedback')}>
                <i className={"icon-feedback bnt-menu " + (opActive === 'feedback' ? 'active' : '')} />
                <span className={"ms-2 text-secondary " + (opActive === 'feedback' ? 'fw-bold border-bottom-2-primary' : '')}>Quejas</span>
            </div>
            <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => navigate('/files')}>
                <i className={"icon-files bnt-menu " + (opActive === 'files' ? 'active' : '')} />
                <span className={"ms-2 text-secondary +" + (opActive === 'files' ? 'fw-bold border-bottom-2-primary' : '')}>Archivos</span>
            </div>
            {me.rol === 'admin' && (
                <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => navigate('/users')}>
                    <i className={"icon-users bnt-menu " + (opActive === 'users' ? 'active' : '')} />
                    <span className={"ms-2 text-secondary +" + (opActive === 'users' ? 'fw-bold border-bottom-2-primary' : '')}>Usuarios</span>
                </div>
            )}
            <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={logout}>
                <i className="icon-logout bnt-menu" />
                <span className="ms-2 text-secondary">Salir</span>
            </div>
        </div>
    );
};

export default Menu;
