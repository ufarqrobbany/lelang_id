import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input, Submit } from "./style";
import Logo from "@assets/logo.png";
import Banner from "@assets/banner.png";

import LoadingRing from "@components/LoadingRing";

import { checkEmail } from "@services/api/MasyarakatAPI";

const InputGroup = ({ label, name, type, value, handleChange, valueToggle, handleToggle, disabled }) => {
    return (
        <div className="mb-4">
            <label className="block ml-1 mb-2 text-sm">{label}</label>
            <div className="flex flex-row">
                {
                    type === 'password' ?
                        <>
                            <Input required disabled={disabled} type={valueToggle ? 'text' : 'password'} style={{ borderRight: "none", borderRadius: "0.5rem 0 0 0.5rem" }} name="password" onChange={handleChange} value={value} />
                            <button type="button" className="toggle-pass border border-l-0 rounded-r-lg text-slate-500" style={{ padding: "11px 14px", borderColor: "#393939" }} onClick={handleToggle}>
                                {valueToggle ? <FaEyeSlash style={{ color: "#393939" }} /> : <FaEye style={{ color: "#393939" }} />}
                            </button>
                        </>
                        :
                        <Input required type={type} disabled={disabled} name={name} onChange={handleChange} value={value} />
                }
            </div>
        </div>

    )
}

function Register() {
    const [email, setEmail] = useState("");
    const [namaLengkap, setNamaLengkap] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordConfirmShow, setPasswordConfirmShow] = useState(false);
    const [isNewEmail, setIsNewEmail] = useState(false);
    const [loadingCheckEmail, setLoadingCheckEmail] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);

    }
    function handleChangeNamaLengkap(e) {
        setNamaLengkap(e.target.value);
    }
    function handleChangeUsername(e) {
        setUsername(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    function handleChangePasswordConfirm(e) {
        setConfirmPassword(e.target.value);
    }

    function togglePasswordShow() {
        setPasswordShow(!passwordShow);
    }
    function togglePasswordConfirmShow() {
        setPasswordConfirmShow(!passwordConfirmShow);
    }

    function handleCheck(e) {
        e.preventDefault();
        setLoadingCheckEmail(true);
        checkEmail(email).then((result) => {
            setIsNewEmail(result.success);
            if (!result.success) {
                setErrorMessage(result.message);
            }
            setLoadingCheckEmail(false);
        });
    }

    return (
        isNewEmail ?
            <div className="flex flex-row flex-nowrap items-center text-center h-screen bg-violet-400">
                <div className="mx-auto p-12 pb-6 bg-white rounded-xl drop-shadow-md" style={{ width: "90%", height: "90vh" }}>
                    <div className="mb-2">
                        <img src={Logo} alt="logo" width={50} className="mx-auto mb-2 rounded-full" />
                        <h1 className="font-bold text-2xl">Daftar Akun</h1>
                    </div>
                    <div className="text-center text-red-700 text-sm mb-2" style={{ height: "20px", width: "100%" }}>{errorMessage}</div>
                    <form className={`mx-auto text-start flex flex-column`} style={{ width: "100%" }} onSubmit={handleCheck}>
                        <InputGroup label="Nama Lengkap" name="nama_lengkap" type="text" handleChange={handleChangeNamaLengkap} value={namaLengkap} />
                        <InputGroup label="Username" name="username" type="text" handleChange={handleChangeUsername} value={username} />
                        <InputGroup label="Password" name="password" type="password" value={password} handleChange={handleChangePassword} valueToggle={passwordShow} handleToggle={togglePasswordShow} />
                        <InputGroup label="Confirm Password" name="confirm_password" type="password" value={passwordConfirm} handleChange={handleChangePasswordConfirm} valueToggle={passwordConfirmShow} handleToggle={togglePasswordConfirmShow} />
                        <InputGroup label="Email" name="email" type="email" value={email} disabled={true} />
                        <Submit disabled={!email || loadingCheckEmail ? true : false} className={`${!email || loadingCheckEmail ? 'bg-gray-300' : 'bg-violet-400 hover:bg-violet-500'} ease-out duration-300 `}>
                            {
                                loadingCheckEmail ?
                                    <LoadingRing width={"24px"}></LoadingRing>
                                    :
                                    'Daftar'
                            }
                        </Submit>
                    </form>
                </div>
            </div>
            :
            <div className="flex flex-row flex-nowrap items-center text-center h-screen">
                <div className="m-6 flex-1 bg-violet-400 rounded-2xl overflow-hidden text-white h-100">
                    <img src={Banner} alt="banner" />
                    <div className="px-10 flex flex-row justify-between items-center" style={{ backgroundColor: "#00000088" }}>
                        <div>Sudah punya akun?</div>
                        <Link to="/login" className="my-4 px-6 py-2 rounded-lg bg-violet-400 text-white border-2 border-violet-400 hover:bg-transparent hover:text-violet-400 ease-out duration-300">
                            Masuk
                        </Link>
                    </div>
                </div>
                <div className="m-6 flex-1">
                    <div className="mb-2">
                        <img src={Logo} alt="logo" width={50} className="mx-auto mb-2 rounded-full" />
                        <h1 className="font-bold text-2xl">Daftar Akun</h1>
                    </div>

                    <form className={`my-6 mx-auto text-start`} style={{ width: "400px" }} onSubmit={handleCheck}>
                        <div className="text-center text-red-700 text-sm mb-2" style={{ height: "20px", width: "100%" }}>{errorMessage}</div>
                        <div className="mb-4">
                            <label className="block ml-1 mb-2 text-sm">Email</label>
                            <div>
                                <Input required type="email" name="email" onChange={handleChangeEmail} value={email} />
                            </div>
                        </div>
                        <Submit disabled={!email || loadingCheckEmail ? true : false} className={`${!email || loadingCheckEmail ? 'bg-gray-300' : 'bg-violet-400 hover:bg-violet-500'} ease-out duration-300 `}>
                            {
                                loadingCheckEmail ?
                                    <LoadingRing width={"24px"}></LoadingRing>
                                    :
                                    'Daftar'
                            }
                        </Submit>
                    </form>
                </div>
            </div>
    );
}

export default Register;