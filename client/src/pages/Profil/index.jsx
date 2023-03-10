import { useState, useEffect } from "react";
import Navbar from "@components/Navbar";
import { Submit } from "./style";

import InputGroup from "@components/InputGroup";

import { editUser, getFoto } from "@services/api/MasyarakatAPI";
import LoadingRing from "@components/LoadingRing";

function Profil() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const [activeTab, setActiveTab] = useState("profil");

    const [namaLengkap, setNamaLengkap] = useState(user?.nama_lengkap);
    const username = user?.username;
    const email = user?.email;
    const telp = user?.telp;
    const [gender, setGender] = useState(user?.gender);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState(user?.foto === "" ? null : user?.foto);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function handleChangeNamaLengkap(e) {
        setNamaLengkap(e.target.value);
    }

    useEffect(() => {
        getFoto(user?.id).then((result) => {
            const base64String = btoa(String.fromCharCode(...new Uint8Array(result)));
            console.log(base64String);
            setPreview(`data:image/png;base64,${base64String}`);
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
        setLoadingEdit(true);
        editUser(user?.id, namaLengkap, gender, selectedFile).then((result) => {
            if (result.success === true) {
                getFoto(user?.id).then((res) => {
                    const base64String = btoa(String.fromCharCode(...new Uint8Array(res)));
                    setPreview(`data:image/png;base64,${base64String}`);
                    setLoadingEdit(false);
                    setMessage("Update profil berhasil");

                    localStorage.setItem("user", JSON.stringify(result.data));
                    setUser(JSON.parse(localStorage.getItem("user")));
                    setNamaLengkap(result.data.nama_lengkap);
                    console.log(result);
                }).catch(err => { setErrorMessage(err.message); setLoadingEdit(false); });
            } else {
                setErrorMessage(result.message);
                setLoadingEdit(false);
            }
        }).catch((err) => {
            console.log(err);
            setErrorMessage(result.message);
            setLoadingEdit(false);
        });
    }

    return (
        <div className="flex flex-col">
            <header>
                <Navbar />
            </header>
            <main className="flex flex-row" style={{ margin: "50px", columnGap: "40px" }}>
                <div className="shrink-0 divide-y" style={{ minWidth: "200px" }}>
                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeTab === 'profil' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveTab('profil') }}>Profil</div>
                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeTab === 'alamat' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveTab('alamat') }}>Alamat</div>
                </div>
                <div style={{ width: "100%" }}>
                    {
                        activeTab === 'profil' ?
                            <form encType="multipart/form-data" onSubmit={(e) => { e.preventDefault(); if (namaLengkap && preview) { handleSimpan() } }} className="flex flex-col" style={{ rowGap: "20px" }}>
                                {
                                    message ?
                                        <div className="bg-green-500 text-white text-center" style={{ borderRadius: "5px", padding: "6px" }}>{message}</div>
                                        : errorMessage &&
                                        <div className="bg-red-500 text-white text-center" style={{ borderRadius: "5px", padding: "6px" }}>{errorMessage}</div>
                                }
                                <div style={{ fontSize: "20px", fontWeight: "500" }}>Profil</div>
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
                                <div>
                                    <Submit disabled={namaLengkap && preview && !loadingEdit ? false : true} className={`${namaLengkap && preview && !loadingEdit ? 'bg-1-hover-2' : 'bg-gray-300'} ease-out duration-300 flex items-center justify-center`}>
                                        {
                                            loadingEdit ?
                                                <LoadingRing width="24px" />
                                                : 'Simpan'
                                        }
                                    </Submit>
                                </div>
                            </form>
                            : activeTab === 'alamat' &&
                            <form encType="multipart/form-data" onSubmit={(e) => { e.preventDefault(); if (namaLengkap && preview) { handleSimpan() } }} className="flex flex-col" style={{ rowGap: "20px" }}>
                                {
                                    message ?
                                        <div className="bg-green-500 text-white text-center" style={{ borderRadius: "5px", padding: "6px" }}>{message}</div>
                                        : errorMessage &&
                                        <div className="bg-red-500 text-white text-center" style={{ borderRadius: "5px", padding: "6px" }}>{errorMessage}</div>
                                }
                                <div style={{ fontSize: "28px", fontWeight: "500" }}>Alamat</div>
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
                                <div>
                                    <Submit disabled={namaLengkap && preview && !loadingEdit ? false : true} className={`${namaLengkap && preview && !loadingEdit ? 'bg-1-hover-2' : 'bg-gray-300'} ease-out duration-300 flex items-center justify-center`}>
                                        {
                                            loadingEdit ?
                                                <LoadingRing width="24px" />
                                                : 'Simpan'
                                        }
                                    </Submit>
                                </div>
                            </form>
                    }
                </div>
            </main>
        </div>
    )
}

export default Profil;