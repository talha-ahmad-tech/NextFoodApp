export const getQueryParam = (key) => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const value = urlParams.get(key)
    return value
}

export const setQueryParams = (key, value) => {
    var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + `?${key}=${value}`
    window.history.pushState({ path: newurl }, '', newurl)
}

export const deleteQueryParams = (key) => {
    let queryString = window.location.search
    let urlParams = new URLSearchParams(queryString)
    urlParams.delete(key)
    var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + `?${urlParams}`
    window.history.pushState({ path: newurl }, '', newurl)
}