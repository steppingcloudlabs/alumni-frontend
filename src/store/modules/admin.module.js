export default {
    namespaced: true,
    state: {
        alumniDialogData: {
            empId: null,
            firstName: "",
            lastName: "",
            paySlipStatus: "",
            form16Status: ""
        },
        showAlumniDialog: false,
        alumniList: [{
            empId: '1234',
            firstName: 'new delhi',
            lastName: 'integration',
            paySlipStatus: 'pending',
            form16Status: 'pending'

        }, ],
        newsDialogData: {
            headLine: "",
            body: "",
        },
        showNewsDialog: false,
        newsList: [{
                headLine: 'Where does it come from?',
                body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,'
            },
            {
                headLine: 'Where does it come from?',
                body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,'
            },
        ],

        // Events Data
        eventDialogData: {
            title: "",
            description: "",
        },
        showEventDialog: false,
        EventList: [{
                title: 'Where does it come from?',
                description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,'
            },

        ],
        //   FAQ Data

        FaqList: [{
                question: "Hello",
                answer: "world"
            }

        ],
        faqDialogData: {
            question: "",
            answer: "",
        },
        showFaqDialog: false,


    },
    mutations: {
        setAlumniList: (state, data) => {
            state.alumniList.empId = data.empId
            state.alumniList.firstName = data.firstName
            state.alumniList.lastName = data.lastName
            state.alumniList.paySlipStatus = data.paySlipStatus
            state.alumniList.form16Status = data.form16Status
        },
        addNewAlumniToList: (state, data) => {
            state.alumniList.push(data)

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
            state.newsList.headLine = data.headLine
            state.newsList.body = data.body

        },
        addNewsToList: (state, data) => {
            state.newsList.push(data)

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
            state.newsDialogData.headLine = null
            state.newsDialogData.body = ""
            state.showNewsDialog = false
        },

        // Event Section
        setEventList: (state, data) => {
            state.EventList.title = data.title
            state.EventList.description = data.description
        },
        addEventToList: (state, data) => {
            state.EventList.push(data)
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
            state.eventDialogData.description = ""
            state.showEventDialog = false
        },

        // FAQ Section

        setFaqList: (state, data) => {
            state.FaqList.question = data.question
            state.FaqList.answer = data.answer
        },
        addNewFaqToList: (state, data) => {
            state.FaqList.push(data)
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



    },
    getters: {
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

    }
}