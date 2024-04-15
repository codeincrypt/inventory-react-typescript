import React from "react";
import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

interface Invoice {
  id: string;
  createdAt: string;
  clientName: string;
  total: number;
  status: "paid" | "pending" | "draft";
}

interface InvoiceTableProps {
  datalist: Invoice[];
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ datalist }) => {
  return (
    <>
      {datalist.map((item) => (
        <Link to={`/invoice/${item.id}`} className='card' key={item.id}>
          <div className='list font-weight-bold'><span className='text-muted'>#</span>{item.id}</div>
          <div className='list'>{item.createdAt}</div>
          <div className='list'>{item.clientName}</div>
          <div className='list h5'>£ {item.total}</div>
          <div className='list'>
            {item.status === "paid" ? (
              <button className="btn-pill btn-pill-success"> <FaCircle className='dot' /> Paid </button>
            ) : item.status === "pending" ? (
              <button className="btn-pill btn-pill-warning"> <FaCircle className='dot' /> Pending </button>
            ) : (
              <button className="btn-pill btn-pill-secondary"> <FaCircle className='dot' /> Draft </button>
            )}
          </div>
        </Link>
      ))}
    </>
  );
};

export default InvoiceTable;
