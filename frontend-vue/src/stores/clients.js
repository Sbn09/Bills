import { clients } from '@/seeds/clients.js'
import { defineStore } from 'pinia'

export const useClientStore = defineStore('client', {
  state: () => ({
    clients,
    client: null
  }),
  getters: {},
  actions: {
    async getAllClients() {
      const response = await this.$http.get('/clients')
      this.clients = response.data
    },

    async setClient(idclient) {
      if (idclient == '-1') {
        this.client = {
          idclient: -1,
          firstName: '',
          lastName: '',
          companyName: '',
          date: '',
          address1: '',
          address2: '',
          postalCode: '',
          city: '',
          country: '',
          jobTitle: '',
          phone: '',
          email: ''

        }
      } else {
        const response = await this.$http.get('/clients/' + idclient)
        this.client = response.data
      }
    },

    async onUpdateClient(client) {
      const response = await this.$http.patch('/clients/' + client.idclient, client)
      console.log(response.data)
      this.client = null
      await this.getAllClients()
    },

    async onCreateClient(client) {
      const response = await this.$http.post('/clients', client)
      console.log(response.data)
      this.client = null
      await this.getAllClients()
    },

    async onDeleteClient(client) {
      const response = await this.$http.delete('/clients/' + client.idclient)
      console.log(response.data)
      await this.getAllClients()
    }
  }
})