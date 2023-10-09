
"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import 'bootstrap-icons/font/bootstrap-icons.css';
import { toast } from 'react-toastify';
import { filterAccByrole, getaccList, getaccListAsync, getaccListByRoleAsync, resetAccList, searchAccrAsync } from "@/redux/slices/accountSlice";
import Link from "next/link";
import { getPositonListAsync, getpositionList, resetPositionList } from "@/redux/slices/positionSlice";

import {
    Typography, Box,
    Grid,
    Tooltip,
    Fab,
    CardContent,
    Stack,
    Rating,
    styled,
    TooltipProps,
    tooltipClasses,
    FormControl,
    Select,
    MenuItem,
    AppBar,
    Toolbar,
    IconButton,
    Autocomplete,
    TextField,
} from '@mui/material';
import PageContainer from "@/template/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/template/(DashboardLayout)/components/shared/DashboardCard";
import BlankCard from "@/template/(DashboardLayout)/components/shared/BlankCard";
import { IconSettings } from "@tabler/icons-react";
import { IconSearch } from "@tabler/icons-react";
const AccountAll = () => {

    const accounts: any[] = useAppSelector(getaccList)
    const dispatch = useAppDispatch()

    const roles: any[] = useAppSelector(getpositionList)
    useEffect(() => {
        dispatch(getaccListAsync())
        dispatch(getPositonListAsync())
    }, [])



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
    const [param, setParam] = useState("")
    const handleChange = (e: any) => {
        let value = e.target.value;

        // let newValue = e.target.value;
        // console.log(param, newValue)
        // // Sử dụng newValue thay vì param
        // if (e.target.value.length >= 0) {
        setParam(value);
        console.log(param)
        // dispatch(searchAccrAsync(e.target.value));
        // }
        // else {
        //   dispatch(resetAccList());
        // }
    }
    const handleSearch = (e: any, newValue: any) => {

        e.preventDefault();
        console.log(param)
        setParam(newValue);
        if (e.target.value.length > 0) {
            dispatch(searchAccrAsync(e.target.value));
        }else {
            dispatch(resetAccList());
        }
        setParam("");
    }
    const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            maxWidth: 1200,
        },
    });

    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <AppBarStyled position="sticky" color="default">
                <ToolbarStyled>
                    <IconButton
                        size="large"
                        aria-label="show 11 new notifications"
                        color="inherit"
                        aria-controls="msgs-menu"
                        aria-haspopup="true"
                    >
                        Accounts
                    </IconButton>
                    <Box flexGrow={1} />
                    <Stack spacing={1} direction="row" alignItems="center">
                        <Stack spacing={2} sx={{ width: 300 }}>
                            {/* <TextField label="Search" name="param" value={param} onChange={handleSearch} /> */}

                            {/* <form className='bg-white p-5' onSubmit={handleSearch} method='POST'> */}
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                options={accounts.map((option) => option.name)}
                                onChange={handleSearch}
                                renderInput={(param) => <TextField {...param} label="Search" />}
                            />
                            {/* <Autocomplete
                                    id="free-solo-demo"
                                    freeSolo
                                    options={accounts.map((option) => option.name)}
                                    onChange={handleSearch}
                                    renderInput={(params) => <TextField {...params} label="freeSolo" />}
                                /> */}
                            {/* <TextField
                                label="Search"
                                variant="outlined"
                                value={param}
                                onChange={handleChange}
                                name="param"
                            /> */}
                            {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        options={accounts.map((option) => option.name)}
                                        renderInput={(params) => <TextField {...params} label="freeSolo" />}
                                    />
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        value={param} // Thêm dòng này để trường input hiển thị giá trị của state
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end" type="submit"
                                                >
                                                    <IconSearch />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl> */}
                            {/* </form> */}
                        </Stack>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                value={roles}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="all" onClick={() => dispatch(resetAccList())}>
                                    <em>None</em>
                                </MenuItem>{
                                    roles.map((role) => (
                                        <MenuItem value={role.name} key={role.name+"menu"}>
                                            <Grid container>

                                                <Grid item xs={12} lg={10} onClick={() => dispatch(filterAccByrole(role.id))}>{role.name}</Grid>

                                                <Grid item xs={12} lg={2}>
                                                    <Link href={`office/add/${role.id}`} className="btn text-center link-offset-2 link-underline link-underline-opacity-0">+</Link>
                                                </Grid>
                                            </Grid>
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Stack>
                </ToolbarStyled>
            </AppBarStyled>

            <Grid container spacing={1}>
                {accounts.map((account, index) => (
                    <Grid item xs={12} md={3} lg={4} key={index}>
                        <BlankCard>
                            <Grid item xs={12} lg={10}>
                                <CustomWidthTooltip title=
                                    {<div className="row">
                                        <div className="col-6">
                                            <p><b>Name:</b> {account.name}</p>
                                            <p><b>Birthday:</b> {account.birthday}</p>
                                            <p><b>Phone:</b> {account.phone}</p>
                                            <p><b>Ethnic:</b> {account.ethnic}</p>
                                            <p><b>Address:</b> {account.address}</p>
                                        </div>
                                        <div className="col-6">

                                            <p><b>Identity:</b> {account.identity_number}</p>
                                            <p><b>Email:</b> {account.email}</p>
                                            <p><b>Position:</b> {(() => {
                                                const role = roles.find(role => role.id === account.position_id);
                                                return role ? role.name : 'Không xác định';
                                            })()}</p>

                                            <p><b>Gender:</b> {account.gender == 0 ? 'Nam' : 'Nữ'}</p>
                                        </div>
                                    </div>}>
                                    <CardContent sx={{ p: 3, pt: 2 }}>
                                        <Typography variant="h6">{account.name}</Typography>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            mt={1}
                                        >
                                            <Stack direction="row" alignItems="center">
                                                <Typography variant="h6">{account.email}</Typography>

                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </CustomWidthTooltip>
                            </Grid>
                            <Grid item xs={12} lg={2}>
                                <Link href={`office/${account.user_id}`}>
                                    <Fab
                                        size="small"
                                        color="primary"
                                        sx={{ bottom: "25%", right: "15px", position: "absolute" }}
                                    >
                                        <IconSettings size="16" />
                                    </Fab>
                                </Link>
                            </Grid>
                        </BlankCard>
                    </Grid>
                ))}
            </Grid>
        </PageContainer>


    );
};


export default AccountAll;