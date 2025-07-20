// components/Footer.jsx
import { Link } from "react-router-dom";
import { Github, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-10 md:flex md:justify-between md:items-start grid grid-cols-1 gap-8">
        {/* Left - Logo and tagline */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-white">
            MeroPathshala
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-sm">
            Empower your learning journey with top-notch online courses.
          </p>
        </div>

        {/* Middle - Navigation Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Quick Links
          </h3>
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            to="/course/search?query="
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Courses
          </Link>
          <Link
            to="/profile"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Profile
          </Link>
          <Link
            to="/about"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            About Us
          </Link>
        </div>

        {/* Right - Social and contact */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/Dinanath99/meropathsala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Github />
            </a>
            
            
          </div>
        </div>
      </div>

      <div className="border-t dark:border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} MeroPathshala. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
