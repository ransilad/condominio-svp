import React, {useLayoutEffect, useState} from 'react';
import { ref, onValue, push, set } from "firebase/database";
import { db } from "../services/firebase";
import {Tooltip} from "./Tooltip";
import NoResults from "./NoResults";
import ToastSuccess from "./ToastSuccess";
import { ReactComponent as EditIcon } from '../components/icons/editIcon.svg';

const News = ({me}) => {
    const [news, setNews] = useState([]);
    const [note, setNote] = useState('');
    const [itemToEdit, setItemToEdit] = useState(null);
    const [show, setShow] = useState(false);

    useLayoutEffect(() => {
        const newsRef = ref(db, 'news');
        onValue(newsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const _data = [];
                Object.keys(data).forEach(_id => {
                    _data.push({
                        id: _id,
                        ...data[_id]
                    })
                });
                setNews(_data);
            } else {
                setNews([]);
            }
        });
    }, []);

    const createNew = () => {
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
            set(ref(db, 'news/' + itemToEdit.id), {
                date: today,
                desc: note,
            }).then(() => {
                setNote('');
                setItemToEdit(null);
                setShow(true);
            });
        } else {
            push(ref(db, 'news'), {
                date: today,
                desc: note,
            }).then(() => {
                setNote('');
                setShow(true);
            });
        }
    }

    const handleSetItemToEdit = (currentIndex) => {
        const _itemToUpdate = {...news[currentIndex]};

        setNote(_itemToUpdate.desc);
        setItemToEdit(_itemToUpdate);
    }

    return (
        <div className="col-12 custom-card">
            <span className="fw-bold fs-4">Noticias</span>
            {me.rol === 'admin' && (
                <div className="row my-4">
                    <div className="col-12">
                        <textarea
                            className="form-control"
                            placeholder="Ingresar noticia"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={3}
                        ></textarea>
                    <div className="row mt-3">
                        <div className="col-auto ms-auto">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                disabled={note.length < 20}
                                onClick={() => createNew()}
                            >{itemToEdit?.id ? 'Editar' : 'Guardar'} noticia</button>
                        </div>
                    </div>
                </div>
                </div>
            )}
            <div className="row m-0">
                {(news.length > 0) ? (
                    <div className="col-12 pt-2 pt-md-0 px-0">
                        <div className="row fw-bold my-3 d-none d-md-flex">
                            <div className="col-8 text-primary">Descripción</div>
                            <div className="col-4 text-primary">Fecha</div>
                        </div>
                        {news && news.map((n, index) => (
                            <div className={"row m-0 mt-2 rounded-full-10px p-2 " + ((index % 2) ? '' : 'bg-light')} key={index}>
                                <div className="col-8 d-none d-md-block px-1">{n.desc}</div>
                                <div className="col-4 d-none d-md-block">{n.date}</div>
                                <div className="col-12 d-block d-md-none px-1">
                                    <b>{n.date}</b> <br/>
                                    {n.desc}
                                </div>
                                {me.rol === 'admin' && (
                                    <div className="col-12 cursor-pointer text-end mt-3">
                                        <Tooltip text="Editar noticia">
                                            <EditIcon
                                                width={20}
                                                height={20}
                                                onClick={() => handleSetItemToEdit(index)}
                                                fill='#0dcaf0'
                                            />
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

export default News;
