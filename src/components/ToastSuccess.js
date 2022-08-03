import React from 'react';
import {Toast, ToastContainer} from "react-bootstrap";

const ToastSuccess = ({ show, setShow }) => {
    return (
        <ToastContainer position="top-center" className="mt-2 position-fixed">
            <Toast delay={5000} autohide={true} onClose={() => setShow(false)} show={show} className="bg-success text-white">
                <Toast.Body className="text-center">Operación realizada con éxito</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastSuccess;
