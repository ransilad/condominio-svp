import React, {useLayoutEffect, useState} from 'react';
import { ref, onValue, push, set } from "firebase/database";
import { db } from "../services/firebase";
import {Tooltip} from "./Tooltip";
import NoResults from "./NoResults";
import ToastSuccess from "./ToastSuccess";

const Files = ({user, me}) => {
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [itemToEdit, setItemToEdit] = useState(null);
    const [show, setShow] = useState(false);

    useLayoutEffect(() => {
        const filesRef = ref(db, 'files')
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
                setFiles(_data);
            } else {
                setFiles([]);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createFileInput = () => {
        const today = new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        }).format(Date.now());

        if (itemToEdit?.id) {
            set(ref(db, 'files/' + itemToEdit.id), {
                ...itemToEdit,
                title,
                link,
                id: null,
            }).then(() => {
                setTitle('');
                setLink('');
                setItemToEdit(null);
                setShow(true);
            });
        } else {
            push(ref(db, 'files'), {
                date: today,
                title,
                link,
                user: user.displayName,
            }).then(() => {
                setTitle('');
                setLink('');
                setShow(true);
            });
        }
    }

    const handleSetItemToEdit = (currentIndex) => {
        const _itemToUpdate = {...files[currentIndex]};

        setTitle(_itemToUpdate.title);
        setLink(_itemToUpdate.link);
        setItemToEdit(_itemToUpdate);
    }

    return (
        <div className="col-12 custom-card">
            <div className="fw-bold fs-4 mb-2">Archivos</div>
            {me?.rol === 'admin' && (
                <div className="row mb-4 pt-2">
                    <div className="col-12 col-md-6">
                        <input
                            className="form-control"
                            placeholder="Ingresar título"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                    </div>
                    <div className="col-12 col-md-6 pt-3 pt-md-0">
                        <input
                            className="form-control"
                            placeholder="Ingresar enlance"
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        ></input>
                    </div>
                    <div className="col-12 pt-3 mt-md-0 text-end">
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => createFileInput()}
                            disabled={title.length < 5 || link.length < 10}
                        >{itemToEdit?.id ? 'Editar' : 'Guardar'} enlace</button>
                    </div>
                </div>
            )}
            <div className="row m-0">
                {(files.length > 0) ? (
                    <div className="col-12 pt-2 pt-md-0 px-0">
                        {files && files.map((n, index) => (
                            <div className={"row m-0 mt-2 rounded-full-10px p-2 " + ((index % 2) ? '' : 'bg-light')} key={index}>
                                <div className="col-12 px-1">
                                    <small className="fst-italic">{n.date}</small>
                                </div>
                                <div className="col-12 px-1">
                                    <a className="link-dark text-decoration-none" href={n.link} target="_blank" rel="noreferrer">{n.title}</a>
                                </div>
                                {me.rol === 'admin' && (
                                    <div className="col-12 cursor-pointer text-end mt-2">
                                        <Tooltip text="Editar enlace">
                                            <i className="icon-edit text-info ms-3" onClick={() => handleSetItemToEdit(index)}/>
                                        </Tooltip>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <NoResults />
                )}
            </div>

            <ToastSuccess show={show} setShow={setShow}/>
        </div>
    );
};

export default Files;
