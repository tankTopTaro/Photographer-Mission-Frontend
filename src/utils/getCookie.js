export const getCookie = (name) => {
    const cookie = document.cookie.split('; ').find(item => item.startsWith(`${name}`))

    if (!cookie) {
        return null
    }

    return decodeURIComponent(cookie.split('=')[1])
}