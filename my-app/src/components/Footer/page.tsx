import React from 'react';

function Footer() {
  return (
    <div className="bg-white text-black p-6">
      <div className="flex flex-col items-center justify-center">
        {/* Main Text */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 p-3 text-gray-800 flex">
          ContentGenie
          <p className='rounded-full text-green-500'>.</p>
        </h1>

        {/* Social Links */}
        <div className="flex space-x-4 sm:space-x-6 m-4">
          <a href="https://github.com/YATHARTH-Sriv" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          <a href="https://twitter.com/yatharth_sriv" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
          <a href="https://www.linkedin.com/in/yatharth-srivastava-0b0382261/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
        </div>

        {/* Border */}
        <div className="border-t border-gray-300 w-[90%] sm:w-[70%] m-4"></div>

        {/* Bottom Text */}
        <div className="flex flex-col sm:flex-row justify-between w-full max-w-6xl mt-3 text-sm space-y-2 sm:space-y-0">
          <p className="text-center sm:text-left">Copyright © 2024  All rights reserved.</p>
          <div className="flex justify-center sm:justify-end space-x-4">
            <a href="#terms" className="hover:underline">Terms</a>
            <a href="#privacy" className="hover:underline">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;