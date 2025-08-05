import Image from "next/image";
import React from "react";

const Header = ({ className }) => {
  return (
    <Image
      className={className}
      src={"/artistry-logo.png"}
      alt="logo"
      width={307}
      height={45}
      priority={true}
    />
  );
};

export default Header;
