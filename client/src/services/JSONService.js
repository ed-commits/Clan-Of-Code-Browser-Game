const baseURL = "http://localhost:3000/api"

export default {
    getGeneric(thing, name) {
        return fetch(baseURL + "/"+thing+"/" + encodeURI(name))
        .then(res => res.json())
    },
    getPage(name) {
        return this.getGeneric("pages", name)
    },
    getMonster(name) {
        return this.getGeneric("monsters", name)
    },
    getItem(name) {
        return this.getGeneric("items", name)
    }
}
