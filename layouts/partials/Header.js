/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import config from "@config/config.json";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "redux/Actions/userAction";
import { Dropdown } from "react-bootstrap";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  //router
  const dispatch = useDispatch();
  const router = useRouter();
  const { base_url } = config.site;
  // states declaration
  const [navOpen, setNavOpen] = useState(false);

  const user = useSelector((state) => state?.user);
  const allReportLists = useSelector((state) => state?.report);

  const handleLogout = () => {
    dispatch(userActions.logout());
    dispatch(userActions.clearOTP());
    router.push("/account");
  };

  return (
    <header className="subsid_home_header">
      <nav className="navbar navbar-expand-md top_nav">
        <div className="container">
          {router?.pathname !== "/dashboard" &&
          router?.pathname !== "/questions-after-eligible" &&
          router?.pathname !== "/report/confirm-report" &&
          router?.pathname !== "/report/view-report" &&
          router?.pathname !== "/report/final-report" &&
          router?.pathname !== "/report/all-report-list" &&
          router?.pathname !== "/payment" ? (
            <a href={base_url} className="navbar-brand">
              <figure>
                <Image
                  src="/images/logo.png"
                  height="50"
                  width="60"
                  alt="logo"
                />
                <Image
                  src="/images/logo-text.png"
                  height="100"
                  width="200"
                  alt="logo"
                />
              </figure>
            </a>
          ) : (
            <div
              style={{
                visibility:
                  allReportLists?.allReports?.result?.length > 0
                    ? "hidden"
                    : "visible",
              }}
            >
              <a href={base_url} className="navbar-brand">
                <figure>
                  <img className="logo" src="/images/logo.png" alt="" />
                  <img src="/images/logo-text.png" alt="" />
                </figure>
              </a>
            </div>
          )}

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
              <li className="nav-item ml-2 d-flex justify-content-center">
                {user?.user?.access_token === undefined ? (
                  <button
                    type="button"
                    className="btn btn-primary log_btn"
                    title="login"
                    onClick={() => router.push("/account")}
                  >
                    LOG IN
                  </button>
                ) : (
                  <Dropdown>
                    <Dropdown.Toggle
                      className="btn log_btn"
                      id="dropdown-basic"
                    >
                      <Image
                        src="/images/user1.png"
                        height="30"
                        width="30"
                        alt="logo"
                      />
                      {/* <FaRegUserCircle
                        style={{
                          fontSize: "25px",

                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                      /> */}
                      {/* {user?.user_details?.first_name} */}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#" onClick={() => handleLogout()}>
                        <AiOutlineLogout
                          style={{
                            fontSize: "25px",
                            // color: "#fa6130",
                            cursor: "pointer",
                          }}
                        />{" "}
                        LOG OUT
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
