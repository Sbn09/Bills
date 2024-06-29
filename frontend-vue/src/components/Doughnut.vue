<template>
  <div>
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from 'chart.js'
import { useBillStore } from '@/stores/bill.js'
import { mapState } from 'pinia'

ChartJS.register(Tooltip, ArcElement)

export default {
  components: {
    Doughnut
  },
  computed: {
    ...mapState(useBillStore, ['bills']),
    chartData() {
      const lastYear = new Date().getFullYear() - 1;
      const filteredBills = this.bills.filter(bill => new Date(bill.date).getFullYear() === lastYear);
      const TotalBills = filteredBills.length;
      const PaidBills = filteredBills.filter(bill => bill.status === true).length
      const UnpaidBills = TotalBills - PaidBills;
      const billsDueOverMonth = this.billsDueOverMonth.filter(bill => new Date(bill.date).getFullYear() === lastYear).length;
      return {
        labels: ['Factures payées', 'Factures non payées', 'Dû à plus d\'un mois TTC'],
        datasets: [
          {
            backgroundColor: ['#FAF78E', '#FA8E96', '#8DD3F9'],
            data: [PaidBills, UnpaidBills, billsDueOverMonth]
          }
        ]
      };
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              textAlign: 'left',
              padding: 20
            }
          }
        }
      };
    },
    billsDueOverMonth() {
      const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;
      const now = new Date();

      return this.bills.filter(bill => {
        const billDate = new Date(bill.date);
        return (now - billDate) > oneMonthInMillis;
      });
    }
  }
}
</script>


<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  height: 200px;
  width: 200px;
}
</style>