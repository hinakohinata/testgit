
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
// import MyCarousel from '../components/Carousel';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { getRole, selectIsLoggedIn } from '@/redux/slices/userSlice';
import { useSelector } from 'react-redux';
import Header from '@/component/Header';

const RegisterPage = () => {
  

  return (
    <main>
    <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                <Link href="/" className="btn btn-primary">Go Home</Link>
            </div>
        </div>

    </main>
  );
};

export default RegisterPage;
