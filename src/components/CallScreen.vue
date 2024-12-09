<template>
  <div
    class="call-screen d-flex flex-column justify-content-center align-items-center text-light"
  >
    <nav class="navbar">
      <div class="navbar-right">
        <i class="bi bi-info-circle"></i>
      </div>
    </nav>

    <div class="text-center calling">
      <h6 class="mb-2">calling mobile...</h6>
      <h1>{{ dialedNumber }}</h1>
    </div>

    <div class="row text-center grid-state">
      <div
        class="col p-1 grid-mantainace d-flex flex-column justify-content-center align-items-center"
      >
        <button class="btn rounded-circle p-2 btn-div">
          <i class="fa-solid fa-volume-high"></i>
          <br />
        </button>
        <small>Speaker</small>
      </div>
      <div
        class="col p-1 grid-mantainace d-flex flex-column justify-content-center align-items-center"
      >
        <button class="btn rounded-circle p-2 btn-div">
          <i class="bi bi-camera-video"></i>
          <br />
        </button>
        <small>FaceTime</small>
      </div>
      <div
        class="col p-1 grid-mantainace d-flex flex-column justify-content-center align-items-center"
      >
        <button class="btn rounded-circle p-2 btn-div">
          <i class="bi bi-mic-mute"></i>
          <br />
        </button>
        <small>Mute</small>
      </div>
    </div>

    <div class="row text-center mb-5 grid-state">
      <div
        class="col p-1 grid-mantainace d-flex flex-column justify-content-center align-items-center"
      >
        <button class="btn rounded-circle p-2 btn-div">
          <i class="bi bi-plus-circle"></i>
          <br />
        </button>
        <small>Add</small>
      </div>
      <div
        class="col p-1 grid-mantainace d-flex flex-column justify-content-center align-items-center"
      >
        <button
          class="btn rounded-circle p-3 btn-danger end-call"
          @click="endCall"
        >
          <i class="bi bi-telephone-x"></i>
          <br />
        </button>
        <small>End</small>
      </div>
      <div
        class="col p-1 grid-mantainace d-flex flex-column justify-content-center align-items-center"
      >
        <button class="btn rounded-circle p-2 btn-div">
          <i class="bi bi-grid"></i>
          <br />
        </button>
        <small>Keypad</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialedNumber: "",
    };
  },
  created() {
    this.dialedNumber = this.$route.query.number || "Unknown";
    this.startCallTimeout();
  },
  methods: {
    startCallTimeout() {
      this.callTimeout = setTimeout(() => {
        this.endCall();
      }, 10000);
    },
    endCall() {
      clearTimeout(this.callTimeout);

      this.$router.push("/recents");
    },
  },
  beforeDestroy() {
    clearTimeout(this.callTimeout);
  },
};
</script>

<style scoped>
.call-screen h6 {
  font-size: 0.9rem;
  color: #5a5a5a;
}
.call-screen h1 {
  font-size: 2rem;
}
.call-screen {
  min-height: 100vh;

  height: auto;
  background-image: linear-gradient(
    to bottom,
    #9b9b9b,
    #898787,
    #8f8f8f,
    #727171,
    #3e3c3c
  );
  overflow-y: auto;
}

.navbar-right {
  margin-left: 15rem;
}

.calling {
  margin-bottom: 18rem;
}
.btn-div {
  color: white;
  background-color: grey;
  width: 65px;
  height: 65px;
}
.end-call {
  width: 65px;
  height: 65px;
}

.grid-state {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  margin-bottom: 0.5rem;
}
@media (max-width: 768px) {
  .grid-state {
    width: 40%;
  }
  .calling {
    margin-bottom: 15rem;
  }
}
@media (max-width: 550px) {
  .grid-state {
    width: 60%;
  }
}
@media (max-width: 600px) {
  .calling {
    margin-bottom: 15rem;
  }
}
@media (max-width: 400px) {
  .grid-state {
    width: 75%;
  }
}
</style>
