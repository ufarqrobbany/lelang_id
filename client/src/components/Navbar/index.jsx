import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Logo from "@assets/logo.png";

import styled from "styled-components";
import SearchBar from "@components/SearchBar";

const DropdownMenu = styled.div`
    position: absolute;
    right: 0;
    width: 140px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
    overflow: hidden;
`;

const DropdownItem = styled.div`
    padding: 8px 12px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background-color: rgba(0,0,0,0.15);
    }
`;

const ButtonDaftar = styled(Link)`
    padding: 10px 16px;
    color: white;
    background-color: #a78bfa;
    border: 1px solid white;
    border-radius: 5px;
    &:hover {
        color: #a78bfa;
        background-color: white;
        border: 1px solid #a78bfa;
    }
`;

const DropdownDivider = styled.div`
    height: 1px;
    width: 100%;
    background-color: rgba(0,0,0,0.15);
`;

function Navbar() {
    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdown = useRef(null);

    function handleClickOutside(event) {
        if (dropdown.current && showDropdown && !dropdown.current.contains(event.target)) {
            setShowDropdown(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdown, showDropdown]);

    return (
        <nav className="flex flex-row w-screen mx-auto px-12 py-3 items-center justify-between" style={{ boxShadow: "0 0 14px rgba(0,0,0,0.15)", backgroundColor: "white", zIndex: "10", columnGap: "40px" }}>
            <img src={Logo} alt="" onClick={() => { navigate("/", { replace: true }) }} style={{ height: "50px", cursor: "pointer" }} className="rounded-full shrink-0" />
            <ul className="flex flex-row shrink-0" style={{ columnGap: "20px" }}>
                <li><Link>Cara Ikut Lelang</Link></li>
                <li><Link>Cara Jual</Link></li>
            </ul>
            <div style={{ width: "100%" }}>
                <SearchBar />
            </div>
            {
                loggedIn ?
                    <div ref={dropdown} onClick={() => { setShowDropdown(true) }} style={{ position: "relative" }} className="shrink-0">
                        <FaUserCircle className="text-1" style={{ height: "40px", width: "40px", cursor: "pointer" }} />
                        {
                            showDropdown &&
                            <DropdownMenu style={{ fontSize: "14px" }}>
                                <DropdownItem onClick={() => { navigate("/profil", { replace: true }) }}>Profil</DropdownItem>
                                <DropdownItem>Pesanan</DropdownItem>
                                <DropdownDivider />
                                <DropdownItem onClick={() => {
                                    localStorage.removeItem("isLoggedIn");
                                    localStorage.removeItem("user");
                                    navigate("/login", { replace: true })
                                }}>Keluar</DropdownItem>
                            </DropdownMenu>
                        }
                    </div>
                    :
                    <div className="flex flex-row items-center" style={{ columnGap: "30px" }}>
                        <Link to="/login">Masuk</Link>
                        <ButtonDaftar to="/register">Daftar</ButtonDaftar>
                    </div>
            }
        </nav>
    )
}

export default Navbar;