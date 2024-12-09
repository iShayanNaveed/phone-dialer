<template>
  <nav class="navbar">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="navbar-left d-flex align-items-center">
        <span class="time me-2">8:06</span>
        <img src="@/assets/arrow.svg" alt="" />
      </div>
      <div class="navbar-right d-flex align-items-center">
        <p class="dots">...</p>
        <i class="bi bi-wifi"></i>
        <img src="@/assets/battery.svg" alt="" />
      </div>
    </div>
  </nav>
</template>
<script>
export default {};
</script>
<style scoped>
.navbar-left .time {
  font-size: 1.2rem;
  color: white;
}

.dots {
  margin: 0;
  color: #575151;
}
</style>
