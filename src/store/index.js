import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    callLogs: state.callLogs,
    dialedNumber: state.dialedNumber,
  }),
});
export default new Vuex.Store({
  state: {
    dialerNumber: "",
    callLogs: [],
  },
  getters: {
    getDialedNumbers(state) {
      return state.dialerNumber;
    },
    getCallLogs: (state) => state.callLogs,
    getMissedCalls(state) {
      return state.callLogs.filter((call) => call.type === "missed");
    },
  },
  mutations: {
    ADD_CALL_LOG(state, call) {
      state.callLogs.unshift(call);
    },
    DELETE_CALL_LOG(state, id) {
      state.callLogs = state.callLogs.filter((call) => call.id !== id);
    },
  },
  actions: {
    deleteCallLog({ commit }, id) {
      commit("DELETE_CALL_LOG", id);
    },
    loadCallLogs({ commit, state }) {
      if (state.callLogs.length === 0) {
        const logs = JSON.parse(localStorage.getItem("callLogs")) || [];
        logs.forEach((log) => commit("ADD_CALL_LOG", log));
      }
    },
    addCallLog({ commit, state }, call) {
      const existingCall = state.callLogs.find((log) => log.id === call.id);
      if (!existingCall) {
        commit("ADD_CALL_LOG", call);
      }
    },
  },
  plugins: [vuexLocal.plugin],
  modules: {},
});
