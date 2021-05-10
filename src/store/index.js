import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) != "loglevel:webpack-dev-server") {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
      return arr;
    }
  },
};

export default new Vuex.Store({
  state: {
    prevtoken: "",
    nexttoken: "",
    list: [
      { id: "", title: "" },
      { id: "", title: "" },
      { id: "", title: "" },
      { id: "", title: "" },
      { id: "", title: "" },
    ],
    playlist: [],
    url: "",
    tag: "",
    playurl: "",
    Comments: storage.fetch(),
  },
  mutations: {
    addPrevToken(state, token) {
      state.prevtoken = token;
    },
    addNextToken(state, token) {
      state.nexttoken = token;
    },
    addList(state, data) {
      state.list = data;
    },
    setUrl(state, url) {
      state.url = url;
    },
    addPlayList(state, url) {
      state.playlist.push(url);
      if (state.playlist.length == 1) state.playurl = url.id;
    },
    deletePlayList(state, id) {
      state.playlist.splice(id, 1);
      state.playurl = state.playlist[0].id;
    },
    ADD_COMMENT(state, value) {
      const obj = value;
      localStorage.setItem(value, JSON.stringify(obj));
      state.Comments.push(obj);
    },
    DELETE_COMMENT(state, obj) {
      console.log(obj.comment, obj.index);
      localStorage.removeItem(obj.comment);
      state.Comments.splice(obj.index, 1);
    },
  },
  actions: {},
  modules: {},
});
