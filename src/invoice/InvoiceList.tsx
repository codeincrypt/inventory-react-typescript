import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import invoiceData from "../assets/data.json"
import InvoiceTable from '../components/InvoiceList';
import NoInvoicelist from '../components/NoInvoice';
import Createinvoice from '../components/Createinvoice';

const Invoicelist: React.FC = () => {
  // eslint-disable-next-line
  const [datalist, setDatalist] = React.useState<any[]>(invoiceData);
  // eslint-disable-next-line
  const [datalist2, setDatalist2] = React.useState<any[]>(invoiceData);
  const [opencreate, setOpenCreate] = React.useState<boolean>(false);

  const OpenCreateInvoice = () => {
    setOpenCreate(true)
  }
  const closeCreateSidebar = () => {
    setOpenCreate(false)
  }

  const filterData = (e:string) => {
    const query = datalist2.filter((item) => {
      return (
        item.status.toLowerCase().match(e)
      );
    });
    setDatalist(query);
  }

  return (
    <>
      <div id="fade-backdrop" className={opencreate === true ? "fade modal-backdrop show" : ""} ></div>
      <div className="container">
        <Createinvoice show={opencreate} closeRightSidebar={closeCreateSidebar} />
        <div className='row justify-content-center'>
          <div className="col-lg-9 col-12 inventory">
            <div className='row'>
              <div className='col-lg-6'>
                <h2>Invoices</h2>
                {datalist?.length === 0 ? (
                  <p>No Invoices</p>
                ) : (
                  <p>There are {datalist?.length} total invoices</p>
                )}
              </div>
              <div className='col-lg-6'>
                <div className='row justify-content-end'>
                  <div className='mr-4'>
                    <Dropdown className='dropdown-elegent'>
                      <Dropdown.Toggle id="dropdown-basic">
                        Filter by status
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => filterData("")}>All</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => filterData("paid")}>Paid</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => filterData("pending")}>Pending</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => filterData("draft")}>Draft</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div>
                    <button className="btn btn-brand btn-with-icon" onClick={OpenCreateInvoice}>
                      <span>+</span>
                      New Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {datalist.length === 0 ? (
              <div className='row inventory-list'>
                <NoInvoicelist />
              </div>
            ) : (
              <div className='row inventory-list'>
                <InvoiceTable datalist={datalist} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoicelist;