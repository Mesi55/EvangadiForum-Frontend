import React from 'react'
// import logo from '../../imgs/evangadi-logo-footer (1).png'
import { Icon } from "react-icons-kit";
import { facebook } from "react-icons-kit/feather/facebook";
import { instagram } from "react-icons-kit/feather/instagram";
import { youtube } from "react-icons-kit/feather/youtube";
import footerlogo from '../../imgs/logo1.png'
import './footer.css'
function Footer() {
  return (
    <footer className="footer-wrapper d-md-flex justify-content-around">
    <div className="logo-icon-wrapper">
      <div className="logo">
        <img src={footerlogo} alt = "logo"/>
      </div>
      <div className="Icon">
        <a href="https://www.facebook.com/evangaditech">
          <Icon icon={facebook} size={25} />
        </a>
     
        <a href="https://www.instagram.com/evangaditech/">
          <Icon icon={instagram} size={25} />
        </a>
        <a href="https://www.youtube.com/c/weareethiopians">
          <Icon icon={youtube} size={25} />
        </a>
      </div>
    </div>
    <div className="row ">
    <h3 className="titlee"> Useful Link</h3>
      <div className="Links ">
        <a href="https://www.evangadi.com/explained">How It Works</a>
        <a href="https://www.evangadi.com/legal/terms/">Terms of Service</a>
        <a href="https://www.evangadi.com/legal/privacy/">Privacy policy</a>
        
      </div>
    </div>
    <div className="row">
      <div className="Contact-Info">
          <h3 className="titlee"> Contact Info</h3>
          <p>Evangadi Networks</p>
        <p>support@evangadi.com</p>
        <p>+1-202-386-2702</p>
      </div>
    </div>
</footer>
  )
}

export default Footer