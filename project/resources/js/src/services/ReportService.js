import http from "../http-common"

class ReportService {
    getAllByMonth(data) {
        return http.post("/countries-report", data);
    }

    generateData() {
        return http.get("/generate-data");
    }
}

export default new ReportService();
