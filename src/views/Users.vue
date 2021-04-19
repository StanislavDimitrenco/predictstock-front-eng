<template>

  <v-card class="mt-5">
    <v-card-title>Все пользователи</v-card-title>
    <v-data-table :loading="loading"
                  :headers="headers"
                  :items="usersData"
                  :items-per-page="5"
                  class="elevation-1"
                  :footer-props="{
                  'items-per-page-options': [15, 30, 50, 100]}"
                  multi-sort
    >
      <template v-slot:item.IsPaid="{ item }">
        <v-chip :color="item.IsPaid ? 'success' : 'error'">
          {{ item.IsPaid  ? "да" : "нет" }}
        </v-chip>
      </template>
      <template v-slot:item.CreatedAt="{ item }">
        {{reformatData(item.CreatedAt)}}
      </template>
      <template v-slot:item.PaidUntil="{ item }">
        {{reformatData(item.PaidUntil)}}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

export default {
  name: 'Users',
  data() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'ID',
        },
        {text: 'Telegram ID', value: 'TelegramId'},
        {text: 'Логин', value: 'Username'},
        {text: 'Имя', value: 'Name', width: 200},
        {text: 'Фамилия', value: 'Lastname'},
        {text: 'Дата регистрации', value: 'CreatedAt'},
        {text: 'Оплаченный', value: 'IsPaid'},
        {text: 'Оплачен до', value: 'PaidUntil'},

      ],
      usersData: [],
      loading: false
    }
  },
  methods: {
    reformatData: function (data) {
      return new Date(data).toLocaleString();
    }
  },
  mounted: function () {
    this.loading = true
    this.$axios.get('/users')
        .then(({data}) => this.usersData = data)
        .catch(function (error) {
          console.log(error)
        })
        .finally(() => this.loading = false)
  }
}
</script>

