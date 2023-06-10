// import axios from "axios";
import axios from "./CustommizeAxios"

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const postCreateUser = ( name, job ) => {
    return axios.post("/api/users", { name, job }); // name: name, job: job
}

export { fetchAllUser, postCreateUser }; // export {} for export alot obj