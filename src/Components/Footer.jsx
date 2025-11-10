import React from "react";
import financeImg from "../assets/Business-and-financial-logo-design-template-isolated-on-transparent-background-PNG-removebg-preview.png";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebookF, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <aside>
        <img src={financeImg} alt="logo" className="w-20" />
        <p>
          <h1 className="text-lg font-semibold">
            <span className="text-primary">FinEase</span> Industries Ltd.
          </h1>
          Providing reliable financial <br /> advice since 2025
        </p>
      </aside>
      <nav className="md:text-lg">
        <h6 class="footer-title">Company</h6>
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Terms and Conditions</a>
      </nav>
      <nav className="md:text-lg">
        <h6 class="footer-title">Social</h6>
        <div class="grid grid-flow-col gap-4">
          <a>
            <BsTwitterX size={23} />
          </a>
          <a>
            <FaFacebookF size={23} />
          </a>
          <a>
            <FaGithub size={23} />
          </a>
          <a>
            <IoLogoYoutube size={23} />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
