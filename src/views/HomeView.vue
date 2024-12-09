<template>
  <div class="home">
    <DialerApp />
  </div>
</template>

<script>
// @ is an alias to /src
import DialerApp from "@/components/DialerApp.vue";
export default {
  name: "HomeView",
  components: {
    DialerApp,
  },
};
</script>
<style scoped>
/* .home {
  background-color: black;
} */
</style>
