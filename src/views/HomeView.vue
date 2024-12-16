<template>
  <div class="home">
    <DialerApp v-if="!isCallActive" @start-call="handleStartCall" />
    <CallScreen v-else :callData="activeCallData" @end-call="handleEndCall" />
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
      isCallActive: false,
      activeCallData: null,
    };
  },
  methods: {
    handleStartCall(callData) {
      this.isCallActive = true;
      this.activeCallData = callData;
    },
    handleEndCall() {
      this.isCallActive = false;
      this.activeCallData = null;
    },
  },
};
</script>
<style scoped></style>
