import http from "../http-common"

class CompanyService {
    getAll() {
        return http.get("/companies");
    }

    get(id) {
        return http.get(`/companies/${id}`);
    }

    create(data) {
        return http.post("/companies", data)
    }

    update(id, data) {
        return http.put(`/companies/${id}`, data)
    }

    delete(id) {
        return http.delete(`/companies/${id}`)
    }
}

export default new CompanyService();
