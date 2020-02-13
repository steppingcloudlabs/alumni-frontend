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
    }).catch(err => {})
}

let getAlumniId = () => {
    return sessionStorage.getItem('UserId')
}
let getObjectId = () => {
    return sessionStorage.getItem('ObjectId')
}

export {
    addTokenToPayload,
    deleteExpiredToken,
    navigateToHome,
    getAlumniId,
    getObjectId
}