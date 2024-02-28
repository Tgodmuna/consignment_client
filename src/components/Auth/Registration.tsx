import React, { useState } from "react";

const ShippingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    shipmentType: "personal",
    companyName: "",
    companyAddress: "",
    companyPhoneNumber: "",
    companyRegistrationNumber: "",
  });

  const [Response, setResponse] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch("mnknkjnjk", { method: "POST", body: JSON.stringify(formData) }).then(
      (res) => {
        res.json().then((res) => setResponse(res));
      },
    );
  };

  return (
    <div className='max-w-md mx-auto bg-white p-2 rounded-xl shadow-md border border-lime-300 '>
      <h2 className='text-3xl font-semibold mb-4 my'>Shipping Form</h2>
      <form
        className='w-full bg-neutral-900 rounded-lg py-4 pt-[3rem] px-2 border-[4px] border-cyan-500 '
        onSubmit={handleSubmit}>
        <div className='mb'>
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            className=' input peer '
            required
          />
          <label className={`label ${formData.fullName ? "hidden" : ""}`}>
            Full Name
          </label>
        </div>
        <div className='mb-4'>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className=' input peer '
            required
          />
          <label className={`label ${formData.email ? "hidden" : ""}`}>
            Email
          </label>
        </div>
        <div className='mb-4'>
          <input
            type='tel'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
            className=' input peer '
            required
          />
          <label className={`label ${formData.phoneNumber ? "hidden" : ""}`}>
            Phone Number
          </label>
        </div>
        <div className='mb-4'>
          <textarea
            name='address'
            value={formData.address}
            onChange={handleChange}
            className='w-full border-gray-300 rounded-md px-4 py-2 border peer input'
            rows={3}
            required></textarea>
          <label className='label peer-focus:top-[-8rem]'>Address</label>
        </div>

        {/* business */}
        {formData.shipmentType === "business" && (
          <>
            <div className='mb-4'>
              <input
                type='text'
                name='companyName'
                value={formData.companyName}
                onChange={handleChange}
                className=' input peer '
                required
              />
              <label
                className={`label ${formData.companyName ? "hidden" : ""}`}>
                Company Name
              </label>
            </div>
            <div className='mb-4'>
              <textarea
                name='companyAddress'
                value={formData.companyAddress}
                onChange={handleChange}
                className=' input peer '
                rows={3}
                required></textarea>
              <label className='label peer-focus:top-[-8rem]'>
                Company Address
              </label>
            </div>
            <div className='mb-4'>
              <input
                type='tel'
                name='companyPhoneNumber'
                value={formData.companyPhoneNumber}
                onChange={handleChange}
                className=' input peer '
                required
              />
              <label
                className={`label ${
                  formData.companyPhoneNumber ? "hidden" : ""
                }`}>
                Company Phone Number
              </label>
            </div>
            <div className='mb-4'>
              <input
                type='text'
                name='companyRegistrationNumber'
                value={formData.companyRegistrationNumber}
                onChange={handleChange}
                className=' input peer '
                required
              />
              <label
                className={`label ${
                  formData.companyRegistrationNumber ? "hidden" : ""
                }`}>
                Company Registration Number
              </label>
            </div>
          </>
        )}
        <div className='mb-4'>
          <label className='block mb-1 font-bold text-xl'>Shipment Type</label>
          <select
            name='shipmentType'
            value={formData.shipmentType}
            onChange={handleChange}
            className='w-[10rem] border-gray-300 rounded-md px-4 py-2'>
            <option value='personal'>Personal</option>
            <option value='business'>Business</option>
          </select>
        </div>
        <div className='my-[1rem] pb-5'>
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 border'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
