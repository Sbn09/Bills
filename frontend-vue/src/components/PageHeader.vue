<template>
  <header class="border px-5 py-2">
    <nav class="navbar navbar-expand-lg bg-white">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" activeClass="" exactActiveClass="" to="/">
          <i class="fa-solid fa-box-archive"></i>
          Factures
        </RouterLink>

        <ul class="navbar-nav">
          <li class="nav-item | d-flex align-items-center | text-primary">
            <RouterLink class="nav-link" aria-current="page" to="/">
              <i class="fa-solid fa-house | me-1"></i>
              Accueil
            </RouterLink>
          </li>
          <li class="nav-item | d-flex align-items-center | text-primary">
            <RouterLink class="nav-link" aria-current="page" to="/bills">
              <i class="fa-solid fa-box-archive"></i>
              Factures
            </RouterLink>
          </li>
          <li class="nav-item | d-flex align-items-center | text-primary">
            <RouterLink class="nav-link" aria-current="page" to="/clients">
              <i class="fa-solid fa-users"></i>
              Clients
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/about">A propos</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
// imort du composant de lien depuis vue-router
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  }
}
</script>

<style scoped></style>