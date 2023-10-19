<template>
  <div id="main-section">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
</script>

<style>
#main-section {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
}

.container {
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 560px) {
  #main-section .container {
    padding: 0 20px;
  }
}
</style>
