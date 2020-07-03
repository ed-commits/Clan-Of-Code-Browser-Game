const baseURL = "http://localhost:3000/api"

export default {
    getPages() {
        return fetch(baseURL + "/pages/")
        .then(res => res.json())
    }
}
