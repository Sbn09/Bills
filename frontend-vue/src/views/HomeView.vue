<template>
  <main class="mt-3">
    <div class="row pb-3 mb-3">
      <div class="col">
        <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Dashboard</h1>
      </div>
      <div class="col | text-end">
        <router-link to="/edit-bill/-1" class="btn btn-outline-primary | me-4">
          <i class="fa-solid fa-plus-circle me-2" />
          Ajouter une facture
        </router-link>
        <router-link to="/edit-client/-1" class="btn btn-outline-primary">
            <i class="fa-solid fa-plus-circle me-2" />
            Ajouter un client
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="shadow p-3 mb-5 bg-body rounded">
          <p class="ps-3"> <span class="h3">{{ totalFactures }}</span> factures en 2023</p>
          <Doughnut />
          <p class="fw-bold text-end"> {{ totalSomme }} €</p>
          <p> <i class="fa-regular fa-circle" style="color: #FAF78E;"></i> Factures payées TTC : <span class="fw-bold"> {{ BillsPaidPourcentage }} % </span></p>
          <p> <i class="fa-regular fa-circle" style="color: #FA8E96;"></i> Factures non payées : <span class="fw-bold"> {{  totalBillsUnpaid }} % </span></p>
          <p> <i class="fa-regular fa-circle" style="color: #8DD3F9;"></i> Dû à plus d'un mois : <span class="fw-bold"> {{ totalBillsDueOverMonthPourcentage }} % </span></p>
        </div>
      </div>
      <div class="col-md-8">
        <div class="scroll-liste | shadow p-3 mb-5 bg-body rounded">
          <h2> Factures en cours</h2>
          <TableList>
            <BillTableRow
              v-for="bill in falseBill"
              :key="bill.id"
              :bill="bill"
              @edit="onEditBill($event)"
              @delete="onDeleteBill($event)"
            />
          </TableList>
        </div>
        <div class="scroll-liste | shadow p-3 mb-5 bg-body rounded">
          <h2> Clients</h2>
          <TableListClient>
            <ClientsTableRow
              
              v-for="client in latestClient"
              :key="client.id"
              :client="client"
              @edit="onEditClient($event)"
            />
          </TableListClient>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import ClientsTableRow from '@/components/TableList/ClientsTableRow.vue'
  import TableListClient from '@/components/TableList/TableListClient.vue'
  import BillTableRow from '@/components/TableList/BillTableRow.vue'
  import TableList from '@/components/TableList/TableList.vue'
  import Doughnut from '@/components/Doughnut.vue'
  import { useBillStore } from '@/stores/bill.js'
  import { useClientStore } from '@/stores/clients.js'
  import { mapActions, mapState } from 'pinia'

export default {
  data() {
    return {
    }
  },
  components: {
      TableListClient,
      ClientsTableRow,
      TableList,
      BillTableRow,
      Doughnut
  },
  computed: {
    ...mapState(useClientStore, ['clients']),
    ...mapState(useBillStore, ['bills']),
    lastYear() {
      return new Date().getFullYear() - 1;
    },
    
    filteredBills() {
      return this.bills.filter(bill => new Date(bill.date).getFullYear() === this.lastYear);
    },
    
    totalFactures() {
      return this.filteredBills.length;
    },

    latestClient() {
      const currentDate = new Date();
      return this.clients
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .filter(client => new Date(client.date) <= currentDate)
        .slice(0, 10);
    },
    
    falseBill() {
      return this.bills.filter(bill => bill.status === false);
    },

    totalSomme() {
      return this.filteredBills.reduce((somme, bill) => somme + bill.totalTTC, 0);
    },

    totalBillsPaid() {
      return this.filteredBills.filter(bill => bill.status === true).length;
    },

    totalBillsUnpaid() {
      return this.totalFactures - this.totalBillsPaid;
    },
    totalBillsDueOverMonth() {
      return this.billsDueOverMonth.filter(bill => new Date(bill.date).getFullYear() === this.lastYear).length;
    },

    billsDueOverMonth() {
      const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000;
      const now = new Date();
      return this.bills.filter(bill => {
        const billDate = new Date(bill.date);
        return (now - billDate) > oneMonthInMillis;
      });
    },
    BillsPaidPourcentage() {
      return (this.totalBillsPaid * 100 / this.totalFactures).toFixed(1);
    },
    BillsUnpaidPourcentage() {
      return (this.totalBillsUnpaid * 100 / this.totalFactures).toFixed(1);
    },
    totalBillsDueOverMonthPourcentage() {
      return (this.totalBillsDueOverMonth * 100 / this.totalFactures).toFixed(1);
    },
  },
  async mounted() {
    await this.getAllClients()
    await this.getAllBills()
  },
  methods: {
    ...mapActions(useClientStore, ['getAllClients']),
    onEditClient(client) {
      console.log('edit client with id: ', client.idclient)
      this.$router.push({
        name: 'edit-client',
        params: {
          id: client.idclient
        }
    })},
    ...mapActions(useBillStore, ['onDeleteBill', 'getAllBills']),
    onEditBill(bill) {
      console.log('edit bill with id: ', bill.id)
      this.$router.push({
        name: 'edit-bill',
        params: {
          id: bill.id
        }
    })},
  },
}
</script>

<style scoped>
.scroll-liste {
  height: 500px;
  overflow-y: scroll;
}
</style>