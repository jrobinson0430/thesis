import React from 'react';
import { Toast } from 'react-bootstrap';
import './Toast.css';

const ToastAlert = ({ toastMsg }) => (
  <Toast className='bg-dark text-light' id="toastStyles">
    <Toast.Body className='text-center'>{toastMsg}</Toast.Body>
  </Toast>
);

export default ToastAlert;
