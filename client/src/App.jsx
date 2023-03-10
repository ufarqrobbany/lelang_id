import { BreakpointProvider } from 'react-socks';
import { Routes, Route } from "react-router-dom";
import useDocumentTitle from "@hooks/useDocumentTitle";
import Home from "@pages/Home";
import Login from "@pages/Auth/Login";
import Register from "@pages/Auth/Register";
import Profil from '@pages/Profil';
import './App.css';
import Lelang from '@pages/Lelang';

// Page
function Page(props) {
  const titlePrefix = 'LelangID - ';
  useDocumentTitle(`${titlePrefix}${props.title}`);
  return props.content;
}

// Pages
function HomePage() {
  return <Page content={<Home />} title='Beranda' />
}

function LoginPage() {
  return <Page content={<Login />} title='Masuk' />
}

function RegisterPage() {
  return <Page content={<Register />} title='Daftar' />
}

function ProfilPage() {
  return <Page content={<Profil />} title='Profil' />
}

function LelangPage() {
  return <Page content={<Lelang />} title='Lelang Barang' />
}

// Routes
function App() {
  return (
    <BreakpointProvider>
      <Routes>
        <Route exact path="/" element={HomePage()} />
        <Route path="/login" element={LoginPage()} />
        <Route path="/register" element={RegisterPage()} />
        <Route path="/profil" element={ProfilPage()} />
        <Route path="/lelang" element={LelangPage()} />
      </Routes>
    </BreakpointProvider>
  )
}

export default App
