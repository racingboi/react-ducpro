import { Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

export default function ChartBasics() {
  const chartSetting = {
    width: 500,
    height: 300,
  };

  const dataset = [
    { london: 2, paris: 5, month: 'T2', },
    { london: 5, paris: 2, month: 'T3', },
    { london: 4, paris: 3, month: 'T4', },
    { london: 4, paris: 5, month: 'T5', },
    { london: 5, paris: 6, month: 'T6', },
    { london: 1, paris: 3, month: 'T7', },
    { london: 9, paris: 5, month: 'CN', },
  ];

  const valueFormatterSales = (value) => `${value} đã bán`;
  const valueFormatterUsers = (value) => `${value} đã đăng ký`;

  return (
    <Grid container spacing={2}
      sx={{
            marginTop: 4,
      }}
    >
      <Grid item xs={12} md={6}>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[
            { dataKey: 'london', label: 'Số lượng bán', valueFormatter: valueFormatterSales },
          ]}
          {...chartSetting}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[
            { dataKey: 'paris', label: 'Số người đăng ký', valueFormatter: valueFormatterUsers },
          ]}
          {...chartSetting}
        />
      </Grid>
    </Grid>
  );
}
