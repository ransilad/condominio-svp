import React, { useLayoutEffect, useState } from 'react';
import { ref, onValue, set } from "firebase/database";

import { db } from "../services/firebase";
import {Tooltip} from "./Tooltip";
import { ReactComponent as EditIcon } from '../components/icons/editIcon.svg';

const AdministrativeStaff = ({ me }) => {
    const [staff, setStaff] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useLayoutEffect(() => {
        const prioritiesRef = ref(db, 'staff');
        onValue(prioritiesRef, (snapshot) => {
            const data = snapshot.val();
            setStaff(data || {});
        });
    }, []);

    const updateAdministratorInformation = (value, type) => {
        const _staff = {...staff};
        _staff.administrator[type] = value;
        setStaff(_staff);
    }

    const updateCommitteeInformation = (value, type, index) => {
        const _staff = {...staff};
        _staff.committee[index][type] = value;
        setStaff(_staff);
    }

    const save = () => {
        set(ref(db, 'staff/administrator'), {
            name: staff.administrator.name,
            email: staff.administrator.email,
        });

        Object.keys(staff.committee).forEach(_id => {
            set(ref(db, 'staff/committee/' + _id), {
                name: staff.committee[_id].name,
                email: staff.committee[_id].email,
            });
        });

        setIsEditing(false);
    }

    return (
        <div className="col-12 col-md px-md-4 mt-4 mt-md-0 pe-md-0">
            <div className="row">
                <div className="col-auto">
                    <span className="fw-bold fs-6">Personal Administrativo</span>
                </div>
                {!isEditing && me.rol === 'admin' && (
                    <div className="col-auto ms-auto">
                        <Tooltip text="Editar información">
                            <EditIcon
                                width={20}
                                height={20}
                                onClick={() => setIsEditing(!isEditing)}
                                fill='#0dcaf0'
                            />
                        </Tooltip>
                    </div>
                )}
            </div>
            <div className="row m-md-0 mt-0 mt-md-2">
                <div className="col-12 custom-card compact mt-3 mt-md-2">
                    <p className="fw-bold text-primary">Administrador</p>
                    {!isEditing && (
                        <p>
                            {staff.administrator && (staff.administrator.name || '-')}
                            <small className="text-muted ps-1">
                                ({staff.administrator && (staff.administrator.email || '-')})
                            </small>
                        </p>
                    )}
                    {isEditing && (
                        <div className="row mb-3">
                            <div className="col-12 col-md-6 mb-2 mb-md-0">
                                <input
                                    className="form-control"
                                    placeholder="Ingresar Nombre"
                                    type="text"
                                    value={staff.administrator.name}
                                    onChange={(e) => updateAdministratorInformation(e.target.value, 'name')}
                                ></input>
                            </div>
                            <div className="col-12 col-md-6 mb-2 mb-md-0">
                                <input
                                    className="form-control"
                                    placeholder="Ingresar Correo"
                                    type="email"
                                    value={staff.administrator.email}
                                    onChange={(e) => updateAdministratorInformation(e.target.value, 'email')}
                                ></input>
                            </div>
                        </div>
                    )}
                    <p className="fw-bold text-primary">Comité</p>
                    {staff.committee && staff.committee.map((committee, index) => !isEditing ? (
                        <p className="m-0" key={index}>{committee.name} <small className="text-muted">({committee.email || '-'})</small></p>
                    ) : (
                        <div className="row mb-3" key={index}>
                            <div className="col-12 col-md-6 mb-2 mb-md-0">
                                <input
                                    className="form-control"
                                    placeholder="Ingresar Nombre"
                                    type="text"
                                    value={committee.name}
                                    onChange={(e) => updateCommitteeInformation(e.target.value, 'name', index)}
                                ></input>
                            </div>
                            <div className="col-12 col-md-6 mb-2 mb-md-0">
                                <input
                                    className="form-control"
                                    placeholder="Ingresar Correo"
                                    type="email"
                                    value={committee.email}
                                    onChange={(e) => updateCommitteeInformation(e.target.value, 'email', index)}
                                ></input>
                            </div>
                        </div>
                    ))}

                    {isEditing && (
                        <div className="row">
                            <div className="col-auto ms-auto">
                                <button className="btn btn-light" onClick={() => setIsEditing(false)}>Cancelar</button>
                                <button className="btn btn-outline-primary ms-2" onClick={() => save()}>Guardar</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdministrativeStaff;
