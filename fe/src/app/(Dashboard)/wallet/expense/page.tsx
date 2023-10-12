'use client';
import { Typography, Grid, Box, Table, TableHead, TableRow, TableCell, Chip, TableBody, Toolbar, styled, IconButton, Stack, Button, TextField, AppBar } from '@mui/material';

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import PageContainer from '@/template/(DashboardLayout)/components/container/PageContainer';
import { getExpenseList, getExpenseListAsync, resetExpenseList, searchExpenseAsync } from '@/redux/slices/expenseSlice';
import Link from 'next/link';
import { IconSettings } from '@tabler/icons-react';
import { Icon360 } from '@tabler/icons-react';


const UpdateAndDelAcc = () => {
    console.log("hello1")
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
    const assignments: any[] = useAppSelector(getExpenseList)
    // const dispatch = useAppDispatch();
    const typeName = useAppSelector((state) => state.expenseSlice.typeName);
    const [date, setDate] = useState("");
    const formatCurrency = (amount: number): string => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    const dispatch = useAppDispatch();
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we need to add 1
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    const handleReset = () => {
        dispatch(resetExpenseList());
        setDate("");
    };
    const handleSearch = () => {
        if (date) {
            dispatch(searchExpenseAsync(date));
        }
    };
    useEffect(() => {
        dispatch(getExpenseListAsync());
    }, []);
    console.log("hello", assignments)
    return (

        <PageContainer title="Dashboard" description="this is Dashboard">
            <AppBarStyled position="sticky" color="default">
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={4}>
                            <h3>Expense</h3>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <Stack spacing={1} direction="row" alignItems="center">
                                <TextField
                                    sx={{ ml: 45 }}
                                    type="date"
                                    variant="outlined"
                                    size="small"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Button sx={{ ml: 1 }} onClick={handleSearch} variant="contained" color="primary">
                                    Tìm kiếm
                                </Button>
                                <Button sx={{ ml: 1 }} onClick={handleReset} variant="outlined">
                                    <Icon360 />
                                </Button>
                                <Link href="/wallet/expense/add">
                                    <Button
                                        variant="contained"
                                        color="primary">
                                        Add +
                                    </Button>
                                </Link>
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
                                    Type
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Amount
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Date
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
                        {assignments.map((expense) => {
                            stt += 1;
                            return (
                                <TableRow key={expense.id}>
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
                                            {expense.ftname}
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
                                                    {formatCurrency(expense.amount)}
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
                                            {expense.date}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {expense.rname}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            <Link href={`/wallet/expense/${expense.id}`}>
                                                <Chip
                                                    sx={{
                                                        px: "4px",
                                                        backgroundColor: "secondary.main",
                                                        color: "#fff",
                                                    }}
                                                    size="small"
                                                    label={<IconSettings style={{ color: "#fff" }} />}
                                                ></Chip>

                                            </Link>
                                        </Typography>
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
