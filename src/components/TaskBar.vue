<template>
  <div>
    <div class="bottom-navbar d-flex mt-5">
      <ul class="d-flex justify-content-between">
        <li>
          <a href="#"><i class="bi bi-star"></i><br />Favourites</a>
        </li>
        <li :class="{ active: $route.name === 'recents' }">
          <a href="#" @click.prevent="goToRecents"
            ><i class="bi bi-clock"></i><br />Recents</a
          >
        </li>
        <li>
          <a href="#"><i class="bi bi-person"></i><br />Contacts</a>
        </li>
        <li :class="{ active: $route.name === 'home' }">
          <a href="#" @click="gotodialpad"
            ><i class="bi bi-grid"></i><br />Keypad</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goToRecents() {
      this.$router.push({ name: "recents" });
    },
    gotodialpad() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.bottom-navbar li {
  list-style: none;
  text-align: center;
  margin-right: 4.5rem;
  font-size: 10px;
}

.bottom-navbar a {
  color: white;
  text-decoration: none;
}
.bottom-navbar {
  justify-content: center;
  align-items: center;

  padding: 5px;
}
.bottom-navbar i {
  font-size: 20px;
  margin-bottom: 5px;
}
.bottom-navbar ul {
  /* margin-top: 3rem; */
  margin-left: 2rem;
}
.bottom-navbar li.active a {
  color: #007bff;
}
@media (max-width: 1024px) {
  .bottom-navbar li {
    margin-right: 3.5rem;
  }
  .bottom-navbar ul {
    margin-left: 20px;
  }
}

@media (max-width: 650px) {
  .bottom-navbar ul {
    margin-left: 2rem;
  }
}

@media (max-width: 338px) {
  .bottom-navbar ul {
    margin-left: 0rem;
  }
  .bottom-navbar li {
    margin-right: 2rem;
  }
}
</style>
