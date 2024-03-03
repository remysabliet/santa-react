import React from "react";

import Header from "./HeaderLayout";
import Footer from "./FooterLayout";

interface MainLayoutProps {
  title: string;
  children: React.ReactNode;
  footerContent: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ footerContent, children, title }) => (
  <div>
    <Header title={title} />
    {children}
    <Footer content={footerContent} />
  </div>
);

export default MainLayout;
