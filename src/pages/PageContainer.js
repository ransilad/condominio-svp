import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { ref, onValue} from "firebase/database";
import { auth, db } from "../services/firebase";
import Menu from "../components/Menu";
import News from "../components/News";
import Priorities from "../components/Priorities";
import AdministrativeStaff from "../components/AdministrativeStaff";
import NotAuthorized from "../components/NotAuthorized";
import Header from "../components/Header";
import Feedbacks from "../components/Feedbacks";
import ParkingList from "../components/ParkingList";
import Files from "../components/Files";
import Users from "../components/Users";
import {useAddToHomescreenPrompt} from "../components/useAddToHomescreenPrompt";

function PageContainer({ page }) {
    const [user, loading] = useAuthState(auth);
    const [prompt, promptToInstall] = useAddToHomescreenPrompt();
    const navigate = useNavigate();

    const [loadingPage, setLoadingPage] = useState(true);
    const [me, setMe] = useState({
        active: false,
    });
    const [isVisible, setVisibleState] = useState(false);

    const fetchUserName = async () => {
        const usersRef = ref(db, 'users/' + btoa(user.email));
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            setLoadingPage(false);

            if (data) setMe(data);
        });
    };

    useEffect(() => {
        if (prompt) {
            console.log('Pasa 1');
            setVisibleState(true);
        }
        console.log('Pasa 2');
    }, [prompt])

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");

        fetchUserName();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);

    return (
        <div className="container-fluid bg-white">
            <div className="row min-h-100">
                <Menu opActive={page} me={me}/>
                {loadingPage && (
                    <div className="col bg-light rounded-left-30px p-4 rounded-0-sm-only">
                        <div className="row h-100 align-items-center">
                            <div className="col-6 text-center mx-auto">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Obteniendo información</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {!loadingPage ? (
                    <div className="col bg-light rounded-left-30px p-4 rounded-0-sm-only">
                        <Header user={user} opActive={page} me={me}/>

                        {(me.active === false) ? <NotAuthorized /> : (
                            <div className="row">
                                <div className="col-12 mt-4">
                                    {page === 'dashboard' && (
                                        <>
                                            <div className="row m-0 mb-4">
                                                <News me={me}/>
                                            </div>
                                            <div className="row m-0">
                                                <Priorities me={me}/>
                                                <AdministrativeStaff />
                                            </div>
                                        </>
                                    )}
                                    {page === 'feedback' && (
                                        <>
                                            <div className="row m-0 mb-4">
                                                <Feedbacks user={user}/>
                                            </div>
                                        </>
                                    )}
                                    {page === 'parking' && (
                                        <>
                                            <div className="row m-0">
                                                <ParkingList user={user} me={me}/>
                                            </div>
                                        </>
                                    )}
                                    {page === 'files' && (
                                        <>
                                            <div className="row m-0 mb-4">
                                                <Files user={user} me={me}/>
                                            </div>
                                        </>
                                    )}
                                    {page === 'users' && (
                                        <>
                                            <div className="row m-0 mb-4">
                                                <Users user={user} me={me}/>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : null}
            </div>

            {isVisible && (
                <div className="card-install-pwa" onClick={() => setVisibleState(false)}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className="row">
                                    <div className="col-auto d-flex align-items-center pe-0 cursor-pointer">
                                        <i className="icon-close" onClick={() => setVisibleState(false)} />
                                    </div>
                                    <div className="col d-flex align-items-center flex-column px-0">
                                        <strong>Condominio SVP 4444</strong>
                                        <small className="fst-italic">Agregar a la pantalla inicial</small>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-primary" onClick={promptToInstall}>Instalar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PageContainer;
