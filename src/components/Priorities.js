import React, {useLayoutEffect, useState} from 'react';
import { ref, onValue, push, set } from "firebase/database";
import { db } from "../services/firebase";
import {Tooltip} from "./Tooltip";
import NoResults from "./NoResults";
import ToastSuccess from "./ToastSuccess";

import { ReactComponent as UpIcon } from '../components/icons/upIcon.svg';
import { ReactComponent as DownIcon } from '../components/icons/downIcon.svg';
import { ReactComponent as CheckIcon } from '../components/icons/checkIcon.svg';
import { ReactComponent as EditIcon } from '../components/icons/editIcon.svg';
import { ReactComponent as CloseIcon } from '../components/icons/closeIcon.svg';

const Priorities = ({me}) => {
    const [priorities, setPriorities] = useState([]);
    const [note, setNote] = useState('');
    const [itemToEdit, setItemToEdit] = useState(null);
    const [show, setShow] = useState(false);

    useLayoutEffect(() => {
        const prioritiesRef = ref(db, 'priorities');
        onValue(prioritiesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const _data = [];
                Object.keys(data).forEach(_id => {
                    _data.push({
                        id: _id,
                        ...data[_id]
                    })
                });
                setPriorities(_data.sort((a, b) => a.order - b.order));
            } else {
                setPriorities([]);
            }
        });
    }, []);

    const createItem = () => {
        push(ref(db, 'priorities'), {
            order: priorities.length + 1,
            desc: note,
            status: 'Por hacer',
        }).then(() => {
            setNote('');
            setShow(true);
        });
    }

    const updateItem = () => {
        set(ref(db, 'priorities/' + itemToEdit.id), {
            ...itemToEdit,
            desc: note,
            id: null,
        }).then(() => {
            setNote('');
            setItemToEdit(null);
            setShow(true);
        });
    }

    const updateOrder = (currentIndex, type) => {
        const firstUpdate = {...priorities[currentIndex]};
        const secondUpdate = {...priorities[type === 'down' ? currentIndex + 1 : currentIndex - 1 ]};

        if (type === 'down') {
            firstUpdate.order += 1;
            secondUpdate.order -= 1;
        } else {
            firstUpdate.order -= 1;
            secondUpdate.order += 1;
        }

        set(ref(db, 'priorities/' + firstUpdate.id), {
            ...firstUpdate,
            id: null,
        }).then(() => {});
        set(ref(db, 'priorities/' + secondUpdate.id), {
            ...secondUpdate,
            id: null,
        }).then(() => {});

        setShow(true);
    }

    const updateStatusItem = (currentIndex, newStatus) => {
        const _itemToUpdate = {...priorities[currentIndex]};

        set(ref(db, 'priorities/' + _itemToUpdate.id), {
            ..._itemToUpdate,
            status: newStatus,
            id: null,
        }).then(() => {
            setShow(true);
        });
    }

    const handleSetItemToEdit = (currentIndex) => {
        const _itemToUpdate = {...priorities[currentIndex]};

        setNote(_itemToUpdate.desc);
        setItemToEdit(_itemToUpdate);
    }

    return (
        <div className="col-12 col-md-7 custom-card align-self-baseline">
            <span className="fw-bold fs-4">Prioridades</span>
            {me.rol === 'admin' && (
                <div className="row my-4">
                    <div className="col-12">
                        <textarea
                            className="form-control"
                            placeholder="Ingresar actividad"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={2}
                        ></textarea>
                    </div>
                    <div className="col-12">
                        <div className="row mt-3">
                            <div className="col-auto ms-auto">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    disabled={note.length < 5}
                                    onClick={() => itemToEdit?.id ? updateItem() : createItem()}
                                >{itemToEdit?.id ? 'Editar' : 'Guardar'} actividad</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="row m-0">
                {(priorities.length > 0) ? priorities.map((priority, index) => ((
                    <div className={"row m-0 mt-3 rounded-full-10px " + ((index % 2) ? 'px-2' : 'bg-light p-2')} key={priority.id}>
                        <div className="col-12 px-1">
                            <div className="row">
                                <div className="col-12">
                                    <small className={"fst-italic " + (
                                        priority.status === 'Completada' ? 'text-success' : (
                                            priority.status === 'Cancelada' ? 'text-danger' : ''
                                        )
                                    )}>{priority.status}</small><br/>
                                    {priority.desc}
                                </div>
                                {me.rol === 'admin' && (
                                    <div className="col-auto ms-auto cursor-pointer mt-2">
                                        {index > 0 && (
                                            <Tooltip text="Subir prioridad">
                                                <UpIcon
                                                    width={30}
                                                    height={30}
                                                    onClick={() => updateOrder(index, 'up')}
                                                    fill='#7526ea'
                                                />
                                            </Tooltip>
                                        )}
                                        {index + 1 < priorities.length && (
                                            <Tooltip text="Bajar prioridad">
                                                <DownIcon
                                                    width={30}
                                                    height={30}
                                                    onClick={() => updateOrder(index, 'down')}
                                                    fill='#7526ea'
                                                />
                                            </Tooltip>
                                        )}
                                        <Tooltip text="Completar actividad">
                                            <CheckIcon
                                                width={30}
                                                height={30}
                                                onClick={() => updateStatusItem(index, 'Completada')}
                                                fill='#4BB543'
                                            />
                                        </Tooltip>
                                        <Tooltip text="Editar actividad">
                                            <EditIcon
                                                width={20}
                                                height={20}
                                                onClick={() => handleSetItemToEdit(index)}
                                                fill='#0dcaf0'
                                                style={{marginRight: 5}}
                                            />
                                        </Tooltip>
                                        <Tooltip text="Cancelar actividad">
                                            <CloseIcon
                                                width={20}
                                                height={20}
                                                onClick={() => updateStatusItem(index, 'Cancelada')}
                                                fill='#bb2124'
                                            />
                                        </Tooltip>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))) : (
                    <NoResults customClass="no-results-img-md"/>
                )}
            </div>

            <ToastSuccess show={show} setShow={setShow}/>
        </div>
    );
};

export default Priorities;
