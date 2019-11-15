let addTokenToPayload = (data) => {
    data['token'] = sessionStorage.getItem('AccessToken')
}

export {
    addTokenToPayload
}