import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default ({
  namespaced: true,
  state: {
    organizers: [],
    totalOrganizers: []
  },
  mutations: {
    organizers (state, data) {
      state.organizers = data
      // console.log(state.organizers)
    },
    search (state, data) {
      state.organizers = data
      // console.log(data)
    },
    totalEvent (state, data) {
      state.totalOrganizers = data
      console.log(state.totalOrganizers)
    }
  },
  actions: {
    getAllOrganizers (context) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'user/role/2')
        .then(res => {
          context.commit('organizers', res.data.users.rows)
        })
    },
    getAllPages (context, page) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'user/role/2?page=' + page)
        .then(res => {
          // console.log(res)
          context.commit('organizers', res)
        })
    },
    organizerNewest (context) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'user/role/2?time=DESC')
        .then(res => {
          // console.log(res)
          context.commit('organizers', res.data.users.rows)
        })
    },
    organizerOldest (context) {
      axios
        .get(process.env.VUE_APP_BASE_URL + 'user/role/2?time=ASC')
        .then(res => {
          // console.log(res)
          context.commit('organizers', res.data.users.rows)
        })
    },
    totalOrganizer (context) {
      // console.log(process.env.VUE_APP_BASE_URL)
      axios
        .get(process.env.VUE_APP_BASE_URL + 'user/role/2')
        .then(res => {
          // console.log(res)
          context.commit('totalEvent', res.data.users.count)
        })
    },
    searchOrganizer (context, data) {
      // console.log(data)
      axios
        .get(process.env.VUE_APP_BASE_URL + 'user/role/2?search=' + data)
        .then(res => {
          // console.log(res)
          context.commit('search', res.data.users.rows)
        })
    },
    deleteOrganizer (context, { id, token }) {
      console.log('delete organizer')
      axios
        .patch(process.env.VUE_APP_BASE_URL + 'user/approve/' + id, {
          status: 3
        },
        { headers: { 'baca-bismillah': token } })
        .then(res => {
          console.log(res.data.message)
        })
    },
    approveOrganizer (context, { id, token }) {
      // console.log(id, token)
      axios
        .patch(process.env.VUE_APP_BASE_URL + 'user/approve/' + id, {
          status: 2
        },
        { headers: { 'baca-bismillah': token } })
        .then(res => {
          console.log(res.data.message)
        })
    },
    deleteEvent (context, { id, token }) {
      // console.log(id, token)
      axios
        .patch(process.env.VUE_APP_BASE_URL + 'event/approve/' + id, {
          status: 3
        },
        { headers: { 'baca-bismillah': token } })
        .then(res => {
          console.log(res.data.message)
        })
    },
    approveEvent (context, { id, token }) {
      // console.log(id, token)
      axios
        .patch(process.env.VUE_APP_BASE_URL + 'event/approve/' + id, {
          status: 1
        },
        { headers: { 'baca-bismillah': token } })
        .then(res => {
          console.log(res.data.message)
        })
    }
  }
})
