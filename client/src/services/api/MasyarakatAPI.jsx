import axios from "axios";

const config = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
};

export const checkEmail = async (email) => {
    const res = await axios.get(`http://localhost:8080/masyarakat/check/?email=${email}`, config);
    return res.data;
}

export const createUser = async (nama_lengkap, username, password, email, telp, jk) => {
    const res = await axios.post(`http://localhost:8080/masyarakat/create/`, {
        nama_lengkap: nama_lengkap,
        username: username,
        password: password,
        email: email,
        telp: telp,
        jk: jk,
        foto: 'asas'
    }, config);
    return res.data;
}

export const login = async (username, password) => {
    const res = await axios.get(`http://localhost:8080/masyarakat/login/?username=${username}&password=${password}`, config);
    return res.data;
}