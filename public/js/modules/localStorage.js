export function setLocalStorageDate(arr = [], key = 'user') {
    localStorage.setItem(key, JSON.stringify([]))
    localStorage.setItem(key, JSON.stringify(arr))
}

export function getLocalStorageDate(key = 'user') {
    let result = JSON.parse(localStorage.getItem(key))
    if (result === null) {
        setLocalStorageDate([], key)
        result = []
    }
    return result
}