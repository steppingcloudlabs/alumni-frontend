import axios from "axios";
import {
    addTokenToPayload,
    deleteExpiredToken,
    navigateToHome
} from '@/utils/utils'

export default {
    namespaced: true,
    state: {
        showQueryDialog: false,
        queryDialogData: {},
        showEmailDialog: false,
        emailDialogData: {},
        level: "",
        level1Email: [{

            },
            {
                levelOrder: 2,
                email: "Abid@steppingcloud",
                name: "daraksha"
            },
            {
                levelOrder: 3,
                email: "darak@steppingcloud",
                name: "daraksha"
            }
        ],
        level2Email: {},
        level3Email: {},

        alumniDialogData: {

        },
        showAlumniDialog: false,
        alumniList: [],
        newsDialogData: {
            title: "",
            content: "",
        },
        alumniDialogOpenFrom:"",
        showNewsProgress: false,
        showEventsProgress: false,
        showNewsDialog: false,
        newsList: [],

        // Events Data
        eventDialogData: {
            title: "",
            content: "",
        },
        showEventDialog: false,
        EventList: [

        ],
        //   FAQ Data

        FaqList: [],
        FaqDialogData: {
            question: "",
            answer: "",
        },
        showFaqDialog: false,
        showDocumentDialog: false,
    },
    mutations: {

        setShowQueryDialog: (state, data) => {
            state.showQueryDialog = data
        },
        setShowQueryDialogData: (state, data) => {
            state.queryDialogData = data
        },
        showQueryDialog: (state, data) => {
            state.showQueryDialog = true
            state.queryDialogData = data
        },

        closeQueryDialog: (state, data) => {
            state.showQueryDialog = false
        },

        setShowEmailDialog: (state, data) => {
            state.showEmailDialog = data
        },
        setEmailDialogData: (state, data) => {
            state.emailDialogData = data
        },
        showEmailDialog: (state, data) => {
            state.showEmailDialog = true
            state.emailDialogData = data

        },
        showEmailDialog1: (state, data) => {
            state.showEmailDialog = true
            state.level = data

        },
        closeEmailDialog: (state, data) => {
            state.showEmailDialog = false
        },

        setEmailList: (state, data) => {
            state.level1Email = data
        },
        addNewEmailToList: (state, data) => {
            state.level1Email[state.level - 1] = JSON.parse(JSON.stringify(data))
            state.level1Email[state.level - 1].levelOrder = state.level
            state.level1Email = JSON.parse(JSON.stringify(state.level1Email))
            console.log(state.level1Email)

        },
        deleteSelectedEmail: (state, data) => {
            let index = state.level1Email.indexOf(data)
            if (index > -1) {
                state.level1Email.splice(index, 1)

            }
            console.log(state.level1Email)
        },


        setAlumniList: (state, data) => {
            state.alumniList = data
        },

        appendAlumniList: (state, data) => {
            state.alumniList = state.alumniList.concat(data)
        },

        addNewAlumniToList: (state, data) => {
            state.alumniList.unshift(data)

        },
        showAlumniDialog: (state, data) => {
            state.alumniDialogData = data
            state.showAlumniDialog = true
           
        },
        setShowAlumniDialog: (state, data) => {
            state.showAlumniDialog = data
        },
        setShowAlumniDialogData: (state, data) => {
            state.alumniDialogData = data
        },
        closeAlumniDialog: (state, data) => {
            state.alumniDialogData.empId = null
            state.alumniDialogData.firstName = ""
            state.alumniDialogData.lastName = " "
            state.alumniDialogData.paySlipStatus = ""
            state.alumniDialogData.form16Status = ""
            state.showAlumniDialog = false
        },

        // NEWS SECTION

        setNewsList: (state, data) => {
            state.newsList = data
        },
        appendNewsList: (state, data) => {
            state.newsList = state.newsList.concat(data)
        },
        addNewsToList: (state, data) => {
            state.newsList.unshift(data)
        },

        showNewsDialog: (state, data) => {
            state.newsDialogData = data
            state.showNewsDialog = true
        },
        setShowNewsDialog: (state, data) => {
            state.showNewsDialog = data
        },
        setShowNewsDialogData: (state, data) => {
            state.newsDialogData = data
        },
        closeNewsDialog: (state, data) => {
            state.newsDialogData.title = " "
            state.newsDialogData.content = " "
            state.showNewsDialog = false
        },
        deleteSelectedNews: (state, data) => {
            let index = state.newsList.indexOf(data)
            if (index > -1) {
                state.newsList.splice(index, 1)

            }
            console.log(state.newsList)
        },
        //Document Section

        showDocumentDialog: (state, data) => {

            state.showDocumentDialog = true
        },
        closeDocumentDialog: (state, data) => {

            state.showNewsDialog = false
        },

        // Event Section
        setEventList: (state, data) => {
            state.EventList = data
            console.log(EventList)

        },
        appendEventList: (state, data) => {
            state.EventList = state.EventList.concat(data)
        },
        addEventToList: (state, data) => {
            state.EventList.unshift(data)
        },


        showEventDialog: (state, data) => {
            state.eventDialogData = data
            state.showEventDialog = true
        },
        setShowEventDialog: (state, data) => {
            state.showEventDialog = data
        },
        setShowEventDialogData: (state, data) => {
            state.eventDialogData = data
        },
        closeEventDialog: (state, data) => {
            state.eventDialogData.title = null
            state.eventDialogData.content = ""
            state.showEventDialog = false
        },
        deleteSelectedEvents: (state, data) => {
            let index = state.EventList.indexOf(data)
            if (index > -1) {
                state.EventList.splice(index, 1)

            }
            console.log(state.EventList)
        },

        deleteSelectedAlumni: (state, data) => {
            let index = state.alumniList.indexOf(data)
            if (index > -1) {
                state.alumniList.splice(index, 1)

            }

            console.log(state.alumniList)
        },

        // FAQ Section
        deleteSelectedFaq: (state, data) => {
            let index = state.FaqList.indexOf(data)
            if (index > -1) {
                state.FaqList.splice(index, 1)

            }

            console.log(state.FaqList)
        },


        setFaqList: (state, data) => {
            state.FaqList = data
        },
        addNewFaqToList: (state, data) => {
            state.FaqList.unshift(data)
        },
        showFaqDialog: (state, data) => {
            state.FaqDialogData = data
            state.showFaqDialog = true
        },
        setShowFaqDialog: (state, data) => {
            state.showFaqDialog = data
        },
        setShowFaqDialogData: (state, data) => {
            state.FaqDialogData = data
        },
        closeFaqDialog: (state, data) => {
            state.FaqDialogData.question = null
            state.FaqDialogData.answer = ""
            state.showFaqDialog = false
        },
        setNewsProgress: (state, data) => {
            state.showNewsProgress = data;
        },
        showNewsProgress: (state, data) => {
            state.showNewsProgress = true;
        },
        closeNewsProgress: (state, data) => {
            state.showNewsProgress = false;
        },
        setEventsProgress: (state, data) => {
            state.showEventsProgress = data;
        },
        showEventsProgress: (state, data) => {
            state.showEventsProgress = true;
        },
        closeEventsProgress: (state, data) => {
            state.showEventsProgress = false;
        },




    },
    getters: {
        getShowQueryDialog: (state) => {
            return state.showQueryDialog
        },
        getQueryDialogData: (state) => {
            return state.queryDialogData
        },
        getshowEmailDialog: (state) => {
            return state.showEmailDialog
        },

        getEmailDialogData: (state) => {
            return state.emailDialogData
        },

        getNewsProgress: (state, data) => {
            return state.showNewsProgress
        },
        getEventsProgress: (state, data) => {
            return state.showEventsProgress
        },
        getAlumniDialogData: (state) => {
            return state.alumniDialogData
        },
        getshowAlumniDialog: (state) => {
            return state.showAlumniDialog
        },
        getAlumniList: (state) => {
            return state.alumniList
        },
        // NEWS SECTION
        getNewsDialogData: (state) => {
            return state.newsDialogData
        },
        getshowNewsDialog: (state) => {
            return state.showNewsDialog
        },
        getNewsList: (state) => {
            return state.newsList
        },

        getEmailList: (state, data) => {

            return state.level1Email
        },

        // Event Section
        getEventDialogData: (state) => {
            return state.eventDialogData
        },
        getshowEventDialog: (state) => {
            return state.showEventDialog
        },
        getEventList: (state) => {
            return state.EventList
        },
        // FAQ Section
        getFaqDialogData: (state) => {
            return state.FaqDialogData
        },
        getShowFaqDialog: (state) => {
            return state.showFaqDialog
        },
        getFaqList: (state) => {
            return state.FaqList
        },


    },
    actions: {
        addNews: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/updatenews',
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
        getAllNews: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)

            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/allnews',
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

                        commit("setNewsList", response.data.result)


                        // commit('setNewsList', response.data.result)
                    }
                    console.log(response)
                }).catch((error) => {
                    reject(error)
                })

            })
        },

        getMoreNews: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            let test = data.skip
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/allnews',
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
                        commit('appendNewsList', response.data.result)



                        // commit('setNewsList', response.data.result)
                    }
                    console.log(response)
                }).catch((error) => {
                    reject(error)
                })

            })
        },


        deleteNews: ({
            state,
            commit,
            dispatch
        }, data) => {
            let payload = {
                id: data._id
            }
            addTokenToPayload(data)
            let token = data['token']
            return new Promise((resolve, reject) => {
                axios({
                    method: 'DELETE',
                    url: 'http://18.190.14.5:4000/admin/action/deletenews',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        payload,
                        token
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
                        dispatch("getAllNews", {
                            payload: {}
                        })
                        console.log(response)
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        },


        addEvents: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                console.log("event data", data)
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/updateevent',
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

        getAllEvent: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)


            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/allevent',
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
                        commit('setEventList', response.data.result)
                    }
                    console.log(response)
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        getMoreEvent: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)


            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/allevent',
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
                        commit('appendEventList', response.data.result)
                    }
                    console.log(response)
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        deleteEvents: ({
            state,
            commit,
            dispatch
        }, data) => {
            let payload = {
                id: data._id
            }
            addTokenToPayload(data)
            let token = data['token']
            return new Promise((resolve, reject) => {
                axios({
                    method: 'DELETE',
                    url: 'http://18.190.14.5:4000/admin/action/deleteevent',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        payload,
                        token
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
                        dispatch("getAllEvent", {
                            payload: {}
                        })
                        console.log(response)
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        deleteAlumni: ({
            state,
            commit,
            dispatch
        }, data) => {
            let payload = {
                userid: data.user_id
            }
            addTokenToPayload(data)
            let token = data['token']
            return new Promise((resolve, reject) => {
                axios({
                    method: 'DELETE',
                    url: 'http://18.190.14.5:4000/admin/action/deletealumni',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        payload,
                        token
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
                        dispatch("getAllAlumni", {
                            payload: {}
                        })
                        console.log(response)
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        addAlumni: ({
            state,
            commit
        }, data) => {

            addTokenToPayload(data)

            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/alumni',
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
        getAllAlumni: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/allalumni',
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
                        // commit('appendAlumniList', response.data.result)
                        commit('setAlumniList', response.data.result)
                        console.log(response)
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        getMoreAlumni: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/allalumni',
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
                        commit('appendAlumniList', response.data.result)
                        // commit('setAlumniList', response.data.result)
                        console.log(response)
                    }
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
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/allfaq',
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
                        commit('setFaqList', response.data.result)
                    }
                    console.log(response)
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        addFaq: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/admin/action/updatefaq',
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
        deleteFaq: ({
            state,
            commit,
            dispatch
        }, data) => {
            let payload = {
                id: data._id
            }
            addTokenToPayload(data)
            let token = data['token']
            return new Promise((resolve, reject) => {
                axios({
                    method: 'DELETE',
                    url: 'http://18.190.14.5:4000/admin/action/deletefaq',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        payload,
                        token
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
                        dispatch("getAllFaq", {
                            payload: {}
                        })
                        console.log(response)
                    }
                }).catch((error) => {
                    reject(error)
                })

            })
        },
        uploadDocument: ({
            state,
            commit
        }, data) => {
            addTokenToPayload(data)
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: 'http://18.190.14.5:4000/awsadmin/documentupload',
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
        getMoreData: ({
            state,
            commit,
            dispatch
        }, data) => {
            return new Promise((resolve, reject) => {
                dispatch(data.actionToCall, {
                    payload: {
                        skip: data.skip,
                        limit: data.limit,
                        commitToCall: data.commitToCall
                    }
                }).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })

            })
        },




    }
}