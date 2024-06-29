<template>
    <tr>
      <td class="align-middle">
        <i class="fa-regular fa-user | me-2"></i>
        {{ clientName }}
      </td>
      <td class="align-middle">{{ client.companyName }}</td>
      <td class="align-middle text-end">{{ formatDate(client.date) }}</td>
      <td class="align-middle d-flex gap-2 justify-content-end align-items-center">
        <button v-if="!isHomePage" @click="onDeleteClient()" class="btn btn-outline-danger">
          <i class="fa-solid fa-trash me-2" />Supprimer
        </button>
        <button @click="onEditClient()" class="btn btn-outline-info">
          <i class="fa-solid fa-pen me-2" />Editer
        </button>
      </td>
    </tr>
  </template>
  
  <script>
  export default {
    props: {
      client: {
        type: Object,
        required: true
      }
    },
    emits: ['delete', 'edit'],
    computed: {
      clientName() {
        return this.client.firstName + ' ' + this.client.lastName
      },
      isHomePage() {
        return this.$route.path === '/'
      },
    },
    methods: {
      onDeleteClient() {
        this.$emit('delete', this.client)
      },
      onEditClient() {
        this.$emit('edit', this.client)
      },
      formatDate(date) {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
      }
    
    }
  }
  </script>
  
  <style scoped></style>