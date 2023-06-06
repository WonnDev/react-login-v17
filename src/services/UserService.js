// import axios from "axios";
import axios from "./CustommizeAxios"

const fetchAllUser = () => {
    return axios.get("/api/users?page=1");
}

export { fetchAllUser }; // export {} for export alot obj