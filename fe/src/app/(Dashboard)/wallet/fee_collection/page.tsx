'use client';
import { Typography, Grid, Box, Table, TableHead, TableRow, TableCell, Chip, TableBody, Toolbar, styled, IconButton, Stack, Button, TextField, AppBar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import PageContainer from '@/template/(DashboardLayout)/components/container/PageContainer';
import { createFeeCollectionListAsync, deleteFeeCollectionAsync, getFeeCollectionListAsync, getfeeCollectionList, setOffFeeCollectionAsync, setOnFeeCollectionAsync } from '@/redux/slices/feeCollectionSlice';
import { getStudentForAddFeeCollectionAsync, getaccList } from '@/redux/slices/otherSlice';
import { getTypeForAddFeeCollectionAsync, getfeeTypeList } from '@/redux/slices/feeTypeSlice';
import { IconTrash } from '@tabler/icons-react';


const UpdateAndDelAcc = () => {
    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: 'none',
        background: theme.palette.background.paper,
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        [theme.breakpoints.up('lg')]: {
            minHeight: '70px',
        },
    }));
    const assignments: any[] = useAppSelector(getfeeCollectionList)
    const accountList: any[] = useAppSelector(getaccList)
    const feeTypeList: any[] = useAppSelector(getfeeTypeList)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getFeeCollectionListAsync());
        console.log("load");
        dispatch(getTypeForAddFeeCollectionAsync());
    }, []);
    const [checkedId, setCheckedId] = useState(false);
    const [checkedId1, setCheckedId1] = useState(null);

    const setCheckClose = () => {
        setCheckedId(false);
    };
    const setCheckClose1 = () => {
        setCheckedId1(null);
        // Các hành động khác nếu cần
    };

    //xóa
    const onDel = async (id: any) => {
        await dispatch(deleteFeeCollectionAsync(id));
        dispatch(getFeeCollectionListAsync());
    }
    // const handleCreate = async (id: any, amount: any, note: any) => {
    //     await dispatch(getStudentForAddFeeCollectionAsync({fee_type_id:id, amount:amount, note:note})).then(() => {
    //         console.log(accountList)
    //         dispatch(createFeeCollectionListAsync(accountList));
    //     });

    // }   
    const handleCreate = (id: any, amount: any, note: any) => {
        dispatch(getStudentForAddFeeCollectionAsync({ fee_type_id: id, amount: amount, note: note }))
            .then((data) => {
                console.log("data", data.payload);  // kiểm tra xem data có đúng không
                dispatch(createFeeCollectionListAsync(data.payload));  // Sử dụng data trả về thay vì accountList
                dispatch(getFeeCollectionListAsync());
            });
        dispatch(getFeeCollectionListAsync());
    };

    return (

        <PageContainer title="Dashboard" description="this is Dashboard">
            <AppBarStyled position="sticky" color="default">
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={8}>
                            <h3>Fee collection
                            </h3>
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
                                    maxWidth="md"
                                    fullWidth={true}
                                >
                                    <DialogTitle id="form-dialog-title" >
                                        Thêm phân công : <b className="text-danger " style={{ fontSize: "30px" }}></b>
                                    </DialogTitle>
                                    <DialogContent>
                                        <Grid container spacing={3}>
                                            {Array.isArray(feeTypeList) && feeTypeList.map((acc) => {

                                                return (<Grid item xs={12} md={3}
                                                    key={`abcde${acc.id}`}>
                                                    <Button variant="contained" fullWidth
                                                        onClick={() => {
                                                            handleCreate(acc.id, acc.amount, acc.note)
                                                        }}
                                                        color="primary" key={`abcd${acc.id}`}>{acc.name} </Button>
                                                </Grid>)
                                            })}
                                        </Grid>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={setCheckClose} color="primary" variant="outlined" style={{ marginLeft: "10px" }}>
                                            Hủy
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
                                    StudentId
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Type
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Academic
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Amount
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
                            return (
                                <TableRow key={asm.id}>
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
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {asm.sname}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {asm.ftname}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {asm.academic}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {asm.amount}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>

                                        {asm.date != null ? <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: "secondary.main",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label="Đã thu"
                                            onClick={async () => {
                                                await dispatch(setOnFeeCollectionAsync(asm.id)).then(() => {
                                                    dispatch(getFeeCollectionListAsync());})
                                            }}
                                        ></Chip> : <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: "error.main",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label="Chưa thu"
                                            onClick={async () => {
                                                await dispatch(setOffFeeCollectionAsync(asm.id)).then(() => {
                                                dispatch(getFeeCollectionListAsync());})
                                            }}
                                        ></Chip>}
                                    </TableCell>
                                    <TableCell>

                                        <Chip
                                            sx={{
                                                px: "4px",
                                                backgroundColor: "error.main",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label={<IconTrash style={{ color: "#fff" }} />}
                                            onClick={async () => {
                                                setCheckedId1(asm.id)
                                            }}
                                        ></Chip>

                                        <Dialog open={checkedId1 == asm.id} onClose={() => setCheckedId1(null)}>
                                            <DialogTitle>Xác nhận xóa</DialogTitle>
                                            <DialogContent>
                                                Bạn có chắc muốn xóa?
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => setCheckedId1(null)} color="secondary" >
                                                    Hủy
                                                </Button>
                                                <Button onClick={() => onDel(asm.id)} color="primary">
                                                    Đồng ý
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
