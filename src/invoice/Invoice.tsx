import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RiArrowLeftSLine } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";

import invoiceList from "../assets/data.json"
import FormatDate from "../components/FormatDate"
import CustomModal from '../components/Modal';
import EditInvoice from '../components/EditInvoice';

interface InvoiceData { id: string; createdAt: string; paymentDue: string; description: string; paymentTerms: number; clientName: string; clientEmail: string; status: string; senderAddress: { street: string; city: string; postCode: string; country: string; }; clientAddress: { street: string; city: string; postCode: string; country: string; }; items: { name: string, quantity: number, price: number, total: number }[]; total: number; }

const Invoice: React.FC = () => {
  const { id } = useParams<string>();
  const [invoicedata, setInvoicedata] = React.useState<InvoiceData>();
  const [showModal, setShowModal] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [editStatus, setEditStatus] = React.useState<boolean>(false);

  const handleCloseModal = () => setShowModal(false);
  const handleCloseDeletedModal = () => setShowDeletedModal(false);

  const fetchData = () => {
    const responseData = invoiceList.find((item: InvoiceData) => item.id === id);
    setInvoicedata(responseData);
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line 
  }, [])

  const markAsPaid = () => {
    setInvoicedata((invoicedata: any) => ({ ...invoicedata, status: "paid" }));
    // CODE BELOW TO API CALL - TO UPDATE STATUS AS : MARK AS PAID
  }

  const openEditInvoice = () => setEditStatus(true)
  const closeEditInvoice = () => setEditStatus(false)

  const deleteData = () => {
    setShowModal(false)
    setShowDeletedModal(true);
  }

  return (
    <div className="container">
      {invoicedata ? (
        <EditInvoice show={editStatus} closeRightSidebar={closeEditInvoice} viewdata={invoicedata} />
      ) : null}
      <div className='row justify-content-center'>
        <div className="col-lg-9 col-12 inventory">
          <div className='mb-4 col-lg-12 '>
            <Link to="/invoice"><RiArrowLeftSLine className='h4 mb-1 mr-3 text-brand' /> Go Back</Link>
          </div>
          <div className='col-lg-12 card py-4'>
            <div className='row'>
              <div className='col-lg-6'>
                <span className='mr-3'>Status </span>
                {invoicedata?.status === "paid" ? (
                  <button className="btn-pill btn-pill-success"> <FaCircle className='dot' /> Paid </button>
                ) : invoicedata?.status === "pending" ? (
                  <button className="btn-pill btn-pill-warning"> <FaCircle className='dot' /> Pending </button>
                ) : (
                  <button className="btn-pill btn-pill-secondary"> <FaCircle className='dot' /> Draft </button>
                )}
              </div>
              <div className='col-lg-6 text-right'>
                <button className="btn btn-dark mr-2" onClick={openEditInvoice}>
                  Edit
                </button>
                <button className="btn btn-danger mr-2" onClick={() => setShowModal(true)}>
                  Delete
                </button>
                {invoicedata?.status === "paid" ? (
                  <button className="btn btn-brand" disabled>
                    Mark as paid
                  </button>
                ) : (
                  <button className="btn btn-brand" onClick={markAsPaid}>
                    Mark as paid
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='col-lg-12 card p-5'>
            <div className='row'>
              <div className='col-6 col-lg-6 mb-3'>
                <h5 className='font-weight-bold'>
                  <span className='text-muted'>#</span>{invoicedata?.id}</h5>
                <p>{invoicedata?.description}</p>
              </div>
              <div className='col-6 col-lg-6 mb-3 text-right'>
                <p>
                  {invoicedata?.senderAddress?.street} <br />
                  {invoicedata?.senderAddress?.city} <br />
                  {invoicedata?.senderAddress?.postCode} <br />
                  {invoicedata?.senderAddress?.country} <br />
                </p>
              </div>
              <div className='col-12 col-lg-4'>
                <div className='mb-4'>
                  <p className='mb-1'>Invoice Date</p>
                  <h5> {FormatDate(invoicedata?.createdAt)}</h5>
                </div>
                <div>
                  <p className='mb-1'>Payment Due</p>
                  <h5>{FormatDate(invoicedata?.paymentDue)}</h5>
                </div>
              </div>

              <div className='col-12 col-lg-4'>
                <div className='mb-4'>
                  <p className='mb-1'>Bill to</p>
                  <h5>{invoicedata?.clientName}</h5>
                  <p>
                    {invoicedata?.clientAddress?.street} <br />
                    {invoicedata?.clientAddress?.city} <br />
                    {invoicedata?.clientAddress?.postCode} <br />
                    {invoicedata?.clientAddress?.country} <br />
                  </p>
                </div>
              </div>

              <div className='col-12 col-lg-4'>
                <div className='mb-4'>
                  <p className='mb-1'>Sent to </p>
                  <h5>{invoicedata?.clientEmail}</h5>
                </div>
              </div>

              <div className='col-lg-12 col-12 card2'>
                <div className='p-4'>
                  <table className='table table-lg mb-0'>
                    <tr className='table-heads'>
                      <td width="46%">Item Name</td>
                      <td className='text-center' width="18%">QTY.</td>
                      <td className='text-right' width="18%">Price</td>
                      <td className='text-right' width="18%">Total</td>
                    </tr>

                    {invoicedata?.items?.map((item, index) => (
                      <tr className='table-rows'>
                        <td className='text-left'>{item?.name}</td>
                        <td className='text-center'>{item?.quantity}</td>
                        <td className='text-right'>£ {item?.price.toFixed(2)}</td>
                        <td className='text-right'>{item?.total.toFixed(2)}</td>
                      </tr>
                    ))}

                  </table>
                </div>
                <div className='col-lg-12 p-4 footer'>
                  <table className='table table-lg mb-0'>
                    <tr className='table-heads'>
                      <td width="50%">
                        <h6 className="mb-0">Amount Due</h6>
                      </td>
                      <td className='text-right' width="50%">
                        <h2 className="mb-0">£ {invoicedata?.total.toFixed(2)}</h2>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <CustomModal
        show={showModal}
        onHide={handleCloseModal}
        title="Confirm Deletion"
        body={<p>Are you sure you want to delete invoice #{invoicedata?.id}? This action cannot be undone.</p>}
        footer={<div>
          <button className="btn btn-secondary mr-2" onClick={handleCloseModal} >Cancel</button>
          <button className="btn btn-danger" onClick={deleteData}>Delete</button>
        </div>}
      />

      <CustomModal
        show={showDeletedModal}
        onHide={handleCloseDeletedModal}
        title={<span className='text-success'>Deleted Successfully</span>}
        body={<p>Your Invoice has been deleted successfully</p>}
        footer={<div>
          <button className="btn btn-secondary mr-2" onClick={handleCloseDeletedModal} >Close</button>
        </div>}
      />

    </div>
  );
}

export default Invoice;