import http from "../http-common"

class MiningService {
    getAll() {
        return http.get("/mining");
    }
}

export default new MiningService();
