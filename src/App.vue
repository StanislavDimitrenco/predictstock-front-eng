<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <router-link :to="{name: 'Home'}">
        <div class="d-flex align-center mr-5">
          <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="../src/assets/logo.svg"
              transition="scale-transition"
              width="180"
          />

        </div>
      </router-link>
      <v-btn text :to="{name:'Users'}">Пользователи</v-btn>
      <v-spacer>

      </v-spacer>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

};
</script>
