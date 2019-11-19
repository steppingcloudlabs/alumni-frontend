import router from '@/router'

let addTokenToPayload = (data) => {
    data['token'] = sessionStorage.getItem('AccessToken')
}
let deleteExpiredToken = () => {
    sessionStorage.removeItem('AccessToken')
}

let navigateToHome = () => {
    router.push({
        path: '/home'
    })
}

export {
    addTokenToPayload,
    deleteExpiredToken,
    navigateToHome
}