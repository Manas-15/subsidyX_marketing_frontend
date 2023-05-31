/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import config from "@config/config.json";
const Header = () => {
  //router
  const router = useRouter();
  const { base_url } = config.site;
  // states declaration
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="subsid_home_header">
      <nav className="navbar navbar-expand-md top_nav">
        <div className="container">
          <a href={base_url} className="navbar-brand">
            <figure>
              <img className="logo" src="/images/logo.png" alt="" />
              <img src="/images/logo-text.png" alt="" />
            </figure>
          </a>
          <div className="nav_lst">
            <ul className="navbar-nav ml-auto">
              <li
                className={
                  router.pathname == "/" ? "nav-item active" : "nav-item"
                }
              >
                <Link href="/" className="nav-link" title="home">
                  Home
                </Link>
              </li>
              <li
                className={
                  router.pathname == "/service" ? "nav-item active" : "nav-item"
                }
              >
                <Link href="#" className="nav-link" title="services">
                  Services
                </Link>
              </li>
              <li
                className={
                  router.pathname == "/about" ? "nav-item active" : "nav-item"
                }
              >
                <Link href="#" className="nav-link" title="about">
                  About
                </Link>
              </li>
              <li
                className={
                  router.pathname == "/contact" ? "nav-item active" : "nav-item"
                }
              >
                <Link href="/contact" className="nav-link" title="contact us">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item ml-2">
                <button
                  type="button"
                  className="btn btn-primary log_btn"
                  title="login"
                  onClick={() => router.push("/login")}
                >
                  LOG IN
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
