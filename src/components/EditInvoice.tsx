import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { MdDelete } from "react-icons/md";
import { InputField, InputItems } from "../interfaces/invoice";

interface EditInvoiceProps {
  show: boolean,
  closeRightSidebar: any,
  viewdata: { 
    id: string; 
    createdAt: string; 
    paymentDue: string; 
    description: string; 
    paymentTerms: number; 
    clientName: string; 
    clientEmail: string; 
    status: string; 
    senderAddress: { 
      street: string; 
      city: string; 
      postCode: string; 
      country: string; 
    }; 
    clientAddress: { 
      street: string; 
      city: string; 
      postCode: string; 
      country: string; 
    }; 
    items: {
      name:string, 
      quantity: number, 
      price: number, 
      total: number
    }[]; 
    total: number; 
  }
}

const EditInvoice: React.FC<EditInvoiceProps> = (props) => {
  const show = props.show;
  const viewdata = props.viewdata;

  const closeSidebar = () => props.closeRightSidebar(false);

  const [invoiceData, setInvoiceData] = useState(viewdata)
  const [inputList, setInputList] = useState(viewdata.items)

  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        name: "",
        quantity: 0,
        price: 0,
        total: 0
      },
    ]);
  };

  const handleChange = (e:InputField) => {
    const { name, value } = e.target;
    const newData = { ...invoiceData, [name]: value }
    setInvoiceData(newData);
  }

  const handleSenderChange = (e:InputField) => {
    const { name, value } = e.target;
    const senderAddress = invoiceData.senderAddress
    let newdata = { ...senderAddress, [name]: value }
    setInvoiceData({...invoiceData, senderAddress: newdata});
  }

  const handleClientAddressChange = (e:InputField) => {
    const { name, value } = e.target;
    const clientAddress = invoiceData.clientAddress
    let newdata = { ...clientAddress, [name]: value }
    setInvoiceData({...invoiceData, clientAddress: newdata});
  }

  const handleInputChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const list: InputItems[] = [...inputList];
    if(name === "quantity"){
      list[index].total = Number(value) * Number(list[index].price);
    }
    if(name === "price"){
      list[index].total = Number(list[index].quantity) * Number(value);
    }
    list[index] = { ...list[index], [name]: value };
    setInputList(list)
    const totalcalc = list.reduce((n, { total }) => n+total, 0);
    setInvoiceData({...invoiceData, items: list, total: totalcalc});
  }

  const handleSubmitSave = async (e:any) => {
    let paymentTerms = invoiceData.paymentTerms
    let paymentDue = new Date(Date.now() + Number(paymentTerms) * 24 * 60 * 60 * 1000).toLocaleDateString()
    let newData = {...invoiceData, paymentDue:paymentDue.toString()}
    console.log("newData :: ", newData)
    setInvoiceData((invoicedata:any) => (newData));
  }

  return (
    <>
      <div className={`left-sidebar left-sidebar-animate ${show === false ? "d-none" : ""}`}>
        <div className="left-margin">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-8">
                  <h2>Edit Invoice</h2>
                </div>
                <div className="col-4 text-right">
                  <button className="btn btn-dark btn-sm" onClick={closeSidebar} > X</button>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-12 mb-3 mt-4">
                  <h6 className="text-brand">Bill From</h6>
                </div>
                <Form.Group className="mb-3 col-12" controlId="streetaddress">
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control type="text" placeholder="Street Address" name="street" defaultValue={viewdata.senderAddress.street}
                  onChange={(e) => handleSenderChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3 col-4" controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="City" defaultValue={viewdata.senderAddress.city} name="city" 
                  onChange={(e) => handleSenderChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3 col-4" controlId="postCode">
                  <Form.Label>Post Code</Form.Label>
                  <Form.Control type="text" placeholder="Post Code" defaultValue={viewdata.senderAddress.postCode} name="postCode" 
                  onChange={(e) => handleSenderChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3 col-4" controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" placeholder="Country" defaultValue={viewdata.senderAddress.country} name="country" onChange={(e) => handleSenderChange(e)} />
                </Form.Group>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-12 mb-3 mt-4">
                  <h6 className="text-brand">Bill To</h6>
                </div>
                <Form.Group className="mb-3 col-12" controlId="clientname">
                  <Form.Label>Client's Name</Form.Label>
                  <Form.Control type="text" placeholder="Client's Name" defaultValue={viewdata.clientName} name="clientName" 
                  onChange={(e) => handleChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="clientemail">
                  <Form.Label>Client's Email</Form.Label>
                  <Form.Control type="text" placeholder="Client's Email"defaultValue={viewdata.clientEmail} name="clientEmail" 
                  onChange={(e) => handleChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="street" >
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control type="text" placeholder="Street Address" name="street" defaultValue={viewdata.clientAddress.street} onChange={(e) => handleClientAddressChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3 col-4" controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="City" name="city" defaultValue={viewdata.clientAddress.street} 
                  onChange={(e) => handleClientAddressChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3 col-4" controlId="postCode">
                  <Form.Label>Post Code</Form.Label>
                  <Form.Control type="text" placeholder="Post Code" name="postCode" defaultValue={viewdata.clientAddress.postCode} 
                  onChange={(e) => handleClientAddressChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3 col-4" controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" placeholder="Country" name="country" defaultValue={viewdata.clientAddress.country} 
                  onChange={(e) => handleClientAddressChange(e)} />
                </Form.Group>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="row">
                <Form.Group className="mb-3 col-6" controlId="createdAt">
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control type="text" placeholder="Issue Date" disabled defaultValue={viewdata.createdAt} />
                </Form.Group>
                <Form.Group className="mb-3 col-6" controlId="paymentTerms">
                  <Form.Label>Payment Terms</Form.Label>
                  <Form.Select aria-label="Payment Terms" className="form-control" name="paymentTerms" defaultValue={viewdata.paymentTerms} 
                  onChange={(e) => handleChange(e)} >
                    <option value="Net 30 Days">Net 30 Days</option>
                    <option value="Net 15 Days">Net 15 Days</option>
                    <option value="Net 7 Days">Net 7 Days</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col-12" controlId="description">
                  <Form.Label>Project Description</Form.Label>
                  <Form.Control type="text" placeholder="Project Description" name="description" defaultValue={viewdata.description} 
                  onChange={(e) => handleChange(e)} />
                </Form.Group>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="col-12 mb-3 mt-4">
                <h5 className="text-brand">Item List</h5>
              </div>
              <div className="col-12 mt-4">
                <div className="row">
                  <div className="col-5">
                    <label>Item Name </label>
                  </div>
                  <div className="col-2">
                    <label className="">QTY. </label>
                  </div>
                  <div className="col-2">
                    <label className="">Price</label>
                  </div>
                  <div className="col-2 text-right">
                    <label className="">Total</label>
                  </div>
                </div>
                <div id="kids">
                  {inputList.map((x, i) => {
                    return (
                      <div className="row" key={i}>
                        <div className="form-group col-5">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={x.name}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </div>
                        <div className="form-group col-2">
                          <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            value={x.quantity}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </div>
                        <div className="form-group col-2">
                          <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={x.price}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </div>

                        <div className="form-group col-2 text-right">
                          <h6 className="pt-2">{x.total.toFixed(2)}</h6>
                        </div>
                        {inputList.length !== 1 && (
                          <MdDelete className="remove-icon" onClick={() => handleRemoveClick(i)} />

                        )}
                      </div>
                    );
                  })}
                </div>

                <button className="btn btn-dark btn-block mr-2" onClick={handleAddClick}>
                  + Add New item
                </button>
              </div>
            </div>

            <div className="col-lg-12 my-4">
              <span className="text-left">
              </span>
              <span className="float-right">
                <button className="btn btn-dark mr-2" type="button" onClick={closeSidebar}>
                  Cancel
                </button>
                <button className="btn btn-brand" type="button" onClick={(e) => handleSubmitSave(e)}>
                  Save Changes
                </button>
              </span>
            </div>
        </div>
      </div>
    </>
  );
};

export default EditInvoice;
