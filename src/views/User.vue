<template>

  <div class="">
    <div v-if="loading">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
    <div v-else-if="user">


      <v-card class="mt-5">
        <v-card-title>Telegram id: {{ user.TelegramId }}</v-card-title>
        <v-data-table :loading="loading"
                      :headers="headers"
                      :items="userHistory"
                      :items-per-page="20"
                      class="elevation-1"
                      multi-sort
        >
          <template v-slot:item.CreatedAt="{ item }">
            {{ reformatData(item.CreatedAt) }}
          </template>
        </v-data-table>
      </v-card>
    </div>
    <div v-else>
      <v-alert
          border="top"
          color="red lighten-2"
          dark
      >
        Такого пользователя не существует
      </v-alert>

    </div>
  </div>
</template>

<script>

export default {
  name: 'User',
  data() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'ID',
        },
        {text: 'Введенное сообщение', value: 'Message'},
        {text: 'Дата ввода сообщения', value: 'CreatedAt'}
      ],
      user_id: null,
      user: null,
      userHistory: [],
      loading: true
    }

  },
  methods: {
    loadHistory: function () {
      this.$axios.get(`/users/${this.user_id}/history`)
          .then(({data}) => this.userHistory = data)
          .catch(function (error) {
            console.log(error)
          })
          .finally(() => this.loading = false)
    },
    reformatData: function (data) {
      return new Date(data).toLocaleString();
    }
  },
  mounted: function () {

    this.user_id = this.$route.params.id
    this.$axios.get(`/users/${this.user_id}`)
        .then(({data}) => {
          if (data.ID) {
            this.user = data
            this.loadHistory()
          }

        })
        .catch(function (error) {
          console.log(error)
        })
        .finally()

  }
}
</script>

