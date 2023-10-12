"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/redux/hook';

import axios from 'axios';
import { useSelector } from 'react-redux';


import { toast } from 'react-toastify';
import { createPositionAsync, getPositonListAsync, getpositionList } from '@/redux/slices/positionSlice';
import Header from '@/component/Header';
import { Position } from '@/models/position';
import { createAccAsync } from '@/redux/slices/accountSlice';

const AddAcc = ({ params }: { params: { id: number } }) => {

    const [checkV, setCheck] = useState(false)
    const now = new Date();
    const year = now.getFullYear(); 
    let month = '';
    if (now.getMonth() + 1 >= 10) {
        month = `${now.getMonth() + 1}`;
    } else {
        month = `0${now.getMonth() + 1}`;
    }
    let date = '';
    if (now.getDate() >= 10) {
        date = `${now.getDate() + 1}`;
    } else {
        date = `0${now.getDate() + 1}`;
    }
    const today = `${year}-${month}-${date}`;
    console.log(month)
    const [values, setValues] = useState({
        address: "",
        birthday: today,
        email: "",
        ethnic: "",
        gender: 0,
        identity_number: "",
        name: "",
        password: "",
        phone: "",
        position_id: params.id,
        status: 1,
        userId: "000",
        isParent: false
    });

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getPositonListAsync())

    }, []);
    const [positionSelected, setPosition] = useState(0);
    const [parent, setParent] = useState(0);
    const positions: any[] = useAppSelector(getpositionList)


    // handle change values
    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
        // setValues({
        //     ...values,
        //     [e.target.name]: e.target.value
        // });
        console.log(values)
    }// Xử lý sự kiện thay đổi cho checkbox
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        setValues(prevValues => ({
            ...prevValues,
            [name]: checked
        }));
        // console.log(values.isParent, parent)
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(values)
        dispatch(createAccAsync(values));
    }


    return (
        <div>
                    <form className='bg-white p-5 border col-8' onSubmit={handleSubmit} method='POST'>
                        <h3 className='text-center'>{positions.map((position: any) => {
                            if (position.id == params.id)
                                return (<>{position.name}</>)
                        })}</h3>
                        <div className="row">
                            <div className="col-6">
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Name:</label>
                                    <input type="text" className="form-control" id="name" name='name' required
                                        value={values.name}
                                        onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Ngày sinh</label>
                                    <input type="date" className="form-control" id="birthday" name='birthday' required
                                        value={values.birthday}
                                        onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Phone:</label>
                                    <input type="text" className="form-control" id="phone" name='phone' required
                                        value={values.phone}
                                        onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Ethnic:</label>
                                    <input type="text" className="form-control" id="ethnic" name='ethnic' required
                                        value={values.ethnic}
                                        onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Address:</label>
                                    <input type="text" className="form-control" id="address" name='address' required
                                        value={values.address}
                                        onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Gender:</label>
                                    <select className="form-select" aria-label="Default select example" name='gender' onChange={handleChange} value={values.gender} >
                                        <option value={0} >Nam</option>
                                        <option value={1} >Nữ</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Identity:</label>
                                    <input type="text" className="form-control" id="identity_number" name='identity_number' required
                                        value={values.identity_number}
                                        onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Email:</label>
                                    <input type="text" className="form-control" id="email" name='email' required
                                        value={values.email}
                                        onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <input type="checkbox" className="form-check-input"
                                        name="isParent"
                                        checked={values.isParent}
                                        onChange={handleCheckboxChange} /> <label htmlFor="name" className="form-check-label">  Is a parent?:</label>
                                </div>
                            </div>
                        </div>
                        <div className='d=flex flex-row mt-5'>
                            <button type="submit" className="btn btn-primary me-4">+ Thêm</button>
                            <Link href={'/'} shallow className="btn btn-secondary"><i className="bi bi-backspace me-2"></i> Quay lại</Link>
                        </div>
                    </form>
                    <div className="modal fade shadow" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header border-0">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Xác nhận xóa</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body ">
                                    <div>Bạn có chắc muốn khóa tài khoản của
                                        <span className='text-primary'>{values.name} </span>
                                        - có username: <span className='text-primary'>{ } </span> </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal"><i className="bi bi-x-circle me-2"></i>Hủy</button>
                                    {/* <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onDel}><i className="bi bi-check-circle me-2"></i> Đồng ý</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default AddAcc

// pages/yourPage.tsx

