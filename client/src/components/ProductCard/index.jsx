import Logo from "@assets/logo.png";
import { Link } from "react-router-dom";

function ProductCard({ nama, harga, foto, lokasi, }) {
    return (
        <Link className="flex flex-col" style={{ width: "100%", color: "#393939", display: "block", boxShadow: "0 0 5px rgba(0,0,0,0.15)", margin: "5px", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ backgroundImage: `url(${Logo})`, width: "100%", aspectRatio: "1/1" }}></div>
            <div className="p-4 bg-white flex flex-col" style={{ rowGap: "10px" }}>
                <div style={{ fontSize: "14px" }}>Nama barang</div>
                <div style={{ fontSize: "14px", fontWeight: "400" }}>
                    <div>Harga awal</div>
                    <div>Penawar : 0</div>
                </div>
                <div style={{ fontSize: "14px" }}>Lokasi</div>
            </div>
        </Link>
    )
}

export default ProductCard;