// import axios from "axios";
import axios from "./CustommizeAxios"

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

export { fetchAllUser }; // export {} for export alot obj