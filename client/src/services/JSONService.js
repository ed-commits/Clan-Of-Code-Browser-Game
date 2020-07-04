const baseURL = "http://localhost:3000/api"

export default {
    getPages() {
        return fetch(baseURL + "/pages/")
        .then(res => res.json())
    },
    getPage(name) {
        return fetch(baseURL + "/pages/" + encodeURI(name))
        .then(res => res.json())
    },
    getMonster(name) {
        return fetch(baseURL + "/monsters/" + encodeURI(name))
        .then(res => res.json())
    }
}
