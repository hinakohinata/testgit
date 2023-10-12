"use client"
import axios from "axios";
import React, { useState } from 'react';
import { useRouter } from "next/navigation"
import { useAppDispatch } from '@/redux/hook';
import { login, logout, setUser } from "@/redux/slices/userSlice";
import {pushRouter} from '../(Dashboard)/authen/pushRouter';

export default function Home() {
  pushRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch()
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    // dispatch(login({ username, password }))

  };
  return (
    <>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">

              <div className="px-5 ms-xl-4">
                <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                <form>

                  <h3 className="fw-normal mb-3 pb-3" >Forgot password</h3>

                  <div className="form-outline mb-4">
                    <label className="form-label">Email</label>
                    <input type="email" id="form2Example18" className="form-control form-control-lg" onChange={e => setUsername(e.target.value)} />
                  </div>

                  {/* <div className="form-outline mb-4">
                    <label className="form-label">Password</label>
                    <input type="password" id="form2Example28" className="form-control form-control-lg" onChange={e => setPassword(e.target.value)} />
                  </div> */}

                  <div className="pt-1 mb-4">
                    <button className="btn btn-info btn-lg btn-block" onClick={handleLogin} >Send code</button>
                  </div>

                  {/* <p className="small mb-5 pb-lg-2"><a className="text-muted" href="/forgot_password">Forgot password?</a></p> */}
                  <p>Remember password? <a href="/" className="link-info">Login here</a></p>

                </form>

              </div>

            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                alt="Login image" className="w-100 vh-100" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
