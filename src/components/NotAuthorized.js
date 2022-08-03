import React from 'react';

const NotAuthorized = () => {
    return (
        <div className="row">
            <div className="col-12 mt-4">
                <div className="alert bg-dark text-white" role="alert">
                    No está autorizado para ver información sobre el condominio, contácta con tu administrador
                </div>
            </div>
        </div>
    );
};

export default NotAuthorized;
