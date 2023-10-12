'use client';
import { Typography, Grid,  Box, Table, TableHead, TableRow, TableCell, Chip, TableBody, Toolbar, styled, IconButton, Stack, Button, TextField, AppBar } from '@mui/material';

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import PageContainer from '@/template/(DashboardLayout)/components/container/PageContainer';
import { getAssignmentManList, getAssignmentManListAsync } from '@/redux/slices/assignmentManSlice';
import { getaccList, getaccListAsync } from '@/redux/slices/accountSlice';
import { getFeeTypeListAsync, getfeeTypeList } from '@/redux/slices/feeTypeSlice';


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
    const assignments: any[] = useAppSelector(getfeeTypeList)
    const formatCurrency = (amount: number): string => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getFeeTypeListAsync());
        dispatch(getaccListAsync());
    }, []);
    console.log("hello",assignments)
    return (

        <PageContainer title="Dashboard" description="this is Dashboard">
            <AppBarStyled position="sticky" color="default">
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={8}>
                            <h3>Fee type
                            </h3>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Stack spacing={1} direction="row" alignItems="center">
                                <TextField/>
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
                                    color="primary">
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
                                    Amount
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Type
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {assignments.map((asm) => {
                        return(
                            <TableRow key={asm.id}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                    {asm.id}
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
                                                {asm.name}
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
                                        {asm.amount!=null? formatCurrency(asm.amount):""}
                                    </Typography>
                                </TableCell>
                                <TableCell>

                                    {asm.status == 0 ? <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: "secondary.main",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label="Thu"
                                    ></Chip> : <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: "error.main",
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label="Chi"
                                    ></Chip>}
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
