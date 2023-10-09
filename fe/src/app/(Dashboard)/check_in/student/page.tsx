'use client';
import { Typography, Grid, CardContent, Box, Table, TableHead, TableRow, TableCell, Chip, TableBody, AppBar, Toolbar, styled, Stack, Button, TextField } from '@mui/material';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector} from '@/redux/hook';
import PageContainer from '@/template/(DashboardLayout)/components/container/PageContainer';
import { getCheckinBydateAsync, getCheckinEmList } from '@/redux/slices/checkinEmSlice';
import { createAttendanceBydateAsync, getAttendanceBydateAsync, getAttendanceList, getattendanceListAsync } from '@/redux/slices/checkinStudentSlice';



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
    // const accountList: any[] = useAppSelector(getAssignmentStuList)
    const accounts: any[] = useAppSelector(getAttendanceList)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAttendanceBydateAsync(selectedDate));
    }, []);
    // handle change author
    const handleChange = (e: any) => {
        let value = e.target.value;
        setSelectedDate(value);
        setDateParse(value)
        console.log(selectedDate)
        dispatch(getAttendanceBydateAsync(e.target.value));
    }
    const [checked, setChecked] = useState(false);
    // const handleCreate = () => {
    //     dispatch(createAttendanceBydateAsync(accountList))
    //     console.log(accountList)
    //     dispatch(getAttendanceBydateAsync(selectedDate));
    // }
    const handleChange1 = () => {
        setChecked(true);
    }
    const router = useRouter()
    //xóa
    const onDel = () => {
    }
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
                                {/* <Button 
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCreate}>
                                    Add +
                                </Button> */}
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
                                    Class
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.student_id}
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
                                                {product.sname}
                                            </Typography>
                                        </Box>
                                    </Box>
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
                                                {product.rname}
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </PageContainer>
    )
}
export default UpdateAndDelAcc
