import React, {useEffect, useLayoutEffect, useState} from 'react';
import { ref, onValue, set } from "firebase/database";
import { db } from "../services/firebase";
import {useNavigate} from "react-router-dom";
import ToastSuccess from "./ToastSuccess";

const Users = ({user, me}) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [usersData, setUsersData] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (me?.rol !== 'admin') {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
        const filesRef = ref(db, 'users')
        onValue(filesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const _data = [];
                Object.keys(data).forEach(_id => {
                    _data.push({
                        id: _id,
                        ...data[_id]
                    });
                });
                setUsersData(_data);
            } else {
                setUsersData([]);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateUser = (itemToEdit, newValues) => {
        set(ref(db, 'users/' + itemToEdit.id), {
            ...itemToEdit,
            ...newValues,
            id: null,
        }).then(() => {
            setShow(true);
        });
    };

    const createUser = () => {
        set(ref(db, 'users/' + btoa(email)), {
            active: true,
        }).then(() => {
            setEmail('');
            setShow(true);
        });
    };

    return (
        <div className="col-12 custom-card">
            <div className="fw-bold fs-4 mb-2">Usuarios</div>
            <div className="row mb-4">
                <div className="col-12 col-md">
                    <input
                        className="form-control"
                        placeholder="Ingresar nuevo correo"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div className="col-12 col-md-auto mt-3 mt-md-0 text-end">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => createUser()}
                        disabled={email.length < 5}
                    >Guardar</button>
                </div>
            </div>
            <div className="row m-0">
                {(usersData.length > 0) ? (
                    <div className="col-12 pt-2 pt-md-0 px-0">
                        <div className="row fw-bold my-3 d-none d-md-flex">
                            <div className="col-6 text-primary">Correo</div>
                            <div className="col-3 text-primary">¿Es administrador?</div>
                            <div className="col-3 text-primary">¿Está activo?</div>
                        </div>
                        {usersData && usersData.map((_user, index) => (
                            <div className={"row m-0 mt-2 rounded-full-10px p-2 " + ((index % 2) ? '' : 'bg-light')} key={index}>
                                <div className="col-12 col-md-6 px-1">{atob(_user.id)}</div>
                                <div className="col-12 col-md-3 px-1">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="admin"
                                            checked={_user.rol === 'admin'}
                                            disabled={atob(_user.id) === user?.email}
                                            onChange={() => updateUser(_user, {rol: _user.rol === 'admin' ? null : 'admin'})}
                                        />
                                        <label className="d-md-none">¿Es administrador?</label>
                                    </div>
                                </div>
                                <div className="col-12 col-md-3 px-1 px-md-3">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={true}
                                            checked={_user.active}
                                            disabled={atob(_user.id) === user?.email}
                                            onChange={() => updateUser(_user, {active: !_user.active})}
                                        />
                                        <label className="d-md-none">¿Está activo?</label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="col-12">
                        <span className="text-muted">No hay resultados</span>
                    </div>
                )}
            </div>

            <ToastSuccess show={show} setShow={setShow}/>
        </div>
    );
};

export default Users;
