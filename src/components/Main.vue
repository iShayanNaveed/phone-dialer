<template>
  <div class="main">
    <div
      class="container text-center text-light main"
      style="
        max-width: 400px;
        background-color: black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: auto;
        max-height: 100vh;
        box-sizing: border-box;
        padding: 10px;
      "
    >
      <nav class="navbar">
        <div
          class="container d-flex justify-content-between align-items-center"
        >
          <div class="navbar-left d-flex align-items-center">
            <span class="time me-2">8:06</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              transform="rotate(50)"
            >
              <path
                d="M12 2L15 18L12 15L9 18L12 2Z"
                stroke="white"
                stroke-width="1.5"
                fill="white"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="navbar-right d-flex align-items-center">
            <p class="dots">...</p>
            <i class="bi bi-wifi me-2"></i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 22 15"
            >
              <rect
                x="3.5"
                y="2"
                width="15"
                height="9"
                rx="2"
                ry="2"
                fill="#808080"
              />
              <rect
                x="3.5"
                y="2"
                width="3"
                height="9"
                rx="2"
                ry="2"
                fill="red"
              />
              <rect
                x="19"
                y="5"
                width="1"
                height="3"
                rx="1"
                ry="1"
                fill="#808080"
              />
              <text
                x="11"
                y="7"
                text-anchor="middle"
                fill="white"
                font-size="8"
                font-family="Arial"
                dy=".3em"
              >
                18
              </text>
            </svg>
          </div>
        </div>
      </nav>
      <div>
        <div class="display-area d-flex flex-column align-items-center">
          <input type="text" v-model="dialedNumber" class="number" />
          <small class="text-primary" role="button" @click="addNumber"
            >Add Number</small
          >
        </div>
        <div class="row">
          <div
            v-for="(number, index) in numbers"
            :key="index"
            class="col-4 mb-2"
          >
            <button
              class="btn btn-dark rounded-circle text-light"
              @click="appendNumber(number)"
              :style="{
                height: '75px',
                lineHeight: '1.6',
                fontSize: '18px',
                width: '75px',
              }"
            >
              <span>{{ number.label }}</span>
              <small v-if="number.subLabel" class="d-block">{{
                number.subLabel
              }}</small>
            </button>
          </div>
        </div>

        <div class="row mt-2 justify-content-center align-items-center">
          <div class="col-auto text-center call">
            <button
              class="button btn btn-success"
              :disabled="!dialedNumber"
              @click="makeCall"
              style="height: 75px; width: 75px"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                viewBox="0 0 32 32"
                height="32"
                fill="none"
                class="svg-icon"
              >
                <path
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke="#fff"
                  fill-rule="evenodd"
                  d="m24.8868 19.1288c-1.0274-.1308-2.036-.3815-3.0052-.7467-.7878-.29-1.6724-.1034-2.276.48-.797.8075-2.0493.9936-2.9664.3258-1.4484-1.055-2.7233-2.3295-3.7783-3.7776-.6681-.9168-.4819-2.1691.3255-2.9659.5728-.6019.7584-1.4748.4802-2.2577-.3987-.98875-.6792-2.02109-.8358-3.07557-.2043-1.03534-1.1138-1.7807-2.1694-1.77778h-3.18289c-.60654-.00074-1.18614.25037-1.60035.69334-.40152.44503-.59539 1.03943-.53345 1.63555.344 3.31056 1.47164 6.49166 3.28961 9.27986 1.64878 2.5904 3.84608 4.7872 6.43688 6.4356 2.7927 1.797 5.9636 2.9227 9.2644 3.289h.1778c.5409.0036 1.0626-.2 1.4581-.569.444-.406.6957-.9806.6935-1.5822v-3.1821c.0429-1.0763-.7171-2.0185-1.7782-2.2046z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div class="col-auto text-center">
            <button
              class="btn delete-button"
              :disabled="!dialedNumber"
              @click="deleteLastDigit"
            >
              <i class="bi bi-backspace"></i>
            </button>
          </div>
        </div>
        <div class="bottom-navbar d-flex">
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
              <a href="#"><i class="bi bi-grid"></i><br />Keypad</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      numbers: [
        { label: "1", subLabel: "" },
        { label: "2", subLabel: "ABC" },
        { label: "3", subLabel: "DEF" },
        { label: "4", subLabel: "GHI" },
        { label: "5", subLabel: "JKL" },
        { label: "6", subLabel: "MNO" },
        { label: "7", subLabel: "PQRS" },
        { label: "8", subLabel: "TUV" },
        { label: "9", subLabel: "WXYZ" },
        { label: "*", subLabel: "" },
        { label: "0", subLabel: "+" },
        { label: "#", subLabel: "" },
      ],
      dialedNumber: "",
    };
  },
  methods: {
    appendNumber(number) {
      this.dialedNumber += number.label;
    },
    ...mapActions(["addCallLog"]),
    makeCall() {
      if (this.dialedNumber) {
        const now = new Date();
        const callData = {
          id: uuidv4(),
          name: this.dialedNumber,
          time: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          type: "all",
        };

        this.addCallLog(callData);
        this.$router.push({
          name: "callscreen",
          query: { number: this.dialedNumber },
        });

        this.dialedNumber = "";
      }
    },
    deleteLastDigit() {
      this.dialedNumber = this.dialedNumber.slice(0, -1);
    },
    addNumber() {
      alert("Add Number functionality clicked!");
    },
    goToRecents() {
      this.$router.push({ name: "recents" });
    },
  },
};
</script>
<style scoped>
body {
  background-color: black;
}

.display-area h1 {
  font-size: 2.5rem;
}
.main {
  width: 100%;
  overflow: hidden;
}
.call {
  margin-left: 6.75rem;
  margin-right: 2rem;
}
.display-area small {
  cursor: pointer;
}
.dots {
  margin: 0;
  color: #575151;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: none;
  background-color: #30c04f;
}
.bottom-navbar li.active a {
  color: #007bff;
}

.button:hover {
  background-color: #2bac47;
}
.call-button {
  background-color: #28a745;
  border: none;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.call-button:focus {
  outline: none;
}
.number {
  text-align: center;
  color: white;
  background: black;
  border: none;
  font-size: 35px;
  font-weight: bold;
}
.number:focus {
  outline: none !important;
}
.delete-button {
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.delete-button:focus {
  outline: none;
}

.row {
  margin-top: 10px;
  justify-content: space-between;
  align-items: center;
}
.card {
  width: 25%;
  height: 45rem;
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
  height: 100%;
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

.navbar-left .time {
  font-size: 1.2rem;
  color: white;
}

.battery-icon {
  position: relative;
}

.battery-icon i {
  font-size: 1.75rem;
}

.battery-percentage {
  font-size: 0.7rem;
  color: rgb(182, 163, 163);
  top: 55%;
  left: 76%;
  transform: translate(-50%, -50%);
  pointer-events: none;
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

@media (max-width: 375px) {
  .call {
    margin-left: 5rem;
    margin-right: 0;
  }
  .bottom-navbar li {
    margin-right: 2.5rem;
  }
  .bottom-navbar ul {
    margin-left: 0;
  }
}
</style>
