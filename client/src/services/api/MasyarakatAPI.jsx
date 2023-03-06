import axios from "axios";

let config = {
    header: {
        'Content-Type': 'application/json'
    }
}

export const checkEmail = async (email) => {
    const res = await axios.get(`http://localhost:8080/masyarakat/check_email/?email=${email}`, config);
    return res.data;
}