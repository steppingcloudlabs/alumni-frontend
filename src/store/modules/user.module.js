import md5 from 'crypto-js/md5'
import axios from 'axios'
export default {
    
    namespaced: true,
    state: {
        test: "Hello Test"
    },
    mutations:{
        setTest: (state, data) => {
            state.test = data;
        }
    },
    getters: {
        getTest: (state) => {
            return state.test;
        },
        getUserData: (state) => {
            return state.userData
          },
    },
    actions: {
        login: ({state, commit, dispatch}, data) => {
            let pass = md5(data.password).toString()
            return new Promise((resolve, reject) => {
              axios({
                method:'POST',
                url:'http://192.168.10.135:4000/user/signin',
                headers: {
                  'Content-Type':'application/json',
                },
                data: {
                  'email': data.email,
                  'password': pass
                }
              }).then((response) => {
                console.log('heya!')
                console.log(response.data)
                resolve(response.data)
                commit('setData', response.data.message.data)
                commit('statusData', response.data)
              }).catch((error)=> {
                console.log(error)
                
                reject(error)
              })
            })
          },
          signup: ({state, commit, dispatch}, data) => {
            let pass = md5(data.password).toString()
            return new Promise((resolve, reject) => {
              axios({
                method:'POST',
                url:'http://192.168.10.135:4000/user/signup',
                headers: {
                  'Content-Type':'application/json',
                },
                data: {
                  'email': data.email,
                  'password': pass,
                  'companyname':data.companyname,
                  'userid':data.userid
                }
              }).then((response) => {
                console.log(response)
                resolve(response.data)
              }).catch((error)=> {
                console.log(error)
                reject(error)
              })
            })
          },

    }
}