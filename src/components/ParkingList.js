import React, {useEffect, useLayoutEffect, useState} from 'react';
import { ref, onValue, push, remove } from "firebase/database";
import { db } from "../services/firebase";
import moment from "moment";
import 'moment/locale/es';
import {Tooltip} from "./Tooltip";
import NoResults from "./NoResults";
import ToastSuccess from "./ToastSuccess";

moment.locale('es');

const ParkingList = ({user, me}) => {
    const [hours, setHours] = useState([]);
    const [days, setDays] = useState([]);
    const [parkingData, setParkingData] = useState([]);
    const [myParkingData, setMyParkingData] = useState([]);

    const [parkingNumber, setParkingNumber] = useState('');
    const [daySelected, setDaySelected] = useState('');
    const [hourSelected, setHourSelected] = useState('');
    const [amount, setAmount] = useState('');

    const [show, setShow] = useState(false);

    useEffect(() => {
        const _hours = [];
        for (let i = 0; i < 24; i++) {
            _hours.push({
                label: (("0" + i).slice(-2)) + ':00',
                value: i,
            })
        }

        setHours(_hours);
        setDays([
            {
                label: moment().format('dddd DD-MM-YYYY'),
                value: moment().format('DD-MM-YYYY'),
            }, {
                label: moment().add(1, 'days').format('dddd DD-MM-YYYY'),
                value: moment().add(1, 'days').format('DD-MM-YYYY'),
            }, {
                label: moment().add(2, 'days').format('dddd DD-MM-YYYY'),
                value: moment().add(2, 'days').format('DD-MM-YYYY'),
            }, {
                label: moment().add(3, 'days').format('dddd DD-MM-YYYY'),
                value: moment().add(3, 'days').format('DD-MM-YYYY'),
            }, {
                label: moment().add(4, 'days').format('dddd DD-MM-YYYY'),
                value: moment().add(4, 'days').format('DD-MM-YYYY'),
            }, {
                label: moment().add(5, 'days').format('dddd DD-MM-YYYY'),
                value: moment().add(5, 'days').format('DD-MM-YYYY'),
            }, {
                label: moment().add(6, 'days').format('dddd DD-MM-YYYY'),
                value: moment().add(6, 'days').format('DD-MM-YYYY'),
            },
        ]);
    }, []);

    useLayoutEffect(() => {
        const feedbacksRef = ref(db, 'parkingData')
        onValue(feedbacksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const _data = [];
                Object.keys(data).forEach(_id => {
                    _data.push({
                        id: _id,
                        ...data[_id]
                    });
                });
                setParkingData(_data);
                setMyParkingData(_data.filter(d => d.user === user.email));
            } else {
                setParkingData([]);
                setMyParkingData([]);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filterHoursByDate = () => {
        const hoursToRemove = [];

        parkingData.filter(inf => inf.date === daySelected && inf.parkingNumber === parseInt(parkingNumber)).forEach(inf => {
            let _h = inf.hour;
            hoursToRemove.push(_h);
            [...Array(inf.amount - 1)].forEach((_, i) => {
                _h += 1;
                hoursToRemove.push(_h);
            });
        });

        return hours.filter(h => (hoursToRemove.indexOf(h.value) === -1));
    }

    const createParkingTime = () => {
        const today = new Intl.DateTimeFormat('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            }).format(Date.now());
        push(ref(db, 'parkingData'), {
            created: today,
            amount: parseInt(amount),
            hour: parseInt(hourSelected),
            parkingNumber: parseInt(parkingNumber),
            date: daySelected,
            user: user.email,
        }).then(() => {
            reset();
            setShow(true);
        });
    }

    const reset = () => {
        setParkingNumber('');
        setHourSelected('');
        setDaySelected('');
        setAmount('');
    };

    const filterAmount = () => {
        const hoursAvailable = filterHoursByDate();
        const _amount = [];

        if (hourSelected) {
            [...Array(5)].forEach((_, i) => {
                if (hoursAvailable.filter(ha => ha.value === parseInt(hourSelected) + i).length) {
                    _amount.push({
                        value: i + 1,
                        label: (i + 1) + ' Hora',
                    });
                }
            });
        }

        return _amount;
    };

    return (
        <div className="col-12 custom-card">
            <span className="fw-bold fs-4">Estacionamiento</span>
            <div className="row mt-4">
                <div className="col-12 col-md-6 mx-auto position-relative">
                    <img src={'/assets/images/estacionamiento.jpg'} width="100%" alt=""/>
                    <div className={"card-parking parking-1 " + (parkingNumber === '1' ? 'bg-primary text-white' : '')} onClick={() => {
                        setParkingNumber('1');
                        setAmount('');
                        setDaySelected('');
                        setHourSelected('');
                    }}>1</div>
                    <div className={"card-parking parking-2 " + (parkingNumber === '2' ? 'bg-primary text-white' : '')} onClick={() => {
                        setParkingNumber('2');
                        setAmount('');
                        setDaySelected('');
                        setHourSelected('');
                    }}>2</div>
                    <div className={"card-parking parking-3 " + (parkingNumber === '3' ? 'bg-primary text-white' : '')} onClick={() => {
                        setParkingNumber('3');
                        setAmount('');
                        setDaySelected('');
                        setHourSelected('');
                    }}>3</div>
                    <div className={"card-parking parking-4 " + (parkingNumber === '4' ? 'bg-primary text-white' : '')} onClick={() => {
                        setParkingNumber('4');
                        setAmount('');
                        setDaySelected('');
                        setHourSelected('');
                    }}>4</div>
                    <div className={"card-parking parking-5 " + (parkingNumber === '5' ? 'bg-primary text-white' : '')} onClick={() => {
                        setParkingNumber('5');
                        setAmount('');
                        setDaySelected('');
                        setHourSelected('');
                    }}>5</div>
                </div>
                <div className="col-12 col-md-5">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <label htmlFor="selectDate" className="form-label">Día</label>
                            <select id="selectDate" className="form-select" disabled={parkingNumber === ''} value={daySelected} onChange={(e) => setDaySelected(e.target.value)}>
                                <option value="">Seleccionar día</option>
                                {days.filter(d => myParkingData.map(mpd => mpd.date).indexOf(d.value) === -1).map(d => (
                                    <option value={d.value} key={d.value}>{d.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 mb-4">
                            <label htmlFor="selectTime" className="form-label">Hora</label>
                            <select id="selectTime" className="form-select" disabled={daySelected === ""} value={hourSelected} onChange={(e) => setHourSelected(e.target.value)}>
                                <option value="">Seleccionar hora</option>
                                {filterHoursByDate().map(h => (
                                    <option value={h.value} key={h.value}>{h.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12">
                             <label htmlFor="amount" className="form-label">¿Cuántas horas lo ocupará?</label>
                            <select id="amount" className="form-select" disabled={hourSelected === ""} value={amount} onChange={(e) => setAmount(e.target.value)}>
                                <option value="">Seleccionar cantidad de horas</option>
                                {filterAmount().map(h => (
                                    <option value={h.value} key={h.value}>{h.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-4 text-end">
                    <button
                        className="btn btn-outline-primary"
                        disabled={hourSelected === '' || daySelected === '' || amount === ''}
                        onClick={() => createParkingTime()}
                    >Apartar puesto</button>
                    <button className="btn btn-light ms-2" onClick={() => reset()}>Cancelar</button>
                </div>
            </div>
            <div className="row mt-5 mt-md-4">
                <div className="col-12">
                    <span className="fw-bold">Listado de puestos apartados</span>
                </div>
            </div>
            <div className="row m-0 mt-2">
                {(me.rol === 'admin' ? (
                    parkingData.length > 0
                ) : parkingData.filter(pd => pd.user === user?.email).length > 0) ? (
                    <div className="col-12 pt-2 pt-md-0 px-0">
                        <div className="row fw-bold my-3 d-none d-md-flex">
                            {me.rol === 'admin' && <div className="col text-primary">Usuario</div>}
                            <div className="col text-primary">Día</div>
                            <div className="col text-primary">Horario</div>
                            <div className="col-3 text-primary">Nº Estacionamiento</div>
                        </div>
                        {(me.rol === 'admin' ? (parkingData) : (
                            parkingData.filter(pd => pd.user === user.email)
                        )).map((parkingItem, index) => (
                            <div className={"row m-0 mt-2 rounded-full-10px p-2 position-relative " + ((index % 2) ? '' : 'bg-light')} key={index}>
                                <div className="cursor-pointer position-absolute w-fit-content right-0">
                                    <Tooltip text="Liberar puesto de estacionamiento">
                                        <i className="icon-close text-danger p-2" onClick={() => {
                                            remove(ref(db, 'parkingData/' + parkingItem.id)).then(() => {
                                                setShow(true);
                                            });
                                        }}/>
                                    </Tooltip>
                                </div>
                                {me.rol === 'admin' && <div className="col d-none d-md-block px-1">{parkingItem.user}</div>}
                                <div className="col d-none d-md-block px-1">{parkingItem.date}</div>
                                <div className="col d-none d-md-block px-1">{
                                    (("0" + parkingItem.hour).slice(-2)) + ':00 - ' + (("0" + (parkingItem.hour + parkingItem.amount)).slice(-2)) + ':00'
                                }</div>
                                <div className="col-3 d-none d-md-block px-3">{parkingItem.parkingNumber}</div>
                                <div className="col-10 d-block d-md-none px-1">
                                    {me.rol === 'admin' && <>
                                        <b>Usuario:</b> <small>{parkingItem.user}</small> <br/>
                                    </>}
                                    <b>Día:</b> <small>{parkingItem.date}</small> <br/>
                                    <b>Nº Estacionamiento:</b> <small>{parkingItem.parkingNumber}</small> <br/>
                                    <b>Horario:</b> <small>{
                                        (("0" + parkingItem.hour).slice(-2)) + ':00 - ' + (("0" + (parkingItem.hour + parkingItem.amount)).slice(-2)) + ':00'
                                    }</small>
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

export default ParkingList;
