import { useState, useEffect, useRef } from "react";
import Navbar from "@components/Navbar";

import CurrencyInput from "@components/CurrencyInput";
import LoadingRing from "@components/LoadingRing";

import { showBarang, addBarang, getFotoBarang } from "@services/api/BarangAPI";

function Lelang() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [activeTab, setActiveTab] = useState("barang");
    const [activeSubTab, setActiveSubTab] = useState("semua");

    const [message, setMessage] = useState("");

    const [dataBarang, setDataBarang] = useState(null);
    const [dataFotoBarang, setDataFotoBarang] = useState(null);
    const [dataFotoBarangNew, setDataFotoBarangNew] = useState(null);
    const [loadingBarang, setLoadingBarang] = useState(true);

    useEffect(() => {
        let foto_barangs = [];
        let newFoto = [];
        showBarang(user?.id, activeSubTab).then((result) => {
            result.data.forEach((element, i) => {
                getFotoBarang(element.id_barang).then((res) => {
                    console.log(res)
                    const base64String = btoa(String.fromCharCode(...new Uint8Array(res)));
                    newFoto[i] = `data:image/png;base64,${base64String}`;
                });
            });
            console.log(result)
            foto_barangs = [newFoto];
            setDataFotoBarang(...foto_barangs);
            setDataBarang(result.data);
            setLoadingBarang(false);
        }).catch((err) => { console.log(err) })
    }, []);

    useEffect(() => {
        setDataFotoBarangNew(dataFotoBarang);
        console.log(dataFotoBarang);
    }, [dataFotoBarang]);


    const [showTambahBarang, setShowTambahBarang] = useState(false);
    const showTambahBarangRef = useRef(null);
    const [foto, setFoto] = useState("");
    const [selectedFoto, setSelectedFoto] = useState("");
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [hargaAwal, setHargaAwal] = useState("");
    const [hargaAwalF, setHargaAwalF] = useState("");
    const [sistemPenawaran, setSistemPenawaran] = useState("terbuka");
    const [showSistemOption, setShowSistemOption] = useState(false);
    const sistemOptionRef = useRef(null);
    const [enabledTambah, setEnabledTambah] = useState(false);
    const [loadingTambah, setLoadingTambah] = useState(false);
    const [errorMessageTambah, setErrorMessageTambah] = useState("");

    useEffect(() => {
        if (foto !== "" && nama !== "" && deskripsi !== "" && hargaAwal !== "" && sistemPenawaran !== "") {
            setEnabledTambah(true);
        } else {
            setEnabledTambah(false);
        }

    }, [foto, nama, deskripsi, hargaAwal, sistemPenawaran]);

    useEffect(() => {
        if (!selectedFoto) {
            setFoto(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFoto);
        setFoto(objectUrl);

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFoto])

    function handleChangeFoto(e) {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFoto(undefined);
            return;
        }

        setSelectedFoto(e.target.files[0]);
    }

    function handleChangeNama(e) {
        setNama(e.target.value)
    }

    function handleChangeHarga(e) {
        setHargaAwal(e.target.value);
        if (e.target.value) {
            setHargaAwalF(e.target.value.split(" ")[1].replaceAll(".", '').replaceAll(",", '.'));
        } else {
            setHargaAwalF(null);
        }
    }

    function handleChangeDeskripsi(e) {
        setDeskripsi(e.target.value)
    }

    function handleClickOutside(event) {
        if (sistemOptionRef.current && showSistemOption && !sistemOptionRef.current.contains(event.target)) {
            setShowSistemOption(false);
        }
        if (showTambahBarangRef.current && showTambahBarang && !showTambahBarangRef.current.contains(event.target)) {
            setShowTambahBarang(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sistemOptionRef, showSistemOption, showTambahBarangRef, showTambahBarang]);

    function handleTambah(e) {
        setLoadingTambah(true);
        addBarang(user?.id, nama, deskripsi, hargaAwalF, sistemPenawaran, selectedFoto).then((result) => {
            setLoadingTambah(false);
            if (result.success) {
                setShowTambahBarang(false);
                setErrorMessageTambah("");
                setMessage(result.message);
                setNama("");
                setDeskripsi("");
                setHargaAwal("");
                setHargaAwalF("");
                setSistemPenawaran("terbuka");
                setSelectedFoto("");
                setFoto("");
            } else {
                setErrorMessageTambah(result.message);
            }
        }).catch((err) => {
            setErrorMessageTambah(err.message);
            setLoadingTambah(false);
        });
    }

    function formatRupiah(nominal) {
        const price = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(nominal);
        return price;
    }

    return (
        <div className="flex flex-col">
            <header>
                <Navbar />
            </header>
            <main onClick={() => { console.log(dataFotoBarang) }} className="flex flex-row" style={{ margin: "50px", columnGap: "40px" }}>
                <div className="shrink-0 divide-y" style={{ minWidth: "200px" }}>
                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeTab === 'barang' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveTab('barang'); setMessage("") }}>Data Barang</div>
                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeTab === 'penawar' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveTab('penawar'); setMessage("") }}>Penawar</div>
                </div>
                <div style={{ width: "100%" }}>
                    {
                        message &&
                        <div className="bg-green-500 text-white text-center" style={{ borderRadius: "5px", padding: "6px", marginBottom: "15px" }}>{message}</div>
                    }
                    {
                        activeTab === 'barang' ?
                            <div className="flex flex-col" style={{ rowGap: "20px" }}>
                                <div className="flex flex-row justify-between items-center">
                                    <div style={{ fontSize: "20px", fontWeight: "500" }}>Data Barang Lelang</div>
                                    <div onClick={() => { setShowTambahBarang(true); setMessage("") }} className="cursor-pointer text-white bg-1-hover-2 ease-out duration-200 py-2 px-3 rounded-md">Tambah barang</div>
                                </div>
                                <div className="flex flex-row items-center border-b">
                                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeSubTab === 'semua' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveSubTab('semua') }}>Semua Barang</div>
                                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeSubTab === 'belum' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveSubTab('belum') }}>Belum dimulai</div>
                                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeSubTab === 'sedang' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveSubTab('sedang') }}>Sedang berlangsung</div>
                                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeSubTab === 'selesai' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveSubTab('selesai') }}>Selesai</div>
                                </div>
                                <div className="flex flex-col" style={{ rowGap: "20px" }}>
                                    {
                                        loadingBarang ?
                                            <div>Memuat barang...</div>
                                            :
                                            dataBarang?.length > 0 ?
                                                dataBarang?.map((item, i) => {
                                                    return (
                                                        <div key={i} className="rounded-lg divide-y" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.15)" }}>
                                                            <div className="flex flex-row p-4" style={{ columnGap: "20px" }}>
                                                                <div className="shrink-0" style={{ width: "15%" }}>
                                                                    <div style={{ backgroundImage: `url(${dataFotoBarang ? dataFotoBarang[i] : ''})`, width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}></div>
                                                                </div>
                                                                <div style={{ width: "100%" }}>
                                                                    <div style={{ fontSize: "16px", fontWeight: "500" }}>{item.nama_barang}</div>
                                                                    <div>
                                                                        Harga awal : <span className="font-medium text-1">{formatRupiah(item.harga_awal)}</span>
                                                                    </div>
                                                                    <div>
                                                                        Tawaran tertinggi : <span className="font-medium text-1">{formatRupiah(item.harga_awal)}</span>
                                                                    </div>
                                                                    <div>Penawar : </div>
                                                                    <div>Status : {item.status}</div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-row text-center divide-x" style={{ width: "100%" }}>
                                                                <div className="flex-1 p-4 cursor-pointer">Buka lelang</div>
                                                                <div className="flex-1 p-4 cursor-pointer">Edit</div>
                                                                <div className="flex-1 p-4 cursor-pointer">Hapus</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <div>Belum ada barang</div>
                                    }
                                </div>
                            </div>
                            : activeTab === 'penawar' &&
                            <div></div>
                    }
                </div>
            </main>
            {
                showTambahBarang &&
                <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center" style={{ backgroundColor: "#39393940" }}>
                    <div ref={showTambahBarangRef} className="w-9/12 bg-white mx-auto p-6 rounded-lg flex flex-col" style={{ rowGap: "20px" }}>
                        <div style={{ fontSize: "18px", fontWeight: "500" }}>Tambah Barang Lelang</div>
                        {
                            errorMessageTambah &&
                            <div className="text-sm text-red-400">{errorMessageTambah}</div>
                        }
                        <form encType="multipart/form-data" onSubmit={(e) => { e.preventDefault(); if (enabledTambah) { handleTambah() } }} className="flex flex-col" style={{ rowGap: "20px" }}>
                            <div className="flex flex-row" style={{ columnGap: "40px" }}>
                                <div className="shrink-0" style={{ width: "25%" }}>
                                    {
                                        foto ?
                                            <label className="block" style={{ backgroundImage: `url(${foto})`, width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", cursor: "pointer" }}>
                                                <input type="file" accept="image/*" onChange={handleChangeFoto} style={{ visibility: "hidden" }} />
                                            </label>
                                            :
                                            <label className="block text-white flex flex-col items-center justify-center bg-gray-300 hover:bg-gray-400 ease-out duration-200" style={{ width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover", cursor: "pointer" }}>
                                                <input type="file" accept="image/*" onChange={handleChangeFoto} style={{ visibility: "hidden" }} />
                                                Pilih foto barang
                                            </label>
                                    }
                                </div>
                                <div style={{ width: "100%" }}>
                                    <div className="mb-4 flex flex-row items-center" style={{ columnGap: "10px" }}>
                                        <label className="block shrink-0" style={{ width: "20%" }}>Nama Barang</label>
                                        <input onChange={handleChangeNama} value={nama} className="rounded-md" style={{ width: "100%", padding: "8px", border: "1px solid #393939", outline: "none" }} type="text" />
                                    </div>
                                    <div className="mb-4 flex flex-row items-center" style={{ columnGap: "10px" }}>
                                        <label className="block shrink-0" style={{ width: "20%" }}>Harga Awal</label>
                                        <CurrencyInput onChange={handleChangeHarga} value={hargaAwal} placeholder="Rp 0,00" type="text" className="rounded-md" style={{ width: "100%", padding: "8px", border: "1px solid #393939", outline: "none" }} />
                                    </div>
                                    <div className="mb-4 flex flex-row items-center" style={{ columnGap: "10px" }}>
                                        <label className="block shrink-0" style={{ width: "20%" }}>Deskripsi Barang</label>
                                        <textarea onChange={handleChangeDeskripsi} className="rounded-md" value={deskripsi} style={{ resize: "none", width: "100%", padding: "8px", border: "1px solid #393939", outline: "none" }}></textarea>
                                    </div>
                                    <div className="mb-4 flex flex-row items-center relative" style={{ columnGap: "10px" }}>
                                        <label className="block shrink-0" style={{ width: "20%" }}>Sistem Penawaran</label>
                                        <div onClick={() => { setShowSistemOption(true) }} className="rounded-md cursor-pointer" style={{ width: "100%", padding: "8px", border: "1px solid #393939", outline: "none" }}>Penawaran {sistemPenawaran}</div>
                                        {
                                            showSistemOption &&
                                            <div className="flex flex-row absolute" style={{ columnGap: "10px", top: "42px", width: "100%" }}>
                                                <div className="shrink-0" style={{ width: "20%" }}></div>
                                                <div ref={sistemOptionRef} className="bg-white shadow-md rounded-md overflow-hidden" style={{ border: "1px solid #393939", width: "100%" }}>
                                                    <div onClick={() => { setSistemPenawaran("terbuka"); setShowSistemOption(false) }} className="py-2 px-3 cursor-pointer hover:bg-slate-200 ease-out duration-200">Penawaran terbuka</div>
                                                    <div onClick={() => { setSistemPenawaran("tertutup"); setShowSistemOption(false) }} className="py-2 px-3 cursor-pointer hover:bg-slate-200 ease-out duration-200">Penawaran tertutup</div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-end">
                                <button disabled={enabledTambah && !loadingTambah ? false : true} className={`text-white ${enabledTambah && !loadingTambah ? 'bg-1-hover-2 cursor-pointer' : 'bg-slate-300'} ease-out duration-200 py-2 px-3 rounded-md flex items-center justify-center`} style={{ width: "150px" }}>
                                    {
                                        loadingTambah ?
                                            <LoadingRing width="21px" />
                                            : 'Simpan barang'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default Lelang;