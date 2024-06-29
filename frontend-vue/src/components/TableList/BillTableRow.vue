<template>
  <tr>
    <td v-if="isHomePage" class="align-middle"> 
      <i class="fa-regular fa-file | me-2"></i>
      Facture {{ bill.billnum }} 
    </td>
    <td v-if="!isHomePage" class="align-middle">{{ formatDate(bill.date) }}</td>
    <td v-if="!isHomePage" class="align-middle">{{ bill.description }}</td>
    <td v-if="showStatus && !isHomePage" class="align-middle text-center">
      <i
        :class="
          bill.status
            ? 'fa-solid fa-circle-check text-success'
            : 'fa-regular fa-hourglass-half text-warning'"
      ></i>
    </td>
    <td class="align-middle">{{ clientName }}</td>
    <td class="align-middle text-end">{{ bill.totalHT.toFixed(2) }} HT</td>
    <td class="align-middle text-end">{{ bill.totalTTC.toFixed(2) }} TTC</td>
    <td class="align-middle d-flex gap-2 justify-content-end align-items-center">
      <button v-if="!isHomePage" @click="onDelete()" class="btn btn-outline-danger">
        <i class="fa-solid fa-trash me-2" />Supprimer
      </button>
      <button @click="onEdit()" class="btn btn-outline-info">
        <i class="fa-solid fa-pen me-2" />Editer
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    bill: {
      type: Object,
      required: true
    },
    showStatus: {
      type: Boolean,
      default: true
    },
    showPayment: {
      type: Boolean,
      default: true
    }
  },
  emits: ['delete', 'edit'],
  computed: {
    clientName() {
      return this.bill.client.firstName + ' ' + this.bill.client.lastName
    },
    isHomePage() {
      return this.$route.path === '/'
    },
  },
  methods: {
    onDelete() {
      this.$emit('delete', this.bill)
    },
    onEdit() {
      this.$emit('edit', this.bill)
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    }
    
  }
}
</script>

<style scoped></style>