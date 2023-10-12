"use client"
// import { deleteAuthorAsync, getAuthor, getAuthorById, updateAuthorAsync } from '@/redux-store/author-reducer/authorSlide';
// import { useAppDispatch, useAppSelector } from '@/redux-store/hook';
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { disableAccAsync, getAcc, getAccById, updateInfAccAsync } from '@/redux/slices/accountSlice';
import Header from '@/component/Header';
import { getPositonListAsync, getpositionList } from '@/redux/slices/positionSlice';
import { Box, Button,  Dialog,  DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';


const UpdateAndDelAcc = ({ params }: { params: { id: number } }) => {
    const accId = params.id;
    const selectedAuthor = useAppSelector(getAcc);
    const positions: any[] = useAppSelector(getpositionList)
    const [open, setOpen] = useState(false); 
    const [acc, setAcc] = useState({
        address: "",
        birthday: "",
        email: "",
        ethnic: "",
        gender: {
            type: 'Buffer',
            data: [0]
        },
        identity_number: "",
        name: "",
        password: "",
        phone: "",
        position_id: 0,
        role1: {
            type: 'Buffer',
            data: [0]
        },
        role2: {
            type: 'Buffer',
            data: [0]
        },
        role3: {
            type: 'Buffer',
            data: [0]
        },
        role4: {
            type: 'Buffer',
            data: [0]
        },
        role5: {
            type: 'Buffer',
            data: [0]
        },
        role6: {
            type: 'Buffer',
            data: [0]
        },
        role7: {
            type: 'Buffer',
            data: [0]
        },
        role8: {
            type: 'Buffer',
            data: [0]
        },
        status: "1",
        userId: params.id
    });
    const roles = Object.keys(acc).filter(key => key.startsWith('role') && (acc as any)[key].data[0] === 1);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPositonListAsync())
        dispatch(getAccById(accId));
    }, [accId, dispatch]);
    useEffect(() => {
        // Cập nhật author sau khi getAuthorById thực thi
        if (selectedAuthor)
            setAcc(selectedAuthor);
    }, [selectedAuthor]);
    // handle change author
    const handleChange = (e: any) => {
        let value = e.target.value;
        if (e.target.name === 'gender') {
            value = {
                type: 'Buffer',
                data: [parseInt(e.target.value, 10)]
            };
        }
        setAcc({
            ...acc,
            [e.target.name]: value
        });
    }
    const handleChangeForRole = (e: any) => {
        const selectedRoleId = e.target.value;

        // Đặt tất cả roles về 0
        const resetRoles = positions.reduce((obj, role) => {
            obj[role.id] = { type: 'Buffer', data: [0] };
            return obj;
        }, {} as any);

        // Đặt role được chọn về 1
        setAcc(prevState => ({
            ...prevState,
            ...resetRoles,
            [selectedRoleId]: { type: 'Buffer', data: [1] }
        }));
    }

    //cập nhật tác giả theo id
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(acc);
        // dispatch(updateInfAccAsync(acc));
    }
    const router = useRouter()
    //xóa
    const onDel = () => {
        dispatch(disableAccAsync(accId));
        // router.replace('/role1')
    }
    return (
        <div>
            <form className='bg-white p-5' onSubmit={handleSubmit} method='POST'>
                <div className="mb-4 fw-bold">
                    <h3 className='mb-3 text-center'>
                        <span className='border-bottom border-primary'>Cập nhật chỉnh sửa thông tin</span>
                    </h3>

                    <div className="row">
                        <div className="col-6"><div>Id tài khoản: <span className='text-primary'>{accId}</span></div>Posision:
                            <span className='text-info'> {positions.map((p: any) => {
                                if (p.id == acc.position_id)
                                    return (p.name)
                            })}</span>
                        </div>
                        <div className="col-6">Parent: <span className='text-info'>{(() => {
                            return acc.role8.data[0] ? 'Parent' : 'none';
                        })()}</span>

                            {/* <select>
                                    {roles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select> */}
                            <select value={acc.position_id} name="position_id" onChange={handleChangeForRole} >
                                {positions.map((p: any) => {
                                    if (p.id == acc.position_id)
                                        return (<option key={p.id} value={p.id} selected>{p.name}</option>)
                                    else
                                        return (<option key={p.id} value={p.id}>{p.name}</option>)
                                })}
                            </select>

                            <div className="mb-4">
                                <input type="checkbox" className="form-check-input"

                                /> <label htmlFor="name" className="form-check-label">  Is a parent?:</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={6}>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        value={acc.name}
                                        onChange={handleChange}
                                        name="name"
                                        fullWidth
                                    />
                                    <TextField
                                        label="Ngày sinh"
                                        type="date"
                                        variant="outlined"
                                        value={acc.birthday}
                                        onChange={handleChange}
                                        name="birthday"
                                        InputLabelProps={{
                                            shrink: true,
                                        }} fullWidth
                                    />
                                    <TextField
                                        label="Phone"
                                        variant="outlined"
                                        value={acc.phone}
                                        onChange={handleChange}
                                        name="phone"
                                        fullWidth
                                    />
                                    <TextField
                                        label="Ethnic"
                                        variant="outlined"
                                        value={acc.ethnic}
                                        onChange={handleChange}
                                        name="ethnic"
                                        fullWidth
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    autoComplete="off"
                                >
                                    <TextField
                                        label="Address"
                                        variant="outlined"
                                        value={acc.address}
                                        onChange={handleChange}
                                        name="address"
                                        fullWidth
                                    />
                                    <FormControl variant="outlined" className="mb-4">
                                        <InputLabel id="gender-label">Gender</InputLabel>
                                        <Select
                                            labelId="gender-label"
                                            value={acc.gender.data[0]}
                                            onChange={handleChange}
                                            name="gender"
                                            label="Gender" fullWidth
                                        >
                                            <MenuItem value={0}>Nam</MenuItem>
                                            <MenuItem value={1}>Nữ</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        label="Identity"
                                        variant="outlined"
                                        value={acc.identity_number}
                                        onChange={handleChange}
                                        name="identity_number"
                                        fullWidth
                                    />
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        value={acc.email}
                                        onChange={handleChange}
                                        name="email"
                                        fullWidth
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <div className="col-6">
                    </div>
                </div>
                <div className='d=flex flex-row mt-5'>
                    <button type="submit" className="btn btn-primary me-4"><i className="bi bi-arrow-counterclockwise me-2"></i> Cập nhật</button>
                    {/* <button type="button" className="btn btn-danger me-4" data-bs-toggle="modal" data-bs-target="#exampleModal "> <i className="bi bi-trash3-fill me-2"></i>Khóa tài khoản</button> */}

                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Delete />}
                        className="me-4"
                        onClick={() => setOpen(true)}>
                        Khóa tài khoản
                    </Button>
                    <Link href={'/'} shallow className="btn btn-secondary"><i className="bi bi-backspace me-2"></i> Quay lại</Link>
                </div>
            </form>
            {/* <!-- Modal --> */}
            {/* <div className="modal fade shadow" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Xác nhận xóa</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body ">
                            <div>Bạn có chắc muốn khóa tài khoản của
                                <span className='text-primary'>{acc.name} </span>
                                - có username: <span className='text-primary'>{accId} </span> </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal"><i className="bi bi-x-circle me-2"></i>Hủy</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onDel}><i className="bi bi-check-circle me-2"></i> Đồng ý</button>
                        </div>
                    </div>
                </div>
            </div> */}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    Bạn có chắc muốn khóa tài khoản của
                    <span className='text-primary'>{acc.name}</span>
                    - có username: <span className='text-primary'>{accId}</span>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary" >
                        Hủy
                    </Button>
                    <Button onClick={onDel} color="primary">
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default UpdateAndDelAcc
