import router from '@/router'

let addTokenToPayload = (data) => {
    data['token'] = sessionStorage.getItem('AccessToken')
}
let deleteExpiredToken = () => {
    sessionStorage.removeItem('AccessToken')
    sessionStorage.removeItem('UserId')
}

let navigateToHome = () => {
    router.push({
        path: '/home'
    })
}

let getAlumniId = () => {
    return sessionStorage.getItem('UserId')
}

export {
    addTokenToPayload,
    deleteExpiredToken,
    navigateToHome,
    getAlumniId
}