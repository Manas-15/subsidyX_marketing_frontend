/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { GrTwitter } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { contactUsAction } from "redux/Actions/contactUsAction";

const Footer = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ email: "" });
  const [emailError, setEmailError] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);

    if (e.target.value.trim() === "") {
      setEmailError(true);
      setEmail({ email: e.target.value });
    } else {
      setEmailError(false);
      setEmail({ email: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email?.email === "") {
      setEmailError(true);
    } else {
      console.log(email);
      dispatch(contactUsAction?.createSubscribe(email));
      setEmail({ email: "" });
    }
  };

  return (
    <footer className="cmn_sec_pad footer_sec">
      <div className="container">
        <div className="row text-left">
          <div className="col-md-2">
            <figure>
              <Image
                src="/images/logo.png"
                height="100"
                width="100"
                alt="logo"
              />
            </figure>
          </div>
          <div className="col-md-4">
            <ul>
              <li>
                <h4>FEATURES</h4>
              </li>
              <li className="f-item">
                <a href="#" title="Gujarat IT/ITeS Policy">
                  Gujarat IT/ITeS Policy
                </a>
              </li>
              <li className="f-item">
                <a href="#" title="Gujarat Electronis Policy">
                  Gujarat Electronis Policy
                </a>
              </li>
              <li className="f-item">
                <a href="#" title="Gujarat Textile Policy">
                  Gujarat Textile Policy
                </a>
              </li>
              <li className="f-item">
                <a href="#" title="Gujarat MSME Policy">
                  Gujarat MSME Policy
                </a>
              </li>
              <li className="f-item">
                <a href="#" title="Gujarat Large Industries Policy">
                  Gujarat Large Industries Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul>
              <li className="f-item">
                {" "}
                <h4>RESOURCES</h4>
              </li>
              <li className="f-item">
                <a href="#" title="Blog">
                  Blog
                </a>
              </li>
              <li className="f-item">
                <a href="#" title="FAQs">
                  FAQs
                </a>
              </li>
              <li className="f-item">
                <Link href="/contact" title="Contact Us">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul>
              <li>
                <h4>COMPANY</h4>
              </li>
              <li className="f-item">
                <Link href="/privacy-policy" title="Privacy Policy">
                  Privacy Policy
                </Link>
              </li>
              <li className="f-item">
                <Link href="/terms-conditions" title="Terms of Service">
                  Terms of Service
                </Link>
              </li>
              <li className="f-item">
                <a href="#" title="Reviews">
                  Reviews
                </a>
              </li>
              <li className="f-item">
                <a href="#" title="Careers">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-md-8 pt-4">
            <div>
              <input
                type="email"
                value={email?.email}
                className="inpt_fld"
                placeholder="Enter Your Email Address"
                onChange={(e) => handleChange(e)}
              ></input>
              <button
                className="btn btn-sm btn-primary sub_btn"
                type="button"
                onClick={(e) => handleSubmit(e)}
              >
                SUBSCRIBE NOW
              </button>
            </div>
            {emailError && (
              <span
                style={{
                  color: "red",
                  fontSize: "15px",
                  marginLeft: "15px",
                }}
              >
                Email is required
              </span>
            )}
          </div>
          <div className="col-md-4">
            <p>FOLLOW US</p>
            <ul className="social-icons">
              <li>
                <Link
                  href="https://www.facebook.com/profile.php?id=61550573192139"
                  target="_blank"
                  title="facebook"
                >
                  <AiFillFacebook size={30} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/company/subsidyx"
                  target="_blank"
                  title="linkedin"
                >
                  <AiFillLinkedin size={30} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/subsidyx"
                  target="_blank"
                  title="instagram"
                >
                  <AiFillInstagram size={30} />
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com/subsidy_X"
                  target="_blank"
                  title="twitter"
                >
                  <GrTwitter size={30} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
