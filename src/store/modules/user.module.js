import md5 from 'crypto-js/md5'
import axios from 'axios'
import {
    addTokenToPayload,
    deleteExpiredToken,
    navigateToHome,
    baseurl
} from '@/utils/utils'

export default {

    namespaced: true,
    state: {
        test: "Hello Test",
        userObejctId: undefined,
        userData: {},
        searchUser: undefined,
        statusData: {},
        showContactDialog: false,
        contactData: {},
        jobs: [],
        viewJobDialog: false,
        viewJobData: {},
    },
    mutations: {
        setTest: (state, data) => {
            state.test = data;
        },
        setViewJob: (state, data) => {
            state.viewJobDialog = data;
        },
        setViewJobData: (state, data) => {
            state.viewJobData = data;
        },
        showViewJob: (state, data) => {
            state.viewJobDialog = true,
                state.viewJobData = data
        },
        closeViewJob: (state, data) => {
            state.viewJobDialog = false
        },
        setJobs: (state, data) => {
            state.jobs = data;
        },
        appendJobList: (state, data) => {
            state.jobs = state.jobs.concat(data)
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
            state.userData.PHONE_NUMBER_PHONE_INFORMATION = data.PHONE_NUMBER_PHONE_INFORMATION
            state.userData.PERSONAL_EMAIL_ID = data.PERSONAL_EMAIL_ID
            state.userData.CITY_ADDRESSES = data.CITY_ADDRESSES
            state.userData = JSON.parse(JSON.stringify(state.userData))
        },
        savedUserObjectId: (state, data) => {
            state.userObejctId = data
        }

    },
    getters: {
        getSavedUserObjectId: (state) => {
            return state.userObejctId
        },
        getshowContactDialog: (state) => {
            return state.showContactDialog
        },
        getContactDialogData: (state) => {
            return state.contactData
        },
        getTest: (state) => {
            return state.test;
        },
        getViewJob: (state) => {
            return state.viewJobDialog;
        },
        getViewJobData: (state) => {
            return state.viewJobData
        },
        getJobs: (state) => {
            return state.jobs;
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
            //let pass = md5(data.password).toString()
            let burl = baseurl()
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: burl + '/user/auth/login',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        "EMAIL": data.email,
                        "PASSWORD": data.password
                    }
                }).then((response) => {
                    console.log('heya!')
                    if (response && response.data.status && response.data.status == 200 && response.data.result!="Incorrect Username") {
                        commit('setData', response.data.result)
                        sessionStorage.setItem("UserId", response.data.result.USER_ID)
                        sessionStorage.setItem("AccessToken", response.data.token)
                        var type = md5(response.data.usertype).toString()
                        sessionStorage.setItem("Type", type)
                        sessionStorage.setItem("ObjectId", response.data.result.ID)
                    }
                    // if (response && response.data.status && response.data.result) {
                    //     sessionStorage.setItem("UserId", response.data.result.USER_ID)
                    //     var type = md5(response.data.usertype).toString()
                    //     sessionStorage.setItem("Type", type)
                    //     sessionStorage.setItem("ObjectId", response.data.result.ID)
                    // }
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
            //let pass = md5(data.password).toString()
            let burl = baseurl()
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: burl + '/user/auth/signup',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        'EMAIL': data.email,
                        'PASSWORD': data.password,
                        'USERID': data.userid
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
                    url: 'https://api.steppingcloud.com/awsadmin/documentdownlaod',
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
                    url: 'https://api.steppingcloud.com/admin/action/updatealumni',
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
            let burl = baseurl()
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url: burl+'/user/action/userprofile/get?USERID='+data.payload.userid,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token

                    },
                    data: data
                }).then((response) => {
                    if (response && response.data.status && response.data.status == 200) {
                        commit('setData', response.data.result)
                        // commit('setSearchData', response.data.result)
                        resolve(response.data)

                        console.log(response)
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        },

        getSearchAlumniById: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'https://api.steppingcloud.com/admin/action/alumniview',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                }).then((response) => {
                    if (response && response.data.status && response.data.status == 200) {
                        // commit('setData', response.data.result)
                        commit('setSearchData', response.data.result)
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
                    url: 'https://api.steppingcloud.com/user/forgetpassword',
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
                    url: 'https://api.steppingcloud.com/personaluser/user/status',
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
        getJob: ({
            state,
            commit
        }, data) => {
            var data1
            addTokenToPayload(data)
            console.log(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'https://api.steppingcloud.com/personaluser/user/getjobs',
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
                        commit('setJobs', response.data.result)
                        resolve(response)
                        console.log(response)
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        recommendedJob: ({
            state,
            commit
        }, data) => {
            var data1
            addTokenToPayload(data)
            console.log(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'https://api.steppingcloud.com/personaluser/user/jobrecommendations',
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
                        commit('setJobs', response.data.result[0].recommendedjobs)
                        resolve(response)
                        console.log(response)
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        getMoreJob: ({
            state,
            commit
        }, data) => {
            var data1
            addTokenToPayload(data)
            console.log(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'https://api.steppingcloud.com/personaluser/user/getjobs',
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
                        commit('appendJobList', response.data.result)
                        resolve(response)
                        console.log(response)
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        getMoreRecommendedJob: ({
            state,
            commit
        }, data) => {
            var data1
            addTokenToPayload(data)
            console.log(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'https://api.steppingcloud.com/personaluser/user/jobrecommendations',
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
                        commit('appendJobList', response.data.result[0].recommendedjobs)
                        resolve(response)
                        console.log(response)
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        resetPassword: ({
            state,
            commit
        }, data) => {
            // addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'https://api.steppingcloud.com/user/reset/' + data.resettoken,
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
        createTicket: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'https://api.steppingcloud.com/hrroutes/postticket',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                }).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        getAllUserQueries: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'https://api.steppingcloud.com/hrroutes/getticket',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                }).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        getAllEsclationManagers: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'https://api.steppingcloud.com/hrroutes/getescalationmanager',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                }).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        postQueryMessage: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'https://api.steppingcloud.com/hrroutes/postmessage',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                }).then((response) => {
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                })
            })
        }
    }
}