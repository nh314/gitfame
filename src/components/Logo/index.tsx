import React from "react";
import LogoImage from "../../assets/images/gitfamelogo.png";

type LogoProps = {
  description?: string;
};

const Logo = ({ description }: LogoProps) => {
  return (
    <div className="flex items-center">
      <img className="h-8 w-auto" src={LogoImage} alt="GitFame Logo" />
      {description && <div className="text-sm">{description}</div>}
    </div>
  );
};

export default Logo;