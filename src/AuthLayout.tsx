import React, { ReactNode } from 'react';
interface LayoutProps {
  children: ReactNode;
}
const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
    <div className="container">
      {children}
    </div>
    </>
  );
};

export default AuthLayout;
