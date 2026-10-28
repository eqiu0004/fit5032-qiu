<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div class="container-fluid">
        <span class="navbar-brand">Library</span>

        <div class="navbar-nav">
          <router-link to="/" class="nav-link">
            Home
          </router-link>

          <router-link to="/about" class="nav-link">
            About
          </router-link>

          <router-link to="/FireLogin" class="nav-link">
            Firebase Login
          </router-link>

          <router-link to="/FireRegister" class="nav-link">
            Firebase Register
          </router-link>

          <router-link to="/logout" class="nav-link">
            Log Out
          </router-link>

          <router-link to="/addbook" class="nav-link">
            Add Book
          </router-link>

          <router-link to="/getbookcount" class="nav-link">
            Get Book Count
          </router-link>

          <router-link to="/WeatherCheck" class="nav-link">
            Get Weather
          </router-link>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<style scoped>
.router-link-active {
  font-weight: bold;
}
</style>