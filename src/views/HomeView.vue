<template>
  <div class="home">
    <DialerApp v-if="!isCalling" @start-call="handleStartCall" />
    <CallScreen
      v-else
      :dialedNumber="currentNumber"
      @end-call="handleEndCall"
    />
  </div>
</template>

<script>
import DialerApp from "@/components/DialerApp.vue";

import CallScreen from "@/components/CallScreen.vue";
export default {
  name: "HomeView",
  components: {
    DialerApp,
    CallScreen,
  },
  data() {
    return {
      isCalling: false,
      currentNumber: "",
    };
  },
  methods: {
    handleStartCall(number) {
      this.isCalling = true;
      this.currentNumber = number;
    },
    handleEndCall() {
      this.isCalling = false;
      this.currentNumber = "";
    },
  },
};
</script>
<style scoped></style>
