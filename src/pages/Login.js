import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, loading]);

    return (
        <div className="container-fluid bg-light user-select-none">
            <div className="row min-h-100 d-flex align-items-center justify-content-center">
                <div className="col-auto d-flex flex-column align-items-center">
                    <img src={'/assets/images/login.png'} className="login-image" alt=""/>

                    <button className="btn btn-outline-google text-white d-flex align-items-center w-fit-content mt-3" onClick={signInWithGoogle}>
                        <img src={'/assets/images/icons/google.png'} width={20} alt=""/>
                        <span className="ms-2">Iniciar sesión</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
