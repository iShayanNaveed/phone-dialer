<template>
  <div class="main">
    <div class="recents-container text-white p-2">
      <NavBar class="navbar mb-4" />
      <div class="tabs d-flex align-items-center">
        <span><a href="#" class="text-decoration-none ms-4">Edit</a></span>
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
      <header class="recents-header py-2">
        <h2>Recents</h2>
      </header>

      <div class="recents-list-container">
        <ul class="recents-list p-0">
          <li
            v-for="call in filteredCalls.slice(0, 10)"
            :key="call.id"
            class="recents-item"
          >
            <div class="call-info d-flex flex-column">
              <span class="call-name text-danger">{{ call.name }}</span>
              <span class="call-type mt-1">{{
                call.type === "video" ? "Video Call" : "Voice Call"
              }}</span>
            </div>
            <div class="call-meta d-flex align-items-center">
              <span class="call-time text-secondary">{{ call.time }}</span>
              <button
                class="delete-btn bg-transparent border-0 text-danger cursor-pointer"
                @click="deleteCall(call.id)"
              >
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>

      <TaskBar class="taskbar" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavBar from "./NavBar.vue";
import TaskBar from "./TaskBar.vue";
export default {
  components: {
    NavBar,
    TaskBar,
  },
  data() {
    return {
      activeTab: "all",
    };
  },
  computed: {
    ...mapGetters(["getCallLogs", "getMissedCalls"]),
    filteredCalls() {
      return this.activeTab === "all" ? this.getCallLogs : this.getMissedCalls;
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
    calllogs: {
      testCallLogs(logs) {
        localStorage.setItem("callLogs", JSON.stringify(logs));
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.main {
  width: 430px;
  height: 100vh;
  margin: 0 auto;
}

.all {
  width: 60px;
}

.missed {
  width: 67px;
}
.tabs button {
  height: 2rem;

  border: none;
  background: none;
  color: gray;
  cursor: pointer;
  text-align: center;
}

.tabs button.active {
  color: white;

  background-color: #7e7b7b;
  border-radius: 10px;
}
.switchtabs {
  margin-left: 7rem;
  background-color: #343030;
  border-radius: 10px;
}
.dots {
  margin: 0;
  color: #575151;
}
.taskbar-miss {
  margin-top: 28rem;
}

.recents-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid gray;
}

.recents-list-container {
  height: 23.75rem;
  overflow-y: auto;
}

.recents-list-container::-webkit-scrollbar {
  width: 8px;
}

.recents-list-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

@media (max-width: 1024px) {
  .switchtabs {
    margin-left: 6.5rem;
  }
}
@media (max-width: 768px) {
  .switchtabs {
    margin-left: 6rem;
  }

  .taskbar {
    margin-top: 5rem;
  }
}
@media (max-width: 650px) {
  .bottom-navbar ul {
    margin-left: 2rem;
  }
}
@media (max-width: 425px) {
  .main {
    width: 80%;
  }
  .switchtabs {
    margin-left: 6.5rem;
  }
}
@media (max-width: 375px) {
  .switchtabs {
    margin-left: 3rem;
  }
}
</style>
