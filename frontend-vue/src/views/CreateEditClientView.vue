<template>
    <div v-if="client">
      <!-- titre et bouton ajouter -->
      <div class="row border-bottom pb-3 mb-3">
        <div class="col">
          <h1 v-if="isNewClient" class="h3">
            <i class="fa-solid fa-angle-down me-2" />Ajouter un client
          </h1>
          <h1 v-else class="h3"><i class="fa-solid fa-angle-down me-2" />Editer un client</h1>
        </div>
        <div class="col">
          <div class="d-flex justify-content-end gap-2">
            <div class="text-end">
              <router-link to="/clients" class="btn btn-outline-secondary">
                <i class="fa-solid fa-angle-left"/>
                Retour
              </router-link>
            </div>
            <div v-if="!isNewClient" class="text-end">
              <button @click="deleteClient(client)" class="btn btn-outline-danger">
                <i class="fa-solid fa-trash me-2" />
                Supprimer le client
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="firstName"
              id="firstName"
              v-model="client.firstName"
              class="form-control"
              placeholder="Prénom"
              :class="{ 'is-invalid': !client.firstName }"
            />
            <label for="firstname" class="form-label">Prénom</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              class="form-control"
              placeholder="Fonction"
              v-model="client.jobTitle"
              :class="{ 'is-invalid': !client.jobTitle }"
            />
            <label for="jobTitle" class="form-label">Fonction</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="lastName"
              id="lastName"
              class="form-control"
              placeholder="Nom"
              v-model="client.lastName"
              :class="{ 'is-invalid': !client.lastName }"
            />
            <label for="lastName" class="form-label">Nom</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="tel"
              name="phone"
              id="phone"
              class="form-control"
              placeholder="Téléphone"
              v-model="client.phone"
              :class="{ 'is-invalid': !client.phone }"
            />
            <label for="phone" class="form-label">Téléphone</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
              type="date"
              name="date"
              id="date"
              class="form-control"
              placeholder="Date"
              format="yyyy-MM-dd"
              v-model="client.date"
              :class="{ 'is-invalid': !client.date }"
            />
            <label for="date" class="form-label">Date d'ajout</label>
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-floating mb-3">
            <input
              type="email"
              pattern=".+@example\.com"
              name="email"
              id="email"
              class="form-control"
              placeholder="E-mail"
              v-model="client.email"
              :class="{ 'is-invalid': !client.email }"
            />
            <label for="email" class="form-label">E-mail</label>
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="companyName"
              id="companyName"
              class="form-control"
              placeholder="Adresse"
              v-model="client.companyName"
              :class="{ 'is-invalid': !client.companyName }"
            />
            <label for="companyName" class="form-label">Entreprise</label>
          </div>
        </div>
      </div>

      <h2> Coordonnées </h2>
      <div class="row">
        <div class="col-md-8">
          <div class="form-floating mb-3">
            <input
              type="text"
              name="address1"
              id="address1"
              class="form-control"
              placeholder="Adresse"
              v-model="client.address1"
              :class="{ 'is-invalid': !client.address1 }"
            />
            <label for="address1" class="form-label">Adresse 1</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              name="address2"
              id="address2"
              class="form-control"
              placeholder="-"
              v-model="client.address2"
            />
            <label for="address1" class="form-label">Adresse 2</label>
          </div>
        </div>
        <div class="col-md-8">
          <div class="d-flex justify-content-between">
            <div class="width-20 | form-floating mb-3">
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                class="form-control"
                placeholder="Code postal"
                v-model="client.postalCode"
                :class="{ 'is-invalid': !client.postalCode }"
              />
              <label for="postalCode" class="form-label">Code postal</label>
            </div>
            <div class="width-20 | form-floating mb-3">
              <input
                type="text"
                name="country"
                id="country"
                class="form-control"
                placeholder="Pays"
                v-model="client.country"
                :class="{ 'is-invalid': !client.country }"
              />
              <label for="country" class="form-label">Pays</label>
            </div>
          </div>
          <div class="col-md-4">
            <div class="width-20 | form-floating mb-3">
              <input
                type="text"
                name="city"
                id="city"
                class="form-control"
                placeholder="Ville"
                v-model="client.city"
                :class="{ 'is-invalid': !client.city }"
              />
              <label for="city" class="form-label">Ville</label>
            </div>
          </div>
        </div>
      </div>
  
      <p class="text-end">
        <button
          @click="submitForm()"
          :disabled="formInvalid"
          class="btn btn-outline-primary btn-lg px-5"
        >
          <i class="fa-solid fa-save me-2" />Enregistrer
        </button>
      </p>
      <!-- 1ère manière de récupérer des paramètres de la route : -->
      <!-- <pre>{{ client }}</pre> -->
    </div>
  </template>
  
  <script>
  import { clients } from '@/seeds/clients.js'
  import { useClientStore } from '@/stores/clients.js'
  import { mapActions, mapWritableState } from 'pinia'
  
  export default {
    props: {
      id: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {
        clients
      }
    },
    computed: {
      ...mapWritableState(useClientStore, ['client']),
  
      isNewClient() {
        return this.id == '-1'
      },
  
      formInvalid() {
        return (
          !this.client ||
          !this.client.firstName ||
          !this.client.lastName ||
          !this.client.date ||
          !this.client.phone ||
          !this.client.email ||
          !this.client.companyName ||
          !this.client.address1 ||
          !this.client.city ||
          !this.client.country ||
          !this.client.jobTitle ||
          !this.client.phone ||
          !this.client.postalCode
        )
      },
    },
    mounted() {
      this.setClient(this.id)
    },
    methods: {
      ...mapActions(useClientStore, ['onDeleteClient', 'onUpdateClient', 'onCreateClient', 'setClient']),
  
      submitForm() {
        if (this.isNewClient) {
          this.onCreateClient(this.client)
        } else {
          this.onUpdateClient(this.client)
        }
          this.$router.push({ path: '/clients' })
      },
  
      deleteClient(client) {
        this.onDeleteClient(client)
        this.$router.push({ path: '/clients' })
      }
    },
    watch: {
    }
  }
  </script>
  
  <style scoped>
  .table .th-actions {
    width: 10%;
  }
  .table .th-prestation {
    width: 44%;
  }
  .table .th-quantite {
    width: 10%;
  }
  .table .th-montant-ht,
  .table .th-montant-total {
    width: 18%;
  }

  .width-20 {
    width: 20rem;
  }
  </style>