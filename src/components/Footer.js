import Image from "next/image";
import React from "react";

const Footer = ({ className }) => {
  return (
    <Image
      className={className}
      src={"/hivoco-logo.png"}
      alt="logo"
      width={130}
      height={24}
      priority={true}
    />
  );
};

export default Footer;
