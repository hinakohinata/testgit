'use client';
import { Typography, Grid,  Box, Table, TableHead, TableRow, TableCell, Chip, TableBody, Toolbar, styled, IconButton, Stack, Button, TextField, AppBar, Dialog, DialogTitle, DialogContent, MenuItem, DialogActions } from '@mui/material';

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import PageContainer from '@/template/(DashboardLayout)/components/container/PageContainer';
import { changeRoomAsmAsync, getAssignmentManList, getAssignmentManListAsync, setOffAsmAsync } from '@/redux/slices/assignmentManSlice';
import { getaccList, getaccListAsync } from '@/redux/slices/accountSlice';
import { getRoomList, getRoomListAsync } from '@/redux/slices/roomReducer';
import { getACCforAddAsm7ListAsync } from '@/redux/slices/otherSlice';
import { IconX } from '@tabler/icons-react';
import { IconStatusChange } from '@tabler/icons-react';


const UpdateAndDelAcc = () => {
    console.log("hello1")
    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: 'none',
        background: theme.palette.background.paper,
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        [theme.breakpoints.up('lg')]: {
            minHeight: '70px',
        },
    }));
    const assignments: any[] = useAppSelector(getAssignmentManList)
    const accNoneList: any[] = useAppSelector(getaccList)
    const roomList: any[] = useAppSelector(getRoomList)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAssignmentManListAsync());
        dispatch(getRoomListAsync());
        dispatch(getACCforAddAsm7ListAsync());
    }, []);
    const [checkedId, setCheckedId] = useState(false);
    const [checkedId1, setCheckedId1] = useState(null);
    const [checkedId2, setCheckedId2] = useState(null);

    const [values, setValues] = useState({
        user_id: "",
        room_id: ""
    });
    const [valuesUpd, setValuesUpd] = useState({
        id: "",
        user_id: "",
        room_id: ""
    });
    // handle change values
    const handleChange = (e: any) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
        console.log(values);
    }
    // handle change values
    const handleChange1 = (e: any) => {
        setValuesUpd({
            ...valuesUpd,
            [e.target.name]: e.target.value
        });
        console.log(valuesUpd);
    }
    const setCheckClose = () => {
        setCheckedId(false);
        // Các hành động khác nếu cần
    };

    const setCheckClose1 = () => {
        setCheckedId1(null);
        // Các hành động khác nếu cần
    };

    const setCheckClose2 = () => {
        setCheckedId2(null);
        // Các hành động khác nếu cần
    };
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(values)
        setCheckClose();
        dispatch(getAssignmentManListAsync());
        dispatch(getRoomListAsync());
        dispatch(getACCforAddAsm7ListAsync());
    }

    return (

        <PageContainer title="Dashboard" description="this is Dashboard">
            <AppBarStyled position="sticky" color="default">
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={8}>
                            <h3>Assignment</h3>
                        </Grid>
                        
                        <Grid item xs={12} lg={4}>
                            <Stack spacing={1} direction="row" alignItems="center">
                                <TextField />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setCheckedId(true)}>
                                    Add +
                                </Button>
                                <Dialog
                                    open={checkedId}
                                    onClose={() => setCheckedId(false)}
                                    aria-labelledby="form-dialog-title"
                                    maxWidth="md" // Đặt chiều rộng tối đa
                                    fullWidth={true} // Chiếm toàn bộ chiều rộng
                                >
                                    <DialogTitle id="form-dialog-title" >
                                        Thêm phân công : <b className="text-danger " style={{ fontSize: "30px" }}></b>
                                    </DialogTitle>
                                    <DialogContent>
                                        <form className='bg-white p-5' onSubmit={handleSubmit} method='POST'>
                                            <Grid container spacing={3}>

                                                <Grid item xs={12} md={6}>
                                                    <Box>
                                                        <Grid container spacing={2}>

                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    select
                                                                    label="User"
                                                                    value={values.user_id !== undefined ? values.user_id : 0}
                                                                    onChange={handleChange}
                                                                    name="user_id"
                                                                >
                                                                    {Array.isArray(accNoneList) && accNoneList.map((acc) => {

                                                                        return (<MenuItem value={acc.user_id} key={`abcd${acc.user_id}`}>{acc.name} - {acc.pname}</MenuItem>)
                                                                    })}
                                                                </TextField>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Box>
                                                        <Grid container spacing={2}>


                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    select
                                                                    label="Room"
                                                                    value={values.room_id !== undefined ? values.room_id : 0}
                                                                    onChange={handleChange}
                                                                    name="room_id"
                                                                >
                                                                    {Array.isArray(roomList) && roomList.map((room) => {

                                                                        return (<MenuItem value={room.room_id} key={`abcd${room.room_id}`}>{room.room_id} - {room.name}</MenuItem>)
                                                                    })}
                                                                </TextField>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={async () => {
                                            setCheckClose();
                                            // dispatch(getCheckinBydateAsync(selectedDate));
                                        }} color="primary" variant="outlined">
                                            <i className="bi bi-gear"> Cập nhật</i>
                                        </Button>
                                        <Button onClick={setCheckClose} color="primary" variant="outlined" style={{ marginLeft: "10px" }}>
                                            Đóng
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </AppBarStyled>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>

                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Create time
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Position
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Room
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {Array.isArray(assignments) && assignments.map((asm) => {
                            if (Number(asm.pid)==7)
                        return(
                            <TableRow key={asm.id}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                    {asm.user_id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {asm.uname}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {asm.created_time}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {asm.pname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {asm.rname}
                                    </Typography>
                                </TableCell>
                                <TableCell>

                                    {asm.status == 1 ? <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: "secondary.main",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label="Phụ trách"
                                    ></Chip> : <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: "error.main",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label="Hết nhiệm kỳ"
                                    ></Chip>}
                                </TableCell>
                                        <TableCell>

                                            {asm.status == 1 ? <Chip
                                                sx={{
                                                    px: "4px",
                                                    backgroundColor: "error.main",
                                                    color: "#fff",
                                                }}
                                                size="small"

                                                onClick={() => setCheckedId2(asm.id)}
                                                label={<IconX style={{ color: "#fff" }} />}
                                            /> : <Chip
                                                sx={{
                                                    px: "4px",
                                                    backgroundColor: "error.main",
                                                    color: "#fff",
                                                }}
                                                size="small"
                                                label={<IconX style={{ color: "#fff" }} />}
                                            />
                                                // <Chip
                                                //     sx={{
                                                //         px: "4px",
                                                //         backgroundColor: "success.main",
                                                //         color: "#fff",
                                                //     }}
                                                //     size="small"
                                                //     // onClick={() => checkOn(asm.id)}
                                                //     label={<IconCheck style={{ color: "#fff" }} />}
                                                // />
                                            }
                                            <Chip
                                                sx={{
                                                    px: "4px",
                                                    backgroundColor: "primary.main",
                                                    color: "#fff",
                                                }}
                                                size="small"
                                                onClick={() => {
                                                    setCheckedId1(asm.id)
                                                    valuesUpd.user_id = asm.user_id
                                                    valuesUpd.id = asm.id
                                                }
                                                }
                                                label={<IconStatusChange style={{ color: "#fff" }} />}
                                            />

                                            <Dialog
                                                open={checkedId2 === asm.id}
                                                onClose={() => setCheckedId2(null)}>
                                                <DialogTitle>Xác nhận xóa</DialogTitle>
                                                <DialogContent>
                                                    Bạn có chắc muốn cập nhật trạng thái của {asm.uname}?
                                                </DialogContent>
                                                <DialogActions>

                                                    <Button onClick={setCheckClose2} 
                                                    color="primary" variant="outlined" style={{ marginLeft: "10px" }}>
                                                        Hủy
                                                    </Button>
                                                    <Button onClick={async () => {
                                                        await dispatch(setOffAsmAsync({ id: asm.id }));
                                                        setCheckClose2()
                                                        dispatch(getAssignmentManListAsync());
                                                        dispatch(getACCforAddAsm7ListAsync());
                                                    }} color="primary">
                                                        Đồng ý
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>

                                            <Dialog
                                                open={checkedId1 === asm.id}
                                                onClose={() => setCheckedId1(null)}
                                                aria-labelledby="form-dialog-title"
                                                maxWidth="md" // Đặt chiều rộng tối đa
                                                fullWidth={true} // Chiếm toàn bộ chiều rộng
                                            >
                                                <DialogTitle id="form-dialog-title" >
                                                    Chuyển phòng : {asm.user_id} - {asm.uname}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Box>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12}>
                                                                        <TextField
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            select
                                                                            label="Room"
                                                                            value={valuesUpd.room_id !== undefined ? valuesUpd.room_id : 0}
                                                                            onChange={handleChange1}
                                                                            name="room_id"
                                                                        >
                                                                            {Array.isArray(roomList) && roomList.map((room) => {
                                                                                return (<MenuItem value={room.room_id} key={`abcd${room.room_id}`}>{room.room_id} - {room.name}</MenuItem>)
                                                                            })}
                                                                        </TextField>
                                                                    </Grid>
                                                                </Grid>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button
                                                        onClick={async () => {
                                                            await dispatch(changeRoomAsmAsync(valuesUpd));
                                                            setCheckClose;
                                                            dispatch(getAssignmentManListAsync());
                                                            dispatch(getACCforAddAsm7ListAsync());
                                                        }}
                                                        color="primary" variant="outlined">
                                                        <i className="bi bi-gear"> Cập nhật</i>
                                                    </Button>
                                                    <Button onClick={setCheckClose1} color="primary" variant="outlined" style={{ marginLeft: "10px" }}>
                                                        Đóng
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </Box>
        </PageContainer>
    )
}
export default UpdateAndDelAcc
