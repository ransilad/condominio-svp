import React, {useLayoutEffect, useState} from 'react';
import { ref, onValue, push} from "firebase/database";
import { db } from "../services/firebase";
import NoResults from "./NoResults";
import ToastSuccess from "./ToastSuccess";

const Feedbacks = ({user}) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [note, setNote] = useState('');
    const [show, setShow] = useState(false);

    useLayoutEffect(() => {
        const feedbacksRef = ref(db, 'feedbacks')
        onValue(feedbacksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const _data = [];
                Object.keys(data).forEach(_id => {
                    if (data[_id].public === true || data[_id].user === user.displayName) {
                        _data.push({
                            id: _id,
                            ...data[_id]
                        })
                    }
                });
                setFeedbacks(_data);
            } else {
                setFeedbacks([]);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createFeedback = () => {
        const today = Date.now();
        push(ref(db, 'feedbacks'), {
            date: new Intl.DateTimeFormat('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            }).format(today),
            desc: note,
            public: isChecked === true,
            user: user.displayName,
        }).then(() => {
            setNote('');
            setIsChecked(false);
            setShow(true);
        });
    }

    return (
        <div className="col-12 custom-card">
            <span className="fw-bold fs-4">Quejas</span>
            <div className="row my-4">
                <div className="col-12">
                    <textarea
                        className="form-control"
                        placeholder="Ingresar queja"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={2}
                    ></textarea>
                </div>
                <div className="col-12">
                    <div className="row mt-2 mt-md-3">
                        <div className="col-12 col-md-auto">
                            <div className="form-check mt-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckChecked"
                                    checked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Quiero que sea una nota pública
                                </label>
                            </div>
                        </div>
                        <div className="col-12 col-md-auto ms-auto mt-3 mt-md-0 text-end">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() => createFeedback()}
                                disabled={note.length < 20}
                            >Guardar nota</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row m-0">
                {(feedbacks.length > 0) ? (
                    <div className="col-12 pt-2 pt-md-0 px-0">
                        <div className="row fw-bold my-3 d-none d-md-flex">
                            <div className="col-3 text-primary">Autor</div>
                            <div className="col-5 text-primary">Descripción</div>
                            <div className="col-4 text-primary">Fecha</div>
                        </div>
                        {feedbacks && feedbacks.map((n, index) => (
                            <div className={"row m-0 mt-2 rounded-full-10px p-2 " + ((index % 2) ? '' : 'bg-light')} key={index}>
                                <div className="col-3 d-none d-md-block px-1">{n.user}</div>
                                <div className="col-5 d-none d-md-block px-1">{n.desc}</div>
                                <div className="col-4 d-none d-md-block">{n.date}</div>
                                <div className="col-12 d-block d-md-none px-1">
                                    <b>{n.user}</b> <br/>
                                    <small>{n.date}</small> <br/>
                                    {n.desc}
                                </div>
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

export default Feedbacks;
