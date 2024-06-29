<template>
  <table class="table">
    <thead>
      <tr>
        <!-- pour personnaliser éventuellement l'entête du tableau, on pourra utiliser le slot thead avec <template #thead></template> -->
        <slot name="thead">
          <th v-if="isHomePage"> N°</th>
          <th v-if="!isHomePage">Date</th>
          <th v-if="!isHomePage">Description</th>
          <th v-if="!isHomePage">Etat</th>
          <th>Client</th>
          <th class="text-end">Prix HT</th>
          <th class="text-end">Prix TTC</th>
          <th class="text-end">Actions</th>
        </slot>
      </tr>
    </thead>
    <tbody>
      <!-- affichage des lignes de tableau -->
      <slot />
    </tbody>
  </table>
</template>

<script>
export default {
  computed: {
    isHomePage() {
      return this.$route.path === '/'
    },
  }
}
</script>

<style scoped></style>