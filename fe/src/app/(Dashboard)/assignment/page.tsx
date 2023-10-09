'use client';
import { Typography, Grid, CardContent, Box, Table, TableHead, TableRow, TableCell, Chip, TableBody, Switch, AppBar, Toolbar, IconButton, styled } from '@mui/material';

// import { useAppDispatch, useAppSelector } from '@/redux-store/hook';
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { disableAccAsync, getAcc, getAccById, getaccList, getaccListAsync, updateInfAccAsync } from '@/redux/slices/accountSlice';
import Header from '@/component/Header';
import { createUsername } from '../authen/createUsername';
import PageContainer from '@/template/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/template/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/template/(DashboardLayout)/components/shared/BlankCard';
import { IconChalkboard, IconFriends, IconSchool, IconSettings2 } from '@tabler/icons-react';
import { IconBrandOffice } from '@tabler/icons-react';


const label = { inputProps: { 'aria-label': 'Switch demo' } };
const UpdateAndDelAcc = () => {
    const accId = "U002";
    const selectedAuthor = useAppSelector(getAcc);
    const acc: any[] = useAppSelector(getaccList)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAccById(accId));
    }, [accId, dispatch]);
    useEffect(() => {
        // Cập nhật author sau khi getAuthorById thực thi
        dispatch(getaccListAsync())
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

    }
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
    return (
        <PageContainer title="Check in" description="this is Check in">
            <AppBarStyled position="sticky" color="default">
                <ToolbarStyled>
                    <IconButton
                        size="large"
                        aria-label="show 11 new notifications"
                        color="inherit"
                        aria-controls="msgs-menu"
                        aria-haspopup="true"
                    >
                        Assignment
                    </IconButton>
                </ToolbarStyled>
            </AppBarStyled>
            <Box>
                <Grid container>
                    <Grid item xs={12} lg={6}>
                        <Link href={"/assignment/manager"}>
                            <DashboardCard title="">
                                <Grid display="flex" justifyContent="center" alignItems="center">
                                    <IconSettings2 size="50%" />
                                </Grid>
                            </DashboardCard>
                            {/* <h2>Employee</h2> */}
                        </Link>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Link href={"/assignment/teacher"}>
                            <DashboardCard title="">
                                <Grid display="flex" justifyContent="center" alignItems="center">
                                    <IconChalkboard size="50%" />
                                </Grid>
                            </DashboardCard>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Grid container display="flex" justifyContent="center" alignItems="center">
                    <Grid item xs={12} lg={6}>
                        <Link href={"/assignment/student"}>
                            <DashboardCard title="">
                                <Grid display="flex" justifyContent="center" alignItems="center">
                                    <IconFriends size="50%" />
                                </Grid>
                            </DashboardCard>
                            {/* <h2>Employee</h2> */}
                        </Link>
                    </Grid>
                </Grid>
            </Box>

        </PageContainer>
    )
}
export default UpdateAndDelAcc
