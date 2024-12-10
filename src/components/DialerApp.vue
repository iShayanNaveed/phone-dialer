<template>
  <div class="main">
    <div class="container text-center text-light main">
      <NavBar />
      <div class="display-area d-flex flex-column align-items-center">
        <input
          type="text"
          v-model="dialedNumber"
          class="number-field text-center text-white border-0 fw-bold bg-black"
        />
        <small
          class="text-primary cursor-pointer"
          role="button"
          @click="addNumber"
          >Add Number</small
        >
      </div>
      <div class="row">
        <div v-for="(number, index) in numbers" :key="index" class="col-4 mb-2">
          <button
            class="btn btn-dark rounded-circle text-light number-btn"
            @click="appendNumber(number)"
          >
            <span>{{ number.label }}</span>
            <small v-if="number.subLabel" class="d-block">{{
              number.subLabel
            }}</small>
          </button>
        </div>
        <div class="col-4 text-center call">
          <button
            class="call-button btn btn-success d-flex align-items-center justify-content-center rounded-circle"
            :disabled="!dialedNumber"
            @click="makeCall"
            style="height: 75px; width: 75px"
          >
            <img src="@/assets/call.svg" alt="" />
          </button>
        </div>
        <div class="col-2 text-center">
          <button
            class="btn delete-button"
            :disabled="!dialedNumber"
            @click="deleteLastDigit"
          >
            <i class="bi bi-backspace"></i>
          </button>
        </div>
      </div>

      <TaskBar />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid";
import NavBar from "./NavBar.vue";
import TaskBar from "./TaskBar.vue";
export default {
  components: {
    NavBar,
    TaskBar,
  },
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

        this.$emit("start-call", this.dialedNumber);
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
.display-area h1 {
  font-size: 2.5rem;
}
.call {
  margin-left: 9.75rem;
}
.container {
  max-width: 400px;
  height: auto;
  padding: 10px;
}
.number-btn {
  height: 75px;
  line-height: 1.6;
  font-size: 18px;
  width: 75px;
}
.number-field {
  font-size: 35px;
}
.number-field:focus {
  outline: none !important;
}
.delete-button {
  border: none;
  width: 4rem;
  height: 4.5rem;
  color: white;
}
.delete-button:focus {
  outline: none;
}
.row {
  margin-top: 10px;
}

@media (max-width: 375px) {
  .call {
    margin-left: 9rem;
    margin-right: 0;
  }
}
@media (max-width: 320px) {
  .call {
    margin-left: 7rem;
    margin-right: 0;
  }
}
</style>
