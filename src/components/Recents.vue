<template>
  <div class="main">
    <!-- <div class="card">
      <div class="btn1"></div>
      <div class="btn2"></div>
      <div class="btn3"></div>
      <div class="btn4"></div>
      <div class="card-int"></div>
      <div class="top"></div> -->

    <div class="recents-container">
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
      <div class="tabs d-flex align-items-center">
        <span
          ><a href="#" style="text-decoration: none; margin-left: 1rem"
            >Edit</a
          ></span
        >
        <div class="switchtabs">
          <button
            class="all"
            :class="{ active: activeTab === 'all' }"
            @click="activeTab = 'all'"
          >
            All
          </button>
          <button
            class="missed"
            :class="{ active: activeTab === 'missed' }"
            @click="activeTab = 'missed'"
          >
            Missed
          </button>
        </div>
      </div>
      <header class="recents-header">
        <h2>Recents</h2>
      </header>

      <div class="recents-list-container">
        <ul class="recents-list">
          <li
            v-for="call in filteredCalls.slice(0, 10)"
            :key="call.id"
            class="recents-item"
          >
            <div class="call-info">
              <span class="call-name">{{ call.name }}</span>
              <span class="call-type">{{
                call.type === "video" ? "Video Call" : "Voice Call"
              }}</span>
            </div>
            <div class="call-meta">
              <span class="call-time">{{ call.time }}</span>
              <button class="delete-btn" @click="deleteCall(call.id)">
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </li>
        </ul>
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
          <li>
            <a href="#" @click="gotodialpad"
              ><i class="bi bi-grid"></i><br />Keypad</a
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- </div>÷/ -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      activeTab: "missed",
    };
  },
  computed: {
    ...mapGetters(["getCallLogs", "getMissedCalls"]),
    filteredCalls() {
      return this.activeTab === "missed"
        ? this.getCallLogs
        : this.getMissedCalls;
    },
  },
  methods: {
    ...mapActions(["deleteCallLog", "loadCallLogs"]),
    deleteCall(id) {
      this.deleteCallLog(id);
    },
    gotodialpad() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.loadCallLogs();
  },
  watch: {
    callLogs: {
      testCallLogs(logs) {
        localStorage.setItem("callLogs", JSON.stringify(logs));
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.recents-container {
  background-color: black;
  color: white;
  height: 100%;
}
.main {
  width: 430px;
  height: 100vh;
  padding: 0 17px;
  margin: 0 auto;
  background-color: black;
}
.recents-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
.all {
  width: 60px;
}
.call-name {
  color: #d02727;
}
.missed {
  width: 67px;
}
.tabs button {
  height: 2rem;
  flex: 1;
  /* padding: 10px; */
  border: none;
  font-size: 16px;
  background: none;
  color: gray;
  cursor: pointer;
  text-align: center;
}

.tabs button.active {
  color: white;
  /* font-weight: bold; */
  /* border-bottom: 2px solid #1e90ff; */
  background-color: #7e7b7b;
  border-radius: 10px;
  font-size: 16px;
}
.switchtabs {
  margin-left: 7rem;
  background-color: #343030;
  border-radius: 10px;
  width: 8rem;
  height: 2rem;
}
.dots {
  margin: 0;
  color: #575151;
}
.recents-list {
  list-style: none;
  padding: 0;
}

.recents-list {
  list-style: none;
  padding: 0;
}

.recents-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid gray;
}

.call-info {
  display: flex;
  flex-direction: column;
}

.call-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.call-time {
  color: gray;
  font-size: 14px;
}

.call-type {
  /* color: #1e90ff; */
  font-size: 14px;
  margin-top: 5px;
}

.delete-btn {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}

.card {
  width: 30%;
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

.recents-list-container {
  max-height: 20rem;
  overflow-y: auto;
}

.recents-list-container::-webkit-scrollbar {
  width: 8px;
}

.recents-list-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
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
  margin-right: 3.5rem;
  font-size: 10px;
}
.bottom-navbar ul {
  height: 22px;
  align-items: center;
  padding: 1px;
  margin-top: 2rem;
  padding-bottom: 2rem;
  margin-left: 23px;
}
.bottom-navbar li.active a {
  color: #007bff;
}
.bottom-navbar a {
  color: white;
  text-decoration: none;
}
.bottom-navbar {
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 10px;
  /* padding: 10px; */
}
.bottom-navbar i {
  font-size: 20px;
  margin-bottom: 5px;
}
@media (max-width: 1024px) {
  .card {
    width: 50%;
  }
  .bottom-navbar li {
    margin-right: 3.5rem;
  }
  .switchtabs {
    margin-left: 6.5rem;
  }
  .bottom-navbar ul {
    margin-left: 20px;
  }
}
@media (max-width: 768px) {
  .switchtabs {
    margin-left: 6rem;
  }
  .card {
    width: 84%;
  }
  .bottom-navbar li {
    margin-right: 2.5rem;
  }
  .bottom-navbar ul {
    margin-left: 3rem;
  }
}
@media (max-width: 650px) {
  .bottom-navbar ul {
    margin-left: 2rem;
  }
}
@media (max-width: 425px) {
  .bottom-navbar li {
    margin-right: 1.75rem;
  }
  .main {
    width: 80%;
  }
  .switchtabs {
    margin-left: 6.5rem;
  }
}
@media (max-width: 375px) {
  .bottom-navbar li {
    margin-right: 1rem;
  }
  .switchtabs {
    margin-left: 3rem;
  }
  .bottom-navbar ul {
    margin-left: 23px;
  }
  .card {
    width: 90%;
  }
}
@media (max-width: 338px) {
  .bottom-navbar ul {
    margin-left: 0;
  }
}
</style>
