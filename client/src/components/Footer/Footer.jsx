import React from 'react';
import './Footer.css';

const Footer = (props) => {
  const { classes } = props;

  return (
    <div className={`${classes} tanTexture border1 footerStyles`}>
      <div className="d-flex flex-column">
        <h5 className="mb-0">Contact Us:</h5>
        <p className="footerText">Phone: 1-800-555-5555</p>
        <p className="footerText">millionhairs@gmail.com</p>
      </div>
      <div className=" d-none d-sm-block">
        <div className=" d-flex justify-content-start align-items-end h-100">
          <p className="footerText">&copy; Copyright MillionHairs LLC 2023</p>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <h5>Follow Us</h5>
        <div className="d-flex">
          <div className="footerIcon" id='twitter' />
          <div className="footerIcon" id='youtube' />
          <div className="footerIcon me-0" id='facebook' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
