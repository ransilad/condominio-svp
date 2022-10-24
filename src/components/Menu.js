import React from 'react';
import { useNavigate } from "react-router-dom";

import { logout } from "../services/firebase";
import CondominiumIcon from './icons/CondominiumIcon';

const Menu = ({opActive, me}) => {
    const navigate = useNavigate();

    return (
        <div className="col-auto p-4 d-none d-md-block">
            <div className="col d-flex flex-column justify-content-center align-items-center pb-5 pt-2">
                <div style={{width: '105px'}}>
                    <CondominiumIcon />
                </div>
                <div className="text-center">Condominio <br/> <b>San Vicente de Paul 4444</b></div>
            </div>
            <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
                <span className={"ms-2 text-secondary " + (opActive === 'dashboard' ? 'fw-bold border-bottom-2-primary' : '')}>Inicio</span>
            </div>
            <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => navigate('/parking')}>
                <span className={"ms-2 text-secondary " + (opActive === 'parking' ? 'fw-bold border-bottom-2-primary' : '')}>Estacionamiento</span>
            </div>
            <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => navigate('/feedback')}>
                <span className={"ms-2 text-secondary " + (opActive === 'feedback' ? 'fw-bold border-bottom-2-primary' : '')}>Quejas</span>
            </div>
            <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => navigate('/files')}>
                <span className={"ms-2 text-secondary +" + (opActive === 'files' ? 'fw-bold border-bottom-2-primary' : '')}>Archivos</span>
            </div>
            {me.rol === 'admin' && (
                <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => navigate('/users')}>
                    <span className={"ms-2 text-secondary +" + (opActive === 'users' ? 'fw-bold border-bottom-2-primary' : '')}>Usuarios</span>
                </div>
            )}
            <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={logout}>
                <span className="ms-2 text-secondary">Salir</span>
            </div>
        </div>
    );
};

export default Menu;
