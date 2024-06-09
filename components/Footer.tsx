import React from "react";
import {
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <hr className="w-full"></hr>
      <div className="mx-auto  p-4 flex flex-col text-center text-neutral-900 md:flex-row md:justify-between">
        <div className="flex flex-row items-center justify-center space-x-1 text-neutral-500 dark:text-neutral-100 w-full">
          <a href="https://eaut.edu.vn" className="hover:text-blue-600">
            © 2024 Trường Đại học Công nghệ Đông Á
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
