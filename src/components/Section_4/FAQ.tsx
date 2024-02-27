import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  const faqs = [
  {
    question: "What is the average delivery time for domestic shipments?",
    answer: "The average delivery time for domestic shipments is typically 1-3 business days, depending on the destination and shipping method chosen."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping services to over 200 countries worldwide. You can choose from a variety of shipping options based on your needs."
  },
  {
    question: "How can I track my shipment?",
    answer: "You can track your shipment by entering the tracking number provided to you at the time of booking on our website. Alternatively, you can contact our customer support team for assistance."
  },
  {
    question: "What is the maximum weight limit for a single package?",
    answer: "The maximum weight limit for a single package varies depending on the destination and shipping method. Please refer to our website or contact customer support for specific weight limits."
  },
  {
    question: "Do you offer insurance for shipments?",
    answer: "Yes, we offer insurance options for shipments to provide coverage against loss, damage, or theft during transit. You can choose the level of insurance based on your preferences."
  },
  {
    question: "Are there any restrictions on items that can be shipped?",
    answer: "Yes, there are restrictions on certain items that can be shipped due to safety, regulatory, or legal reasons. Please refer to our list of prohibited items or contact customer support for more information."
  },
  {
    question: "Can I schedule a specific delivery time?",
    answer: "Yes, you can schedule a specific delivery time for your shipment based on availability and service options. Additional charges may apply for premium delivery services."
  },
  {
    question: "How do I request a return or exchange?",
    answer: "You can request a return or exchange by contacting our customer support team and providing your order details. We will guide you through the process and assist with any necessary arrangements."
  },
  {
    question: "Do you offer bulk shipping discounts?",
    answer: "Yes, we offer bulk shipping discounts for customers shipping large volumes of packages. Please contact our sales team for customized pricing and solutions."
  },
  {
    question: "What steps do you take to ensure package security?",
    answer: "We take several measures to ensure package security, including package tracking, signature confirmation for delivery, and secure packaging materials. Additionally, we conduct regular audits and training for our staff to prevent theft or mishandling."
  }
];


  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='max-w-md mx-auto gap-3'>
      <div className='mt-6 p-2'>
        <div className='flex flex-col'>
          <h1 className='text-xl font-extrabold text-center uppercase m-auto'>
            Frequently asked questions
          </h1>
          <div className='w-[18rem] bg-green-400 p-[3px] rounded-xl border border-white m-auto mt-1'></div>
        </div>
        {faqs.map((faq, index) => (
          <div key={index} className='border-b py-4 m-2'>
            <div
              className='flex justify-between items-center cursor-pointer p-[1rem] even:bg-slate-200 odd:bg-slate-100'
              onClick={() => handleToggle(index)}>
              <div className='text-lg font-semibold'>{faq.question}</div>
              <svg
                className={`w-6 h-6 transition-transform transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d={openIndex === index ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </div>
            {openIndex === index && (
              <div className='mt-2 text-gray-700'>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
