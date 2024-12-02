<template>
  <div
    class="call-screen d-flex flex-column justify-content-center align-items-center text-light"
    style="height: 100vh"
  >
    <nav class="navbar">
      <div class="navbar-right">
        <i class="bi bi-info-circle"></i>
      </div>
    </nav>
    
    <div class="text-center calling">
      <h6>calling mobile...</h6>
      <h1>{{ dialedNumber }}</h1>
    </div>
    <div class="row text-center w-md-50 mb-3">
      <div class="col p-1">
        <button class="btn btn-dark rounded-circle p-2">
          <i class="fa-solid fa-volume-high"></i>
          <br />
          <small>Speaker</small>
        </button>
      </div>
      <div class="col p-1">
        <button class="btn btn-dark rounded-circle p-2">
          <i class="bi bi-camera-video"></i>
          <br />
          <small>FaceTime</small>
        </button>
      </div>
      <div class="col p-1">
        <button class="btn btn-dark rounded-circle p-2">
          <i class="bi bi-mic-mute"></i>
          <br />
          <small>Mute</small>
        </button>
      </div>
    </div>
  
    <div class="row text-center w-md-50 mb-2">
      <div class="col p-1">
        <button class="btn btn-dark rounded-circle p-2">
          <i class="bi bi-plus-circle"></i>
          <br />
          <small>Add</small>
        </button>
      </div>
      <div class="col p-1">
        <button class="btn btn-danger rounded-circle p-3" @click="endCall">
          <i class="bi bi-telephone-x"></i>
          <br />
          <small>End</small>
        </button>
      </div>
      <div class="col p-1">
        <button class="btn btn-dark rounded-circle p-2">
          <i class="bi bi-grid"></i>
          <br />
          <small>Keypad</small>
        </button>
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
  },
  methods: {
    endCall() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.call-screen h6 {
  font-size: 0.9rem;
  color: #5a5a5a;
  margin-bottom: 0.5rem;
}
.call-screen h1 {
  font-size: 2rem;
}
.call-screen {
  background-image: linear-gradient(to bottom, #9b9b9b, #898787, #8f8f8f, #727171, #3e3c3c);
}
button {
  width: 65px;
  height: 65px;
}
.navbar-right {
  margin-left: 15rem;
}
button i {
  font-size: 20px;
}
button small {
  display: block;
  font-size: 10px;
  color: lightgray;
}
.row .col {
  padding-left: 0.25rem !important; 
  padding-right: 0.25rem !important;
}
.row {
  margin-bottom: 0.5rem !important;
}
.card {
  width: 25%;
  height: 30rem;
  background: black;
  border-radius: 35px;
  border: 2px solid rgb(40, 40, 40);
  padding: 17px;
  position: relative;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.486);
  display: flex;
  margin: 2rem auto;
}

.card-int {
  background-size: 200% 200%;
  background-position: 0% 0%;
  /* height: 100%; */
  border-radius: 25px;
  transition: all 0.6s ease-out;
  overflow: hidden;
}

.card:hover .card-int {
  background-position: 100% 100%;
}

.top {
  position: absolute;
  top: 0px;
  right: 50%;
  transform: translate(50%, 0%);
  width: 35%;
  height: 18px;
  background-color: black;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.speaker {
  position: absolute;
  top: 2px;
  right: 50%;
  transform: translate(50%, 0%);
  width: 40%;
  height: 2px;
  border-radius: 2px;
  background-color: rgb(20, 20, 20);
}
.calling {
  margin-bottom: 20rem;
}
.camera {
  position: absolute;
  top: 6px;
  right: 84%;
  transform: translate(50%, 0%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.048);
}

.int {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  background-color: rgba(0, 0, 255, 0.212);
}

.btn1,
.btn2,
.btn3,
.btn4 {
  position: absolute;
  width: 2px;
}

.btn1,
.btn2,
.btn3 {
  height: 45px;
  top: 30%;
  right: -4px;
  background-image: linear-gradient(
    to right,
    #111111,
    #222222,
    #333333,
    #464646,
    #595959
  );
}

.btn2,
.btn3 {
  transform: scale(-1);
  left: -4px;
}

.btn2,
.btn3 {
  transform: scale(-1);
  height: 30px;
}

.btn2 {
  top: 26%;
}

.btn3 {
  top: 36%;
}

.hello {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  line-height: 35px;
  height: 100%;
  transition: 0.5s ease-in-out;
}

.hidden {
  display: block;
  opacity: 0;
  transition: all 0.3s ease-in;
}

.card:hover .hidden {
  opacity: 1;
}

.card:hover .hello {
  transform: translateY(-20px);
}
</style>
