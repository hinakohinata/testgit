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
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { IconSelector } from '@tabler/icons-react';


const UpdateAndDelAcc = ({ params }: { params: { id: number } }) => {
    const accId = params.id;
    const selectedAcc = useAppSelector(getAcc);
    const positions: any[] = useAppSelector(getpositionList)
    const [open, setOpen] = useState(false);
    const [acc, setAcc] = useState({
        address: "",
        birthday: "",
        email: "",
        ethnic: "",
        gender: 0,
        identity_number: "",
        name: "",
        password: "",
        phone: "",
        position_id: 0,
        role1: 0,
        role2: 0,
        role3: 0,
        role4: 0,
        role5: 0,
        role6: 0,
        role7: 0,
        role8: 0,
        status: "1",
        userId: params.id
    });

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getPositonListAsync())
        dispatch(getAccById(accId));
    }, [accId, dispatch]);
    useEffect(() => {
        if (selectedAcc)
            setAcc(selectedAcc);
    }, [selectedAcc]);
    console.log(selectedAcc,"selectedAcc",acc)
    const handleChange = (e: any) => {        
        setAcc({
            ...acc,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(acc);
        dispatch(updateInfAccAsync(acc));
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
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <Typography variant="h4" align="center">
                            Cập nhật thông tin tài khoản: {accId}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6"> Position: {positions.map((p: any) => {
                                        if (p.id == acc.position_id)
                                            return (p.name)
                                    })}</Typography>
                                </Grid>
                                <Grid item xs={12}>

                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        value={acc.name}
                                        onChange={handleChange}
                                        name="name"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Phone"
                                        variant="outlined"
                                        value={acc.phone}
                                        onChange={handleChange}
                                        name="phone"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Ethnic"
                                        variant="outlined"
                                        value={acc.ethnic}
                                        onChange={handleChange}
                                        name="ethnic"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box>
                            <Grid container spacing={2}>
                                {/* <Typography variant="h6">Thông tin cá nhân</Typography> */}

                                <Grid item xs={12}>
                                    <Typography variant="h6">Other: {(() => {
                                        return acc.role8==1 ? 'Phụ huynh' : 'none';
                                    })()}

                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Address"
                                        variant="outlined"
                                        value={acc.address}
                                        onChange={handleChange}
                                        name="address"
                                        fullWidth
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        select
                                        label="Gender"
                                        value={acc.gender}
                                        onChange={handleChange}
                                        name="gender"
                                    >
                                    <MenuItem value={0} key="nam">Nam</MenuItem>
                                    <MenuItem value={1} key="nu">Nữ</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Identity"
                                        variant="outlined"
                                        value={acc.identity_number}
                                        onChange={handleChange}
                                        name="identity_number"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        value={acc.email}
                                        onChange={handleChange}
                                        name="email"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row" justifyContent="flex-end">
                            <Button variant="contained" color="primary" type="submit">Lưu</Button>
                            <Button variant="outlined" color="error"
                        onClick={() => setOpen(true)}>Khóa tài khoản</Button>
                        <Button  disableElevation  variant="contained" color="primary"  href="/account/office">Quay lại</Button>
                        </Stack>
                    </Grid>

                </Grid>
            </form>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    Bạn có chắc muốn khóa tài khoản của <span className='text-primary'>{acc.name}</span> - có username: <span className='text-primary'>{accId}</span>
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
