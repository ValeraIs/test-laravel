import http from "../http-common"

class CountryService {
    getAll() {
        return http.get("/countries");
    }

    get(id) {
        return http.get(`/countries/${id}`);
    }

    create(data) {
        return http.post("/countries", data)
    }

    update(id, data) {
        return http.put(`/countries/${id}`, data)
    }

    delete(id) {
        return http.delete(`/countries/${id}`)
    }
}

export default new CountryService();
