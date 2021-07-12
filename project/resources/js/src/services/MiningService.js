import http from "../http-common"

class MiningService {
    getAll() {
        return http.get("/mining");
    }

    get(id) {
        return http.get(`/mining/${id}`);
    }

    create(data) {
        return http.post("/mining", data)
    }

    update(id, data) {
        return http.put(`/mining/${id}`, data)
    }

    delete(id) {
        return http.delete(`/mining/${id}`)
    }
}

export default new MiningService();
