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
        showDrawer:false,
        test: "Hello Test",
        userObejctId: undefined,
        userData: {},
        searchUser: undefined,
        statusData: {},
        showContactDialog: false,
        showAvatarDialog: false,
        contactData: {},
        avatarData:{},
        jobs: [],
        viewJobDialog: false,
        viewJobData: {},
        newsList:[],
        FaqList:[],
        EventList:[],
        alumniList:[],
        renderNews: {}
    },
    mutations: {

        setRenderNews: (state, data) => {
            state.renderNews = data;
        },
        setshowDrawer: (state,data)=>{
         state.showDrawer=data
        },
        closeDrawer:(state)=>{
            state.showDrawer=false
           },
        setAlumniList: (state, data) => {
            state.alumniList = data
        },
        setFaqList: (state, data) => {
            state.FaqList = data
        },
        setEventList: (state, data) => {
            state.EventList = data
            console.log(EventList)

        },
        setNewsList: (state, data) => {
            state.newsList = data
        },
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
            state.statusData = data;
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

        setUpdateAvatarData: (state, data) => {
            state.userData.PROFILEIMAGE = data.payload.PROFILEIMAGE   
            state.userData = JSON.parse(JSON.stringify(state.userData))
        },

        showAvatarDialog: (state, data) => {
            state.showAvatarDialog = true
            state.avatarData = data
        },
        setShowAvatarDialog: (state, data) => {
            state.showAvatarDialog = true
            state.avatarData = data

        },
        setShowAvatarDialogData: (state, data) => {
            state.avatarData = data
        },
        closeAvatarDialog: (state, data) => {
            state.showAvatarDialog = false
        },
        updatelinkedinData:(state,data)=>
        {
         state.userData.LINKEDIN=data
         state.userData = JSON.parse(JSON.stringify(state.userData))
        },
        
        updateskillData:(state,data)=>
        {
         state.userData.SKILL=data
         state.userData = JSON.parse(JSON.stringify(state.userData))
        },

        savedUserObjectId: (state, data) => {
            state.userObejctId = data
        }

    },
    getters: {

        getRenderNews: (state) =>  {
            return state.renderNews
        },
        getshowDrawer:(state)=>{
          return state.showDrawer
        },
        getNewsList: (state) => {
            return state.newsList
        },
        getEventList: (state) => {
            return state.EventList
        },
        getFaqList: (state) => {
            return state.FaqList
        },
        getAlumniList: (state) => {
            return state.alumniList
        },
        getSavedUserObjectId: (state) => {
            return state.userObejctId
        },
        getshowContactDialog: (state) => {
            return state.showContactDialog
        },
        getContactDialogData: (state) => {
            return state.contactData
        },
        getshowAvatarDialog: (state) => {
            return state.showAvatarDialog
        },
        getAvatarDialogData: (state) => {
            return state.avatarData
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
           //let burl = baseurl()
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url:baseurl()+'/auth/login',
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
                        commit('setData', response.data.result[0])
                        if(response.data.result[0].USERTYPE=="admin")
                        {
                            sessionStorage.setItem("UserId", response.data.result[0].USERNAME)
                            sessionStorage.setItem("AccessToken", response.data.token)
                            var type = md5(response.data.result[0].USERTYPE).toString()
                            sessionStorage.setItem("userType", response.data.result[0].USERTYPE)
                            sessionStorage.setItem("Type", type)
                           // sessionStorage.setItem("ObjectId", response.data.result[0].ID)
                        }
                        else{
                            sessionStorage.setItem("UserId", response.data.result[0].USER_ID)
                        sessionStorage.setItem("AccessToken", response.data.token)
                        var type = md5(response.data.result[0].USERTYPE).toString()
                        sessionStorage.setItem("userType", response.data.result[0].USERTYPE)
                        sessionStorage.setItem("Type", type)
                        sessionStorage.setItem("ObjectId", response.data.result[0].ID)
                        }
                       
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
           // let burl = baseurl()
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url:baseurl()+ '/user/auth/signup',
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
           // let burl=baseurl()
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url:baseurl()+ '/user/action/documents/get?USERID='+data.payload.userid+'&FILENAME='+data.payload.filename,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token
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
                   
                    const downloadLink = document.createElement("a");
                    const fileName = data.payload.filename+".pdf";

                    downloadLink.href = response.data.result[0].STREAM;
                    downloadLink.download = fileName;
                    downloadLink.click();
                  //  window.open(response.data.result, '_blank')
                  resolve(response)
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
           // let burl=baseurl()
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url:baseurl()+ '/user/action/userprofile/update',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token
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
           // let burl = baseurl()
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url:baseurl()+'/user/action/userprofile/get?USERID='+data.payload.userid,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token

                    },
                    data: data
                }).then((response) => {
                    if (response && response.data && response.data.status == "400" && response.data.result == "Token expired, Please Login Again") {
                        deleteExpiredToken()
                        navigateToHome()
                        commit('showSessionExpiredError', {}, {
                            root: true
                        })
                    } else if (response && response.data.status && response.data.status == 200) {
                        commit('setData', response.data.result[0])
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
                    method: 'GET',
                    url:baseurl()+'/search/userprofile?QUERY='+data.payload.userid,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token
                    },
                    data: data
                }).then((response) => {
                    if (response && response.data && response.data.status == "400" && response.data.result == "Token expired, Please Login Again") {
                        deleteExpiredToken()
                        navigateToHome()
                        commit('showSessionExpiredError', {}, {
                            root: true
                        })
                    } else if (response && response.data.status && response.data.status == 200) {
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


        getAllNews: ({
            state,
            commit
        }, data) => {
           
            addTokenToPayload(data)

            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url:baseurl()+ "/user/action/news/get?LIMIT="+data.payload.limit+"&OFFSET="+data.payload.offset,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token

                    }
                    
                }).then((response) => {
                    if (response && response.data && response.data.status == "400" && response.data.result == "Token expired, Please Login Again") {
                        deleteExpiredToken()
                        navigateToHome()
                        commit('showSessionExpiredError', {}, {
                            root: true
                        })
                    } else {
                        resolve(response)

                        commit("setNewsList", response.data.result)
                        


                        // commit('setNewsList', response.data.result)
                    }
                    console.log(response)
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        
        getAllEvent: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
           // let burl = baseurl()

            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url:baseurl()+"/user/action/event/get?LIMIT="+data.payload.limit+"&OFFSET="+data.payload.offset,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token

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
                        commit('setEventList', response.data.result)
                    }
                    console.log(response)
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        getAllFaq: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
           // let burl = baseurl()
            return new Promise((resolve, reject) => {
                let limitURL = ""
                if (data.payload.limit) {
                    limitURL = "?LIMIT="+data.payload.limit+"&OFFSET="+data.payload.offset
                }
                axios({
                    method: 'GET',
                    url:baseurl()+ "/user/action/faq/get" + limitURL,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token

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
                        commit('setFaqList', response.data.result)
                    }
                    console.log(response)
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        
        getAllAlumni: ({
            state,
            commit
        }, data) => {
           // let burl=baseurl()
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url:baseurl()+'/search/maps/userids/get',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token
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
                        // commit('appendAlumniList', response.data.result)
                        commit('setAlumniList', response.data.result)
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
                    url:baseurl()+ '/auth/forgetpassword',
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
           // let burl=baseurl()
            addTokenToPayload(data)
            console.log(data)

            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url:baseurl()+'/admin/action/documents/status?USERID='+data.payload.userid,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token
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
            //let burl=baseurl()
            console.log(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url:baseurl()+'/user/action/job/get?LIMIT='+data.payload.limit+"&OFFSET="+data.payload.offset,                    
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token
                    },
                   // data: data



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
           // let burl=baseurl()
            addTokenToPayload(data)
            console.log(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url:baseurl()+'/user/action/job/recommendation/get?LIMIT='+data.payload.limit+"&OFFSET="+data.payload.offset,//+"&USERID="+data.payload.userId,                   
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token
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
        getSearchJob: ({
            state,
            commit
        }, data) => {
           // let burl=baseurl()
            addTokenToPayload(data)
            console.log(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url:baseurl()+'/search/job?LIMIT='+data.payload.limit+'&OFFSET='+data.payload.offset+'&QUERY='+data.payload.skill+'&COUNTRY='+data.payload.country,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token
                    }
                    



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
        
       
        resetPassword: ({
            state,
            commit
        }, data) => {
            // addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url:baseurl()+ '/auth/reset/?TOKEN='+data.resettoken,
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
        
       changePassword: ({
            state,
            commit
        }, data) => {
            let tok=[]
            addTokenToPayload(tok)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url:baseurl()+ '/auth/reset',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':"Bearer " +tok.token
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
            let tok=[]
            addTokenToPayload(tok)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url:baseurl()+'/user/action/askhr/ticket/create',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + tok.token
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
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        },

        updateTicket: ({
            state,
            commit
        }, data) => {
            let tok=[]
            addTokenToPayload(tok)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url:baseurl()+'/user/action/askhr/ticket/update',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + tok.token
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
                    }
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
                    method: 'GET',
                    url:baseurl()+'/user/action/askhr/ticket/get?USERID='+data.payload.USERID,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token
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
                    resolve(response.data)
                    }
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        // getAllEsclationManagers: ({
        //     state,
        //     commit
        // }, data) => {
        //     addTokenToPayload(data)
        //     return new Promise((resolve, reject) => {
        //         axios({
        //             method: 'POST',
        //             url:baseurl()+ 'https://api.steppingcloud.com/hrroutes/getescalationmanager',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             data: data
        //         }).then((response) => {
        //             resolve(response.data)
        //         }).catch((error) => {
        //             reject(error)
        //         })
        //     })
        // },
        postQueryMessage: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url:baseurl()+ '/user/action/askhr/ticket/message/create',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token
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
                    resolve(response.data)
                    }
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        getQueryMessage: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url:baseurl()+'/user/action/askhr/ticket/message/get?TICKETID='+data.payload.TICKETID,
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + data.token
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
                    resolve(response.data)
                    }
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        addSkill: ({
            state,
            commit
        }, data) => {
            let tok=[]
            addTokenToPayload(tok)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url:baseurl()+ "/user/action/skills/create",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + tok.token
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
                    resolve(response.data)
                    }
                }).catch((error) => {
                    reject(error)
                })
            })
        },
        deleteSkill: ({
            state,
            commit
        }, data) => {
            let tok=[]
            addTokenToPayload(tok)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url:baseurl()+ "/user/action/skills/delete",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":"Bearer " + tok.token
                    },
                    data:data
                }).then((response) => {
                    if (response && response.data && response.data.status == "400" && response.data.result == "Token expired, Please Login Again") {
                        deleteExpiredToken()
                        navigateToHome()
                        commit('showSessionExpiredError', {}, {
                            root: true
                        })
                    } else {
                    resolve(response.data)
                    }
                }).catch((error) => {
                    reject(error)
                })
            })
        }
    }
}