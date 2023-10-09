'use client'
import PageContainer from '@/template/(DashboardLayout)/components/container/PageContainer';
import Blog from '@/template/(DashboardLayout)/components/dashboard/Blog';
import MonthlyEarnings from '@/template/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import ProductPerformance from '@/template/(DashboardLayout)/components/dashboard/ProductPerformance';
import RecentTransactions from '@/template/(DashboardLayout)/components/dashboard/RecentTransactions';
import SalesOverview from '@/template/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/template/(DashboardLayout)/components/dashboard/YearlyBreakup';
import { Grid, Box } from '@mui/material';
// components

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          {/* <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
