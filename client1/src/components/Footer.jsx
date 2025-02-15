import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 mt-20 text-gray-500 text-sm">
      {/* Centered logo and text */}
      <div className="flex items-center gap-4">
        <img src={assets.logo} alt="Logo" width={150} />
        <p className="border-l border-gray-400 pl-4 text-center">
          Copyright @varnikumar | All rights reserved.
        </p>
      </div>

      {/* Social Media Icons */}
      <div className="flex gap-2.5">
        <img src={assets.facebook_icon} alt="Facebook" width={35} />
        <img src={assets.instagram_icon} alt="Instagram" width={35} />
        <img src={assets.twitter_icon} alt="Twitter" width={35} />
      </div>
    </div>
  );
}

export default Footer;
