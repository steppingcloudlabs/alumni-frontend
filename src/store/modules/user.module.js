import md5 from 'crypto-js/md5'
import axios from 'axios'
import {
    addTokenToPayload,
    deleteExpiredToken,
    navigateToHome
} from '@/utils/utils'

export default {

    namespaced: true,
    state: {
        test: "Hello Test",
        userData: {},
        searchUser: {},
        statusData: {},
        showContactDialog: false,
        contactData: {}
    },
    mutations: {
        setTest: (state, data) => {
            state.test = data;
        },
        setData: (state, data) => {
            state.userData = data;
        },
        setSearchData: (state, data) => {
            state.searchUser = data;
            console.log(state.searchUser)
        },
        setStatusData: (state, data) => {
            state.statusData = data[0];
        },
        showContactDialog: (state, data) => {
            state.showContactDialog = true
            state.contactData = data
        },
        setShowContactDialog: (state, data) => {
            state.showContactDialog = true
            state.contactData = data

        },
        setShowContactDialogData: (state, data) => {
            state.contactData = data
        },
        closeContactDialog: (state, data) => {
            state.showContactDialog = false
        },
        setUpdateContactData: (state, data) => {
            state.userData.phone_number_phone_information = data.phone_number_phone_information
            state.userData.personal_email_id = data.personal_email_id
            state.userData.city_addresses = data.city_addresses
            state.userData = JSON.parse(JSON.stringify(state.userData))
        },

    },
    getters: {
        getshowContactDialog: (state) => {
            return state.showContactDialog
        },
        getContactDialogData: (state) => {
            return state.contactData
        },
        getTest: (state) => {
            return state.test;
        },
        getUserData: (state) => {
            return state.userData
        },
        getSearchUserData: (state) => {
            return state.searchUser
        },
        getStatusData: (state) => {
            return state.statusData
        },
    },
    actions: {
        login: ({
            state,
            commit,
            dispatch
        }, data) => {
            let pass = md5(data.password).toString()
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/user/signin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        'email': data.email,
                        'password': pass
                    }
                }).then((response) => {
                    console.log('heya!')
                    if (response && response.data.status && response.data.status == 200) {
                        commit('setData', response.data.result)
                        sessionStorage.setItem("AccessToken", response.data.token)
                        sessionStorage.setItem("UserId", response.data.result.user_id)
                        // commit('statusData', response.data.message.data)
                    }
                    // } else {
                    //     commit('statusData', response.data.status)
                    // }
                    resolve(response.data)
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                })
            })
        },
        signup: ({
            state,
            commit,
            dispatch
        }, data) => {
            let pass = md5(data.password).toString()
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/user/signup',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        'email': data.email,
                        'password': pass,
                        'companyname': "tata",
                        'userid': data.userid
                    }
                }).then((response) => {
                    console.log(response)
                    resolve(response.data)
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                })
            })
        },
        downloadDocument: ({
            state,
            commit,
            dispatch
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/awsadmin/documentdownlaod',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                }).then((response) => {
                    if (response && response.data && response.data.status == "400" && response.data.result == "Token expired, Please Login Again") {
                        deleteExpiredToken()
                        navigateToHome()
                        commit('showSessionExpiredError', {}, {
                            root: true
                        })
                    }
                    resolve(response)
                    window.open(response.data.result, '_blank')
                    console.log(response)
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        updateData: ({
            state,
            commit,
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/updatealumni',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                }).then((response) => {
                    if (response && response.data && response.data.status == "400" && response.data.result == "Token expired, Please Login Again") {
                        deleteExpiredToken()
                        navigateToHome()
                        commit('showSessionExpiredError', {}, {
                            root: true
                        })
                    } else {
                        resolve(response)
                        console.log(response)
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        getAlumniById: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/alumniview',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                }).then((response) => {
                    if (response && response.data.status && response.data.status == 200) {
                        commit('setData', response.data.result)
                        resolve(response.data)

                        console.log(response)
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        forgotPassword: ({
            state,
            commit
        }, data) => {
            // addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/user/forgetpassword',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                }).then((response) => {
                    resolve(response)

                    console.log(response)
                }).catch((error) => {
                    reject(error)
                })

            })
        },

        getStatus: ({
            state,
            commit,
        }, data) => {
            addTokenToPayload(data)
            console.log(data)

            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/personaluser/user/status',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                }).then((response) => {
                    if (response && response.data && response.data.status == "400" && response.data.result == "Token expired, Please Login Again") {
                        deleteExpiredToken()
                        navigateToHome()
                        commit('showSessionExpiredError', {}, {
                            root: true
                        })
                    }
                    commit('setStatusData', response.data.result)
                    resolve(response)
                    console.log(response)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        contactHr: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/ask-hr',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                }).then((response) => {
                    if (response && response.data && response.data.status == "400" && response.data.result == "Token expired, Please Login Again") {
                        deleteExpiredToken()
                        navigateToHome()
                        commit('showSessionExpiredError', {}, {
                            root: true
                        })
                    } else {
                        resolve(response)
                        console.log(response)
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        }
    }
}