<template>
  <div class="home">
    <Main />
  </div>
</template>

<script>
// @ is an alias to /src
import Main from "@/components/Main.vue";

export default {
  name: "HomeView",
  components: {
    Main,
  },
};
</script>
<style scoped>
.home {
  background-color: black;
}
</style>
