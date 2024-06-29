<template>
    <div>
      <!-- titre et bouton ajouter -->
      <div class="row pb-3 mb-3">
        <div class="col">
          <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Liste des clients</h1>
        </div>
        <div class="col text-end">
          <router-link to="/edit-client/-1" class="btn btn-outline-primary">
            <i class="fa-solid fa-plus-circle me-2" />
            Ajouter un client
          </router-link>
        </div>
      </div>
  
      <TableListClient>
        <ClientsTableRow
          v-for="client in clients"
          :key="client.id"
          :client="client"
          @edit="onEditClient($event)"
          @delete="onDeleteClient($event)"
        />
      </TableListClient>
      <!-- <pre>
        {{ clients }}
      </pre> -->
    </div>
  </template>
  
  <script>
  import ClientsTableRow from '@/components/TableList/ClientsTableRow.vue'
  import TableListClient from '@/components/TableList/TableListClient.vue'
  import { useClientStore } from '@/stores/clients.js'
  import { mapActions, mapState } from 'pinia'
  
  export default {
    components: {
      TableListClient,
      ClientsTableRow
    },
    
    methods: {
      ...mapActions(useClientStore, ['onDeleteClient', 'getAllClients']),
      onEditClient(client) {
      console.log('edit client with id: ', client.idclient)
      this.$router.push({
        name: 'edit-client',
        params: {
          id: client.idclient
        }
      })},
    },
    computed: {
      ...mapState(useClientStore, ['clients'])
    },

  async mounted() {
    await this.getAllClients()
  },
  }
  </script>
  
  <style scoped></style>