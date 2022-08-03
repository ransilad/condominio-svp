import React from 'react';

const AdministrativeStaff = () => {
    return (
        <div className="col-12 col-md px-md-4 mt-4 mt-md-0 pe-md-0">
            <span className="fw-bold fs-6">Personal Administrativo</span>
            <div className="row m-md-0 mt-0 mt-md-2">
                <div className="col-12 custom-card compact mt-3 mt-md-2">
                    <p className="fw-bold text-primary">Administrador</p>
                    <p>Rodrigo <small className="text-muted">(mail@csvp.com)</small></p>
                    <p className="fw-bold text-primary">Comité</p>
                    <p className="m-0">Misifú <small className="text-muted">(mail@csvp.com)</small></p>
                    <p className="m-0">Misifú 2 <small className="text-muted">(mail@csvp.com)</small></p>
                    <p>Misifú 3 <small className="text-muted">(mail@csvp.com)</small></p>
                </div>
            </div>
        </div>
    );
};

export default AdministrativeStaff;
