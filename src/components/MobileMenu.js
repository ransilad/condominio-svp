import React from 'react';
import {useNavigate} from "react-router-dom";

import { logout } from "../services/firebase";

const MobileMenu = ({opActive, me, setShowMenu}) => {
    const navigate = useNavigate();

    return (
        <div className="row m-0">
            <div className="col-12 p-4 bg-white rounded-full-10px">
                <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => {
                    navigate('/dashboard');
                    setShowMenu(false);
                }}>
                    <i className={"icon-home bnt-menu " + (opActive === 'dashboard' ? 'active' : '')} />
                    <span className={"ms-2 text-secondary " + (opActive === 'dashboard' ? 'fw-bold border-bottom-2-primary' : '')}>Inicio</span>
                </div>
                <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => {
                    navigate('/parking');
                    setShowMenu(false);
                }}>
                    <i className={"icon-parking bnt-menu " + (opActive === 'parking' ? 'active' : '')} />
                    <span className={"ms-2 text-secondary " + (opActive === 'parking' ? 'fw-bold border-bottom-2-primary' : '')}>Estacionamiento</span>
                </div>
                <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => {
                    navigate('/feedback');
                    setShowMenu(false);
                }}>
                    <i className={"icon-feedback bnt-menu " + (opActive === 'feedback' ? 'active' : '')} />
                    <span className={"ms-2 text-secondary " + (opActive === 'feedback' ? 'fw-bold border-bottom-2-primary' : '')}>Quejas</span>
                </div>
                <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => {
                    navigate('/files');
                    setShowMenu(false);
                }}>
                    <i className={"icon-files bnt-menu " + (opActive === 'files' ? 'active' : '')} />
                    <span className={"ms-2 text-secondary +" + (opActive === 'files' ? 'fw-bold border-bottom-2-primary' : '')}>Archivos</span>
                </div>
                {me.rol === 'admin' && (
                    <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={() => {
                        navigate('/users');
                        setShowMenu(false);
                    }}>
                        <i className={"icon-users bnt-menu " + (opActive === 'users' ? 'active' : '')} />
                        <span className={"ms-2 text-secondary +" + (opActive === 'users' ? 'fw-bold border-bottom-2-primary' : '')}>Usuarios</span>
                    </div>
                )}
                <div className="col mb-4 d-flex align-items-center cursor-pointer" onClick={logout}>
                    <i className="icon-logout bnt-menu" />
                    <span className="ms-2 text-secondary">Salir</span>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
