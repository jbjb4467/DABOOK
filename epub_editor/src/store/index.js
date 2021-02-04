import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ebookDirectory: '', // ebook's root directory
    ebookDirectoryTree: [], // Directory's item
    selectedFileDirectory: '', // selected file's directory
    tableOfContents: [], // TableOfContents' item
    editingText: '', //textarea's text value
    editingHTMLText: '',  //default HTML text value
    findTextArray: [],

    alertMessage:'',
    alertDialog:false,
  },

  mutations: {
    SET_EDITINGTEXT: function (state, value) {
      state.editingText = value;
    },
    SET_SELECTEDFILEDIRECTORY: function (state, value) {
      state.selectedFileDirectory = value;
    },
    SET_EBOOKDIRECTORYTREE: function (state, value) {
      state.ebookDirectoryTree = value;
    },
    SET_TABLEOFCONTENTS: function (state, value) {
      state.tableOfContents = value;
    },
    ADD_TABLEOFCONTENTS: function (state, value) {
      state.tableOfContents.push({text: value});
    },
    SET_EDITINGHTML: function (state, value) {
      state.editingHTMLText = value;
    },
    SET_EBOOKDIRECTORY: function (state, value) {
      state.ebookDirectory = value;
      const temp = state.ebookDirectory.split('\\')
      const temp2 = temp[temp.length - 1].split('/')
      const title = temp2[temp2.length - 2]
      console.log(temp, title)
      document.getElementById('electron-title').text = 'epub_editor - ' + title
    },
    SET_FINDTEXTARRAY: function (state, value) {
      state.findTextArray = value;
    },
    SET_ALERTMESSAGE: function (state,value) {
      state.alertDialog=true;
      state.alertMessage=value;
    },
    CANCEL_ALERTMESSAGE: function (state){
      state.alertDialog=false;
    }
  },
  actions: {
    setEditingText: function ({ commit }, value) {
      commit('SET_EDITINGTEXT', value);
    },
    setEbookDirectory: function ({ commit }, value) {
      commit('SET_EBOOKDIRECTORY', value);
    },
    setSelectedFileDirectory: function ({ commit }, value) {
      commit('SET_SELECTEDFILEDIRECTORY',value);
    },
    setEbookDirectoryTree: function ({ commit }, value) {
      commit('SET_EBOOKDIRECTORYTREE',value);
    },
    setTableOfContents: function ({ commit }, value) {
      commit('SET_TABLEOFCONTENTS',value);
    },
    addTableOfContents: function ({ commit }, value) {
      commit('ADD_TABLEOFCONTENTS', value);
    },
    setHTMLText: function ({ commit }, value) {
      commit('SET_EDITINGHTML', value);
    },
    setFindTextArray: function ({ commit }, value) {
      commit('SET_FINDTEXTARRAY', value);
    },
    setAlertMessage : function({commit}, value) {
      commit('SET_ALERTMESSAGE',value);
    },
    cancelAlertMessage: function({commit}){
      commit('CANCEL_ALERTMESSAGE');
    }
  },

  modules: {
  }
})
