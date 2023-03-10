import axios from "axios";

const config = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8; multipart/form-data;',
    },
};

export const showBarang = async (id_user, status_barang) => {
    const res = await axios.get(`http://localhost:8080/barang/?id=${id_user}&status=${status_barang}`, config);
    return res.data;
}

export const addBarang = async (id, nama, deskripsi, harga_awal, sistem, foto) => {
    const res = await axios.post(`http://localhost:8080/barang/add/`, {
        id: id,
        nama: nama,
        deskripsi: deskripsi,
        harga_awal: harga_awal,
        sistem: sistem,
        foto: foto,
    }, config);
    return res.data;
}

export const getFotoBarang = async (id) => {
    const res = await axios.get(`http://localhost:8080/barang/foto/?id=${id}`, {
        responseType: 'arraybuffer'
    });
    return res.data;
}