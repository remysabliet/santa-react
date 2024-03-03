import React from 'react';

interface IFooterProps {
  content: React.ReactNode
}

const Footer: React.FC<IFooterProps> = ({content}) => (
  <footer className="mt-12 pt-6 border-t border-gray-300">
    {content}
  </footer>
);

export default Footer;
