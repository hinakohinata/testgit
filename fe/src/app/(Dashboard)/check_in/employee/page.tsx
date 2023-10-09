'use client';
import { Typography, Grid, CardContent, Box, Table, TableHead, TableRow, TableCell, Chip, TableBody, AppBar, Toolbar, styled, Stack, Button, TextField, Dialog, DialogTitle, DialogActions, DialogContent, Divider } from '@mui/material';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import PageContainer from '@/template/(DashboardLayout)/components/container/PageContainer';
import { CreateCheckinEmListAsync, getCheckinBydateAsync, getCheckinEmList, setOffCheckinAsync, setOnCheckinAsync } from '@/redux/slices/checkinEmSlice';
import { getAssignmentManList, getIn4ForcheckinAsync } from '@/redux/slices/assignmentManSlice';
import { IconCheck, IconCircleCheck, IconCircleX, IconX } from '@tabler/icons-react';
import Link from 'next/link';


const label = { inputProps: { 'aria-label': 'Switch demo' } };
const UpdateAndDelAcc = () => {

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
        date = `0${now.getDate()}`;
    }
    const today = `${year}-${month}-${date}`;
    const dateName = now.getDay();

    const [selectedDate, setSelectedDate] = useState(today);
    const [dateParse, setDateParse] = useState(today);



    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: 'none',
        background: theme.palette.background.paper,
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        [theme.breakpoints.up('lg')]: {
            minHeight: '70px',
        },
    }));
    const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
        width: '100%',
        color: theme.palette.text.secondary,
    }));
    const accountList: any[] = useAppSelector(getAssignmentManList)
    const accounts: any[] = useAppSelector(getCheckinEmList)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getIn4ForcheckinAsync())
        dispatch(getCheckinBydateAsync(selectedDate));
    }, []);
    console.log("accountList", accountList)
    // handle change author
    const handleChange = (e: any) => {
        let value = e.target.value;
        setSelectedDate(value);
        setDateParse(value)
        console.log(selectedDate)
        dispatch(getCheckinBydateAsync(e.target.value));
    }
    const [checkedId, setCheckedId] = useState(null);
    const [checkedId1, setCheckedId1] = useState(null);

    const handleCreate = () => {
        dispatch(CreateCheckinEmListAsync(accountList))
        console.log(accountList)
        dispatch(getCheckinBydateAsync(selectedDate));
    }
    const checkOff = (id: any) => {
        setCheckedId(id);
        // Các hành động khác nếu cần
    };

    const checkOn = (id: any) => {
        setCheckedId1(id);
        // Các hành động khác nếu cần
    };
    const setCheckClose = () => {
        setCheckedId(null);
        // Các hành động khác nếu cần
    };
    const setCheckClose1 = () => {
        setCheckedId1(null);
        // Các hành động khác nếu cần
    };

    let stt = 0;

    const [reason, setReason] = useState("");
    return (

        <PageContainer title="Dashboard" description="this is Dashboard">
            <AppBarStyled position="sticky" color="default">
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={8}>
                            <h3> Check in</h3>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Stack spacing={1} direction="row" alignItems="center">

                                <TextField
                                    id="birthday"
                                    type="date"
                                    required
                                    value={selectedDate}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCreate}>
                                    Add +
                                </Button>
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
                                    Stt
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
                                    Check in
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Reason
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
                        {Array.isArray(accounts) && accounts.map((product) => {
                            stt += 1;
                            return (<>
                                <TableRow key={product.name}>
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
                                            {product.id}
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
                                                    {product.user_id}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>

                                        {product.status == 1 ? <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: "secondary.main",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label="Có mặt"
                                        ></Chip> : <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: "error.main",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label="Vắng"
                                        ></Chip>}
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {product.reason}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>

                                        {product.status == 1 ? <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: "error.main",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            onClick={() => checkOff(product.id)}
                                            icon={<IconX style={{ color: "#fff" }} />}
                                        /> : <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: "success.main",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            onClick={() => checkOn(product.id)}
                                            icon={<IconCheck style={{ color: "#fff" }} />}
                                        />}
                                    </TableCell>
                                </TableRow>
                                <Dialog
                                    open={checkedId1 === product.id}
                                    onClose={() => setCheckedId1(null)}>
                                    <DialogTitle>Xác nhận xóa</DialogTitle>
                                    <DialogContent>
                                        Bạn có chắc muốn cập nhật trạng thái của {product.name}?
                                    </DialogContent>
                                    <DialogActions>

                                        <Button onClick={setCheckClose1} color="primary" variant="outlined" style={{ marginLeft: "10px" }}>
                                            Hủy
                                        </Button>
                                        <Button onClick={async () => {
                                            await dispatch(setOnCheckinAsync(product.id));
                                            console.log(selectedDate, "check")
                                            stt = 0;
                                            setCheckClose1()
                                            dispatch(getCheckinBydateAsync(selectedDate));
                                        }} color="primary">
                                            Đồng ý
                                        </Button>
                                    </DialogActions>
                                </Dialog>


                                <Dialog
                                    open={checkedId === product.id}
                                    onClose={() => setCheckedId(null)}
                                    aria-labelledby="form-dialog-title"
                                    maxWidth="md" // Đặt chiều rộng tối đa
                                    fullWidth={true} // Chiếm toàn bộ chiều rộng
                                >
                                    <DialogTitle id="form-dialog-title" >
                                        Lý do nghỉ : <b className="text-danger " style={{ fontSize: "30px" }}></b>
                                    </DialogTitle>
                                    <Divider />
                                    <DialogContent>
                                        <TextField
                                            label="Reason"
                                            variant="outlined"
                                            name="reason"
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            fullWidth
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={async () => {
                                            await dispatch(
                                            setOffCheckinAsync({ reason: reason, id: product.id }));
                                            console.log(selectedDate, "check")
                                            stt = 0;
                                            setCheckClose;
                                            dispatch(getCheckinBydateAsync(selectedDate));
                                        }} color="primary" variant="outlined">
                                            <i className="bi bi-gear"> Cập nhật</i>
                                        </Button>
                                        <Button onClick={setCheckClose} color="primary" variant="outlined" style={{ marginLeft: "10px" }}>
                                            Đóng
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                            )
                        })}
                    </TableBody>
                </Table>
            </Box>
        </PageContainer>
    )
}
export default UpdateAndDelAcc
