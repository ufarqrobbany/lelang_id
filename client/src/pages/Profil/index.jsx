import { useState, useEffect } from "react";
import Navbar from "@components/Navbar";
import { Submit } from "./style";
import Banner1 from "@assets/1.png";

import axios from "axios";

import InputGroup from "@components/InputGroup";

import { editUser, getFoto } from "@services/api/MasyarakatAPI";

function Profil() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [namaLengkap, setNamaLengkap] = useState(user?.nama_lengkap);
    const username = user?.username;
    const email = user?.email;
    const telp = user?.telp;
    const [gender, setGender] = useState(user?.gender);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState(user?.foto === "" ? null : `http://localhost:8080/public/uploads/${user?.foto}`);

    function handleChangeNamaLengkap(e) {
        setNamaLengkap(e.target.value);
    }

    useEffect(() => {
        getFoto(user?.id).then((result) => {
            let reader = new window.FileReader();
            reader.readAsDataURL(response.data);
            reader.onload = function () {
                let imageDataUrl = reader.result;
                setPreview(imageDataUrl)
            }
        });
    }, [])

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    function onSelectFile(e) {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
        console.log(selectedFile);
    }

    function handleSimpan() {
        editUser(user?.id, namaLengkap, gender, selectedFile).then((result) => {
            console.log(result);
            localStorage.setItem("user", JSON.stringify(result.data));
            getFoto(user?.id).then((result) => {
                console.log(result);
                setPreview(result);
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="flex flex-col">
            <header>
                <Navbar />
            </header>
            <form encType="multipart/form-data" onSubmit={(e) => { e.preventDefault(); if (namaLengkap && selectedFile) { handleSimpan() } }} className="flex flex-col" style={{ margin: "50px", rowGap: "20px" }}>
                <div style={{ fontSize: "28px", fontWeight: "500" }}>Profil</div>
                <div className="flex flex-row" style={{ columnGap: "40px" }}>
                    <div className="flex flex-col shrink-0" style={{ width: "30%", rowGap: "20px" }}>
                        {
                            preview ?
                                <div style={{ backgroundImage: `url(${preview})`, width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}></div>
                                : user?.foto ?
                                    <div style={{ backgroundImage: `url(${user?.foto})`, width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}></div>
                                    :
                                    <div style={{ backgroundColor: "lightgray", width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}></div>
                        }
                        <div><input type="file" className="custom-file-input text-start" accept="image/*" style={{ width: "100%" }} onChange={onSelectFile} /></div>
                    </div>
                    <div style={{ width: "70%" }}>
                        <InputGroup width="100%" label="Nama Lengkap" name="nama_lengkap" type="text" handleChange={handleChangeNamaLengkap} value={namaLengkap} />
                        <InputGroup width="100%" label="Username" name="username" type="text" disabled={true} value={username} />
                        <InputGroup width="100%" label="Email" name="email" type="text" disabled={true} value={email} />
                        <InputGroup width="100%" label="No HP" name="telp" type="text" disabled={true} value={telp} />
                        <div className="mb-4">
                            <label className="block ml-1 mb-2 text-sm">Jenis Kelamin</label>
                            <div className="flex flex-row" style={{ columnGap: "20px" }}>
                                <label>
                                    <input type="radio" onClick={(e) => { setGender(e.target.value) }} checked={gender === 'L' ? true : false} value="L" name="gender" /> Laki-laki
                                </label>
                                <label>
                                    <input type="radio" onClick={(e) => { setGender(e.target.value) }} checked={gender === 'P' ? true : false} value="P" name="gender" /> Perempuan
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div><Submit disabled={namaLengkap && selectedFile ? false : true} className={`${namaLengkap && selectedFile ? 'bg-1-hover-2' : 'bg-gray-300'} ease-out duration-300`}>Simpan</Submit></div>
            </form>
        </div >
    )
}

export default Profil;