
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import PageContainer from '@/template/(DashboardLayout)/components/container/PageContainer';
import { Grid, Box, AppBar, Toolbar, IconButton, styled } from '@mui/material';
import DashboardCard from '@/template/(DashboardLayout)/components/shared/DashboardCard';
import { IconFriends, IconSchool } from '@tabler/icons-react';


const RegisterPage = () => {
  
  // checkRole(1);
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
                        Account
                    </IconButton>
                </ToolbarStyled>
            </AppBarStyled>
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                        <Link href={"/account/office"}>
                            <DashboardCard title="">
                                <Grid display="flex" justifyContent="center" alignItems="center">
                                    <IconSchool size="50%" />
                                </Grid>
                            </DashboardCard>
                            {/* <h2>Employee</h2> */}
                        </Link>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Link href={"/account/student"}>
                            <DashboardCard title="">
                                <Grid display="flex" justifyContent="center" alignItems="center">
                                <IconFriends size="50%" />
                            </Grid>
                            </DashboardCard>
                        </Link>
                    </Grid>
                </Grid>
            </Box>

        </PageContainer>
  );
};

export default RegisterPage;
