import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaEyeSlash } from "react-icons/fa";
import Logo from "@assets/logo.png";
import Navbar from "@components/Navbar";
import ProductCard from "@components/ProductCard";

import OwlCarousel from 'react-owl-carousel';
import Banner1 from "@assets/1.png";
import Banner2 from "@assets/2.png";
import Banner3 from "@assets/3.png";

function Home() {
    return (
        <div className="flex flex-col">
            <header style={{ backgroundColor: "#B8AFD6", height: "426px" }}>
                <Navbar />
                <OwlCarousel items={1} autoplay={true} loop={true} className="mx-auto banner" style={{ maxWidth: "1024px", width: "100%" }}>
                    <img src={Banner1} alt="banner1" />
                    <img src={Banner2} alt="banner2" />
                    <img src={Banner3} alt="banner3" />
                </OwlCarousel>
            </header>
            <main className="flex flex-col mt-12" style={{ rowGap: "40px" }}>
                <section style={{ maxWidth: "1024px", width: "100%", margin: "0 auto" }}>
                    <div className="" style={{ fontSize: "24px", fontWeight: "500", marginBottom: "10px" }}>Sedang Trending</div>
                    <OwlCarousel items={4} className="mx-auto" margin={20} stagePadding={10} style={{ maxWidth: "1024px", width: "100%" }}>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </OwlCarousel>
                </section>

                <div style={{ backgroundColor: "#B8AFD6", padding: "20px 0" }}>
                    <section style={{ maxWidth: "1024px", width: "100%", margin: "0 auto" }}>
                        <div className="text-white" style={{ fontSize: "24px", fontWeight: "500", marginBottom: "10px" }}>Lelang yang Akan Datang</div>
                        <OwlCarousel items={5} className="mx-auto" margin={20} stagePadding={10} style={{ maxWidth: "1024px", width: "100%" }}>
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                        </OwlCarousel>
                    </section>
                </div>
            </main>
            <footer>

            </footer>
        </div>
    )
}

export default Home;