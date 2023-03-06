import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Submit } from "./style";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "@assets/logo.png";

import LoadingRing from "@components/LoadingRing";

import { login } from "@services/api/MasyarakatAPI";

function Login() {
    const navigate = useNavigate();

    // input value
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);

    // change input value
    function handleChangeUsername(e) {
        setUsername(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function togglePasswordShown() {
        setPasswordShown(!passwordShown);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoadingLogin(true);
        login(username, password).then((result) => {
            setLoadingLogin(false);
            if (!result.success) {
                setErrorMessage(result.message);
            } else if (result.success) {
                setErrorMessage('');
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("user", JSON.stringify(result.data));
                navigate("/", { replace: true });
            }
        }).catch(err => { setErrorMessage(''); console.log(err); setLoadingLogin(false) });
    }

    return (
        <div className="flex flex-row flex-nowrap items-center text-center h-screen bg-violet-400">
            <div className="mx-auto p-12 pb-6 bg-white rounded-xl drop-shadow-md">
                <div className="mb-2">
                    <img src={Logo} alt="logo" width={50} className="mx-auto mb-2 rounded-full" />
                    <h1 className="font-bold text-2xl">Masuk ke Akun Anda</h1>
                </div>
                <div className="text-center text-red-700 text-sm my-3" style={{ height: "20px", width: "100%" }}>{errorMessage}</div>
                <form className="mx-auto text-start" style={{ width: "400px" }} onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block ml-1 mb-2 text-sm">Username</label>
                        <div>
                            <Input required type="text" name="username" onChange={handleChangeUsername} value={username} />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block ml-1 mb-2 text-sm">Password</label>
                        <div className="flex flex-row">
                            <Input required type={passwordShown ? 'text' : 'password'} style={{ borderRight: "none", borderRadius: "0.5rem 0 0 0.5rem" }} name="password" onChange={handleChangePassword} value={password} />
                            <button type="button" className="toggle-pass border border-l-0 rounded-r-lg text-slate-500" style={{ padding: "11px 14px", borderColor: "#393939" }} onClick={togglePasswordShown}>{passwordShown ? <FaEyeSlash style={{ color: "#393939" }} /> : <FaEye style={{ color: "#393939" }} />}</button>
                        </div>
                    </div>
                    <Submit disabled={(username && password && !loadingLogin) ? false : true} className={`${(username && password && !loadingLogin) ? 'bg-violet-400 hover:bg-violet-500' : 'bg-gray-300'} ease-out duration-300 flex items-center justify-center`}>
                        {
                            loadingLogin ?
                                <LoadingRing width={"24px"}></LoadingRing>
                                :
                                'Masuk'
                        }
                    </Submit>
                </form>
                <div className="mt-6 py-3 text-sm">
                    Belum punya akun? <Link to="/register" style={{ fontWeight: "400" }}>Daftar</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;