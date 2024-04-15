import React, { ReactNode } from 'react';
import Sidebar from './include/Sidebar';
import "./assets/import.css";

interface LayoutProps {
  children: ReactNode;
}
const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main className="main">
        <div className='container-margin'>
        {children}
        </div>
      </main>
    </>
  );
};

export default AdminLayout;
