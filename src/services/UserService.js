// import axios from "axios";
import axios from "./CustommizeAxios"

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const postCreateUser = ( name, job ) => {
    return axios.post("/api/users/", { name, job }); // name: name, job: job
}

const putUpdateUser = (name, job) => {
    return axios.put("/api/users/",{ name, job });
}

const deleteUser = (id) => {
    return axios({
        method: "DELETE",
        url: `api/user/${id}`
    });
    // return axios.delete(`api/user/${id}`);
}

//login
const loginApi = (email, password) => {
    return axios.post("/api/login", {email, password});
}

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi }; // export {} for export alot obj