import { useState, useEffect } from "react";
import Navbar from "@components/Navbar";

import InputGroup from "@components/InputGroup";

function Lelang() {
    const [activeTab, setActiveTab] = useState("barang");
    const [activeSubTab, setActiveSubTab] = useState("semua");

    const [showTambahBarang, setShowTambahBarang] = useState(false);
    const [foto, setFoto] = useState("");
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [hargaAwal, setHargaAwal] = useState("");
    const [tglBuka, setTglBuka] = useState("");
    const [tglTutup, setTglTutup] = useState("");
    const [sistemPenawaran, setSistemPenawaran] = useState("");
    const [enabledTambah, setEnabledTambah] = useState(false);

    useEffect(() => {
        if (foto !== "" && nama !== "" && deskripsi !== "" && hargaAwal !== "" && tglBuka !== "" && tglTutup !== "" && sistemPenawaran !== "") {
            setEnabledTambah(true);
        } else {
            setEnabledTambah(false);
        }
    }, [foto, nama, deskripsi, hargaAwal, tglBuka, tglTutup, sistemPenawaran]);

    function handleChangeNama(e) {
        setNama(e.target.value)
    }

    return (
        <div className="flex flex-col">
            <header>
                <Navbar />
            </header>
            <main className="flex flex-row" style={{ margin: "50px", columnGap: "40px" }}>
                <div className="shrink-0 divide-y" style={{ minWidth: "200px" }}>
                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeTab === 'barang' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveTab('barang') }}>Data Barang</div>
                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeTab === 'penawar' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveTab('penawar') }}>Penawar</div>
                </div>
                <div style={{ width: "100%" }}>
                    {
                        activeTab === 'barang' ?
                            <div className="flex flex-col" style={{ rowGap: "20px" }}>
                                <div className="flex flex-row justify-between items-center">
                                    <div style={{ fontSize: "20px", fontWeight: "500" }}>Data Barang Lelang</div>
                                    <div onClick={() => { setShowTambahBarang(true) }} className="cursor-pointer text-white bg-1-hover-2 ease-out duration-200 py-2 px-3 rounded-md">Tambah barang</div>
                                </div>
                                <div className="flex flex-row items-center border-b">
                                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeSubTab === 'semua' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveSubTab('semua') }}>Semua Barang</div>
                                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeSubTab === 'belum' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveSubTab('belum') }}>Belum dimulai</div>
                                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeSubTab === 'sedang' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveSubTab('sedang') }}>Sedang berlangsung</div>
                                    <div className={`px-3 py-2 ease-out duration-200 cursor-pointer ${activeSubTab === 'selesai' ? 'bg-1 text-white' : 'hover:bg-slate-200'}`} onClick={() => { setActiveSubTab('selesai') }}>Selesai</div>
                                </div>
                                <div>
                                    <div>Belum ada barang</div>
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
                    <div className="w-9/12 bg-white mx-auto p-6 rounded-lg flex flex-col" style={{ rowGap: "20px" }}>
                        <div style={{ fontSize: "18px", fontWeight: "500" }}>Tambah Barang Lelang</div>
                        <form encType="multipart/form-data" onSubmit={(e) => { e.preventDefault(); if (enabledTambah) { handleTambah() } }} className="flex flex-col" style={{ rowGap: "20px" }}>
                            <div className="flex flex-row" style={{ columnGap: "40px" }}>
                                <div style={{ width: "30%" }}>
                                    {
                                        foto ?
                                            <div style={{ backgroundImage: `url(${foto})`, width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}></div>
                                            :
                                            <div style={{ backgroundColor: "lightgray", width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}></div>
                                    }
                                </div>
                                <div style={{ width: "100%" }}>
                                    <div className="mb-4 flex flex-row items-start" style={{ columnGap: "10px" }}>
                                        <label className="block shrink-0" style={{ width: "20%" }}>Nama Barang</label>
                                        <input onChange={handleChangeNama} value={nama} className="rounded-md" style={{ width: "100%", padding: "8px", border: "1px solid #393939", outline: "none" }} type="text" />
                                    </div>
                                    <div className="mb-4 flex flex-row items-start" style={{ columnGap: "10px" }}>
                                        <label className="block shrink-0" style={{ width: "20%" }}>Harga Awal</label>
                                        <input onChange={handleChangeNama} value={hargaAwal} className="rounded-md" style={{ width: "100%", padding: "8px", border: "1px solid #393939", outline: "none" }} type="text" />
                                    </div>
                                    <div className="mb-4 flex flex-row items-start" style={{ columnGap: "10px" }}>
                                        <label className="block shrink-0" style={{ width: "20%" }}>Tanggal Buka Lelang</label>
                                        <input onChange={handleChangeNama} value={tglBuka} className="rounded-md" style={{ width: "100%", padding: "8px", border: "1px solid #393939", outline: "none" }} type="date" />
                                    </div>
                                    <div className="mb-4 flex flex-row items-start" style={{ columnGap: "10px" }}>
                                        <label className="block shrink-0" style={{ width: "20%" }}>Tanggal Tutup Lelang</label>
                                        <input onChange={handleChangeNama} value={tglBuka} className="rounded-md" style={{ width: "100%", padding: "8px", border: "1px solid #393939", outline: "none" }} type="date" />
                                    </div>
                                    <div className="mb-4 flex flex-row items-start" style={{ columnGap: "10px" }}>
                                        <label className="block shrink-0" style={{ width: "20%" }}>Deskripsi Barang</label>
                                        <textarea onChange={handleChangeNama} className="rounded-md" value={deskripsi} style={{ width: "100%", padding: "8px", border: "1px solid #393939", outline: "none" }}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-end">
                                <button disabled={enabledTambah ? false : true} className={`text-white ${enabledTambah ? 'bg-1-hover-2 cursor-pointer' : 'bg-slate-300'} ease-out duration-200 py-2 px-3 rounded-md`}>Simpan barang</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default Lelang;