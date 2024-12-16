import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/Firebase/firebase";
import {
  collection,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dialerNumber: "",
    callLogs: [],
    loading: true,
    lastVisible: null,
    sortOrder: "asc",
  },
  getters: {
    getDialedNumbers(state) {
      return state.dialerNumber;
    },
    getCallLogs: (state) => state.callLogs,
    getMissedCalls(state) {
      return state.callLogs.filter((call) => call.type === "mis sed");
    },
    isLoading: (state) => state.loading,
    sortOrder: (state) => state.sortOrder,
    getLastVisible: (state) => state.lastVisible,
  },
  mutations: {
    ADD_CALL_LOG(state, call) {
      const existingCall = state.callLogs.find((log) => log.id === call.id);
      if (!existingCall) {
        state.callLogs.unshift(call);
      }
    },
    DELETE_CALL_LOG(state, id) {
      state.callLogs = state.callLogs.filter((call) => call.id !== id);
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_LAST_VISIBLE(state, lastVisible) {
      state.lastVisible = lastVisible;
    },
    SET_SORT_ORDER(state, sortOrder) {
      state.sortOrder = sortOrder;
    },
    SET_LISTENER(state, listener) {
      state.currentListener = listener;
    },

    CLEAR_CALL_LOGS(state) {
      state.callLogs = [];
      state.lastVisible = null;
    },
  },
  actions: {
    async deleteCallLog({ commit }, id) {
      try {
        const docRef = doc(db, "call-log", id);

        await deleteDoc(docRef);

        commit("DELETE_CALL_LOG", id);
      } catch (error) {
        console.error("Error deleting call log: ", error);
      }
    },

    async loadLogsFromFirestore({ commit, state }) {
      commit("SET_LOADING", true);
      commit("CLEAR_CALL_LOGS");
      const q = query(
        collection(db, "call-log"),
        orderBy("time", state.sortOrder),
        limit(2)
      );

      const callLogsData = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const call = {
            id: change.doc.id,
            ...change.doc.data(),
          };

          if (change.type === "added") {
            commit("ADD_CALL_LOG", call);
          }
          if (change.type === "removed") {
            commit("DELETE_CALL_LOG", call.id);
          }
        });
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        commit("SET_LAST_VISIBLE", lastVisible);
        commit("SET_LOADING", false);
      });
      commit("SET_LISTENER", callLogsData);
    },
    loadMoreLogs({ commit, state }) {
      if (!state.lastVisible) return;

      commit("SET_LOADING", true);
      const q = query(
        collection(db, "call-log"),
        orderBy("time", state.sortOrder),
        limit(2),
        startAfter(state.lastVisible)
      );
      const callLogsData = onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          commit("SET_LAST_VISIBLE", null);
          commit("SET_LOADING", false);
          return;
        }

        snapshot.docChanges().forEach((change) => {
          const call = {
            id: change.doc.id,
            ...change.doc.data(),
          };

          if (change.type === "added") {
            commit("ADD_CALL_LOG", call);
          }
          if (change.type === "removed") {
            commit("DELETE_CALL_LOG", call.id);
          }
        });
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        commit("SET_LAST_VISIBLE", lastVisible);
        console.log(lastVisible, "test");
        commit("SET_LOADING", false);
      });
      commit("SET_LISTENER", callLogsData);
    },
    async updateSortOrder({ commit, dispatch }, sortOrder) {
      commit("SET_SORT_ORDER", sortOrder);

      await dispatch("loadLogsFromFirestore");
    },
  },
  modules: {},
});
