'use client';
import { Typography, Grid, Box, Table, TableHead, TableRow, TableCell, Chip, TableBody, Toolbar, styled, IconButton, Stack, Button, TextField, AppBar, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from '@mui/material';

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import PageContainer from '@/template/(DashboardLayout)/components/container/PageContainer';
import { getAssignmentManList, getAssignmentManListAsync } from '@/redux/slices/assignmentManSlice';
import { changeRoomAsmStudentAsync, createAsmStudentAsync, getAssignmentStuList, getAssignmentStuListAsync, setOffAsmStudentAsync } from '@/redux/slices/assignmentStuSlice';
import { IconX } from '@tabler/icons-react';
import { IconStatusChange } from '@tabler/icons-react';
import { getRoomList, getRoomListAsync } from '@/redux/slices/roomReducer';
import { getACCforAddAsmStudentAsync, getaccList } from '@/redux/slices/otherSlice';


const UpdateAndDelAcc = () => {
    let stt = 0;
    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: 'none',
        background: theme.palette.background.paper,
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        [theme.breakpoints.up('lg')]: {
            minHeight: '70px',
        },
    }));
    const assignments: any[] = useAppSelector(getAssignmentStuList)
    const accNoneList: any[] = useAppSelector(getaccList)
    const roomList: any[] = useAppSelector(getRoomList)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAssignmentStuListAsync());
        dispatch(getRoomListAsync());
        dispatch(getACCforAddAsmStudentAsync());
    }, []);
    const [checkedId, setCheckedId] = useState(false);
    const [checkedId1, setCheckedId1] = useState(null);
    const [checkedId2, setCheckedId2] = useState(null);


    const [values, setValues] = useState({
        student_id: "",
        room_id: ""
    });
    const [valuesUpd, setValuesUpd] = useState({
        id: "",
        student_id: "",
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
        dispatch(createAsmStudentAsync(values));
        dispatch(getRoomListAsync());
        dispatch(getACCforAddAsmStudentAsync());
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
                                {/* <TextField
                                    id="birthday"
                                    type="date"
                                    required
                                    value={selectedDate}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                /> */}

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
                                    <form className='bg-white p-5' onSubmit={handleSubmit} method='POST'>
                                        <DialogTitle id="form-dialog-title" >
                                            Thêm phân lớp : <b className="text-danger " style={{ fontSize: "30px" }}></b>
                                        </DialogTitle>
                                        <DialogContent>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={6}>
                                                    <Box>
                                                        <Grid container spacing={2}>

                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    select
                                                                    label="Student"
                                                                    value={values.student_id !== undefined ? values.student_id : 0}
                                                                    onChange={handleChange}
                                                                    name="student_id"
                                                                >
                                                                    {Array.isArray(accNoneList) && accNoneList.map((acc) => {

                                                                        return (<MenuItem value={acc.student_id} key={`abcd${acc.student_id}`}>{acc.student_id} - {acc.name}</MenuItem>)
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
                                        </DialogContent>
                                        <DialogActions>
                                            <Button type="submit" color="primary" variant="outlined">
                                                <i className="bi bi-gear"> Cập nhật</i>
                                            </Button>
                                            <Button onClick={setCheckClose} color="primary" variant="outlined" style={{ marginLeft: "10px" }}>
                                                Đóng
                                            </Button>
                                        </DialogActions>
                                    </form>
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
                                    STT
                                </Typography>
                            </TableCell>
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
                        {assignments.map((asm) => {
                            stt += 1;
                            return (
                                <TableRow key={asm.id}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {stt}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {asm.student_id}
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
                                            label="Hiện tại"
                                        ></Chip> : <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: "error.main",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label="Hết hiệu lực"
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
                                                valuesUpd.student_id = asm.student_id
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
                                                    await dispatch(setOffAsmStudentAsync({ id: asm.id }));
                                                    setCheckClose2()
                                                    dispatch(getAssignmentManListAsync());
                                                    dispatch(getRoomListAsync());
                                                    dispatch(getACCforAddAsmStudentAsync());
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
                                                Chuyển phòng : {asm.student_id} - {asm.uname}
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
                                                        await dispatch(changeRoomAsmStudentAsync(valuesUpd));
                                                        setCheckClose;
                                                        dispatch(getAssignmentManListAsync());
                                                        dispatch(getRoomListAsync());
                                                        dispatch(getACCforAddAsmStudentAsync());
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
                            )
                        })}
                    </TableBody>
                </Table>
            </Box>
        </PageContainer>
    )
}
export default UpdateAndDelAcc
