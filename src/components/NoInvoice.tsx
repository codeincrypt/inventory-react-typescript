import React from "react";
import emptyImg from "../assets/images/illustration-empty.svg"

const NoInvoicelist:React.FC = () => {
  return (
    <>
    <div className="col-lg-12 text-center" style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="text-center mb-4">
        <img src={emptyImg} alt="defaultimg" />
      </div>
      <h5 className="mb-4 font-weight-bold">There is nothing here</h5>
      <p>Create an invoice by clicking the <br /> <b>New Invoice</b> button and get started </p>
      </div>
    </>
  );
};

export default NoInvoicelist;
