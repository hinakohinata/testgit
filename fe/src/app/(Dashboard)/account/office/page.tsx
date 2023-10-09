
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
// import { checkRole } from '@/authen/checkRole';
import AccountAll from '@/component/AccountAll';
import { checkRole } from '../../authen/checkRole';

const RegisterPage = () => {
  
  // checkRole(1);

  return (
    <main>
      <AccountAll/>

    </main>
  );
};

export default RegisterPage;
