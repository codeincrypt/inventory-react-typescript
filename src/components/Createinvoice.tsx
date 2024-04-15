import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { MdDelete } from "react-icons/md";

interface CreateInvoiceProps {
  show: boolean,
  closeRightSidebar: any,
}

interface InvoiceData { id: string; createdAt: string; paymentDue: string; description: string; paymentTerms: number; clientName: string; clientEmail: string; senderAddress: { street: string; city: string; postCode: string; country: string; }; clientAddress: { street: string; city: string; postCode: string; country: string; }; items: {name:string, quantity: number, price: number, total: number}[]; total: number; }

interface ErrorData { id: string; createdAt: string; paymentDue: string; description: string; paymentTerms: string; clientName: string; clientEmail: string; senderAddressstreet: string; senderAddresscity: string; senderAddresspostcode: string; senderAddresscountry: string; clientAddressstreet: string; clientAddresscity: string; clientAddresspostcode: string; clientAddresscountry: string; }

interface InputItems {
  name: string,
  quantity: number,
  price: number,
  total: number,
}

const Createinvoice: React.FC<CreateInvoiceProps> = (props) => {
  const show = props.show;
  const closeSidebar = () => {
    props.closeRightSidebar(false);
  };

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({id:"", createdAt:"", paymentDue:"", description:"", paymentTerms:0, clientName:"", clientEmail:"", senderAddress: { street:"", city:"", postCode:"", country:""}, clientAddress: { street:"", city:"", postCode:"", country:"" }, items: [{name:"", quantity:0, price:0, total:0}], total:0})

  const [errors, setErrors] = useState<Partial<ErrorData>>({});
  
  const [inputList, setInputList] = useState([
    {
      name: "",
      quantity: 0,
      price: 0,
      total: 0
    },
  ]);

  interface InputFiels {
    target : {
      name: string,
      value: string
    }
  }
  // eslint-disable-next-line 
  const handleChange = (e:InputFiels) => {
    const { name, value } = e.target;
    const newData = { ...invoiceData, [name]: value }
    setInvoiceData(newData);
  }

  const handleSenderChange = (e:InputFiels) => {
    const { name, value } = e.target;
    const senderAddress = invoiceData.senderAddress
    let newdata = { ...senderAddress, [name]: value }
    setInvoiceData({...invoiceData, senderAddress: newdata});
  }

  const handleClientAddressChange = (e:InputFiels) => {
    const { name, value } = e.target;
    const clientAddress = invoiceData.clientAddress
    let newdata = { ...clientAddress, [name]: value }
    setInvoiceData({...invoiceData, clientAddress: newdata});
  }

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

  const generateId = () => {
    const randomChar = () => String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65); 
    const randomLetter = randomChar() + randomChar()
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    return randomLetter+randomNumber.toString();
  }

  const validateForm = (e:any) => {
    e.preventDefault();
    const newErrors: Partial<ErrorData> = {};
    if (!invoiceData.senderAddress.street) newErrors.senderAddressstreet = 'Street is required';
    if (!invoiceData.senderAddress.city) newErrors.senderAddresscity = 'City is required';
    if (!invoiceData.senderAddress.postCode) newErrors.senderAddresspostcode = 'Post Code is required';
    if (!invoiceData.senderAddress.country) newErrors.senderAddresscountry = 'Country is required';
    if (!invoiceData.clientName) newErrors.clientName = 'Client name is required';
    if (!invoiceData.clientEmail) newErrors.clientEmail = 'Client email-id is required';
    if (!invoiceData.clientAddress.street) newErrors.clientAddressstreet = 'Street is required';
    if (!invoiceData.clientAddress.city) newErrors.clientAddresscity = 'City is required';
    if (!invoiceData.clientAddress.postCode) newErrors.clientAddresspostcode = 'Post Code is required';
    if (!invoiceData.clientAddress.country) newErrors.clientAddresscountry = 'Country is required';
    if (!invoiceData.description) newErrors.description = 'Description is required';
    if (!invoiceData.paymentTerms) newErrors.paymentTerms = 'Payment Terms is required';
    if (!invoiceData.paymentDue) newErrors.paymentDue = 'Payment Due is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log('Form submitted:');
    }
  }

  const handleSubmitSave = async (e:any) => {
    validateForm(e)
    submitForm()
  }

  const handleSubmitDraft = () => submitForm()
  const discardForm = () => {
    setInvoiceData({id:"", createdAt:"", paymentDue:"", description:"", paymentTerms:0, clientName:"", clientEmail:"", senderAddress: { street:"", city:"", postCode:"", country:""}, clientAddress: { street:"", city:"", postCode:"", country:"" }, items: [{name:"", quantity:0, price:0, total:0}], total:0})
    console.log("discardForm", invoiceData)
  }
  
  const submitForm = () => {
    let id = generateId()
    let date = new Date().toLocaleDateString();
    let paymentTerms = invoiceData.paymentTerms
    let paymentDue = new Date(Date.now() + Number(paymentTerms) * 24 * 60 * 60 * 1000).toLocaleDateString()
    let newData = {...invoiceData, paymentDue:paymentDue.toString(), id: id, createdAt: date, status: 'pending'}
    setInvoiceData(newData)
  }

  return (
    <>
      <div className={`left-sidebar left-sidebar-animate ${show === false ? "d-none" : ""}`}>
        <div className="left-margin">
          <form onSubmit={(e) => handleSubmitSave(e)}>
          {/* <p> {JSON.stringify(invoiceData)} </p>  */}
          <div className="col-lg-12">
            <div className="row">
              <div className="col-8">
                <h2>New Invoice</h2>
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
              <Form.Group className="mb-3 col-12" controlId="street">
                <Form.Label>Street Address</Form.Label>
                <Form.Control type="text" defaultValue={invoiceData.senderAddress.street} placeholder="Street Address" name="street"
                onChange={(e) => handleSenderChange(e)} />
                {errors.senderAddressstreet && <div className="error">{errors.senderAddressstreet}</div>}
              </Form.Group>
              <Form.Group className="mb-3 col-4" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" name="city" 
                onChange={(e) => handleSenderChange(e)} />
                {errors.senderAddresscity && <div className="error">{errors.senderAddresscity}</div>}
              </Form.Group>
              <Form.Group className="mb-3 col-4" controlId="postCode">
                <Form.Label>Post Code</Form.Label>
                <Form.Control type="text" placeholder="Post Code" name="postCode" 
                onChange={(e) => handleSenderChange(e)} />
                {errors.senderAddresspostcode && <div className="error">{errors.senderAddresspostcode}</div>}
              </Form.Group>
              <Form.Group className="mb-3 col-4" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Country" name="country" 
                onChange={(e) => handleSenderChange(e)} />
                {errors.senderAddresscountry && <div className="error">{errors.senderAddresscountry}</div>}
              </Form.Group>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-12 mb-3 mt-4">
                <h6 className="text-brand">Bill To</h6>
              </div>
              <Form.Group className="mb-3 col-12" controlId="clientName">
                <Form.Label>Client's Name</Form.Label>
                <Form.Control type="text" placeholder="Client's Name" name="clientName" 
                onChange={(e) => handleChange(e)} />
                {errors.clientName && <div className="error">{errors.clientName}</div>}
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="clientEmail">
                <Form.Label>Client's Email</Form.Label>
                <Form.Control type="text" placeholder="Client's Email" name="clientEmail" 
                onChange={(e) => handleChange(e)} />
                {errors.clientEmail && <div className="error">{errors.clientEmail}</div>}
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="street">
                <Form.Label>Street Address</Form.Label>
                <Form.Control type="text" placeholder="Street Address" name="street" defaultValue={invoiceData.clientAddress.street}
                onChange={(e) => handleClientAddressChange(e)} />
                {errors.clientAddresscountry && <div className="error">{errors.clientAddresscountry}</div>}
              </Form.Group>
              <Form.Group className="mb-3 col-4" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" name="city" defaultValue={invoiceData.clientAddress.city} onChange={(e) => handleClientAddressChange(e)} />
                {errors.clientAddresscountry && <div className="error">{errors.clientAddresscountry}</div>}
              </Form.Group>
              <Form.Group className="mb-3 col-4" controlId="postcode">
                <Form.Label>Post Code</Form.Label>
                <Form.Control type="text" placeholder="Post Code" name="postcode" defaultValue={invoiceData.clientAddress.postCode} onChange={(e) => handleClientAddressChange(e)} />
                {errors.clientAddresscountry && <div className="error">{errors.clientAddresscountry}</div>}
              </Form.Group>
              <Form.Group className="mb-3 col-4" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Country" name="country" defaultValue={invoiceData.clientAddress.country} onChange={(e) => handleClientAddressChange(e)} />
                {errors.clientAddresscountry && <div className="error">{errors.clientAddresscountry}</div>}
              </Form.Group>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="row">
              <Form.Group className="mb-3 col-6" controlId="issuedate">
                <Form.Label>Issue Date</Form.Label>
                <Form.Control type="date" placeholder="Issue Date" name="paymentDue" defaultValue={invoiceData.paymentDue}
                onChange={(e) => handleChange(e)} />
                {errors.paymentDue && <div className="error">{errors.paymentDue}</div>}
              </Form.Group>
              <Form.Group className="mb-3 col-6" controlId="paymentTerms">
                <Form.Label>Payment Terms</Form.Label>
                <Form.Select aria-label="Payment Terms" name="paymentTerms" className="form-control" defaultValue={invoiceData.paymentTerms} onChange={(e) => handleChange(e)} >
                  <option value="30">Net 30 Days</option>
                  <option value="15">Net 15 Days</option>
                  <option value="7">Net 7 Days</option>
                </Form.Select>
                {errors.paymentTerms && <div className="error">{errors.paymentTerms}</div>}
              </Form.Group>
              <Form.Group className="mb-3 col-12" controlId="projectdesc">
                <Form.Label>Project Description</Form.Label>
                <Form.Control type="text" placeholder="Project Description" name="description" defaultValue={invoiceData.description}
                onChange={(e) => handleChange(e)} />
                {errors.description && <div className="error">{errors.description}</div>}
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

          <div className="col-lg-12 mt-4">
            <span className="text-left">
              <button type="button" className="btn btn-primary mr-2 " onClick={discardForm}>
                Discard
              </button>
            </span>
            <span className="float-right">
              <button className="btn btn-dark mr-2" type="button" onClick={handleSubmitDraft} >
                Save as Draft
              </button>
              <button className="btn btn-brand" type="submit">
                Save & Send
              </button>
            </span>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Createinvoice;
