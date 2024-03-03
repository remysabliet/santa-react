import React from "react";

interface IHeaderProps {
  title: string;
}

const Header: React.FC<IHeaderProps> = ({ title }) => (
  <header>
    <h1>{title}</h1>
  </header>
);

export default Header;
