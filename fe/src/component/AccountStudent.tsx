
'use client';
import { Typography, Grid, Box, Table, TableHead, TableRow, TableCell, Chip, TableBody, Toolbar, styled, IconButton, Stack, Button, TextField, AppBar } from '@mui/material';

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import PageContainer from '@/template/(DashboardLayout)/components/container/PageContainer';
import { getAllStudentListAsync, getStudentList, getStudentListAsync } from '@/redux/slices/accountStudentSlice';
import Link from 'next/link';
import { IconEdit } from '@tabler/icons-react';
import { IconCaretRight } from '@tabler/icons-react';

// import dotenv from 'dotenv';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AccountStudent = () => {
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
    const assignments: any[] = useAppSelector(getStudentList)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllStudentListAsync());
    }, []);
    console.log("hello", API_URL)
    return (

        <PageContainer title="Dashboard" description="this is Dashboard">
            <AppBarStyled position="sticky" color="default">
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={8}>
                            <h3>Student</h3>
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
                                    color="primary">
                                    Add +
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </AppBarStyled>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
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
                                            Identity
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Birthday
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Gender
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Ethnic
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
                                                    {asm.birthday}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {asm.gender == 1 ? "Nữ" : "Nam"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                        whiteSpace: "nowrap"
                                                    }}
                                                >
                                                    {asm.ethnic}
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
                                                    label="Hiện còn học"
                                                ></Chip> : <Chip
                                                    sx={{
                                                        px: "4px",
                                                        backgroundColor: "error.main",
                                                        color: "#fff",
                                                    }}
                                                    size="small"
                                                    label="Không còn học"
                                                ></Chip>}
                                            </TableCell>
                                            <TableCell>
                                                <Link href="#">
                                                    <IconCaretRight />
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    )
};


export default AccountStudent;