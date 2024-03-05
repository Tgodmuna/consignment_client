import React, { useState } from "react";

const NotificationAndEmail = () => {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const handlePushNotification = () => {
    // Logic to push notification to users
    console.log("Pushed notification:", notificationMessage);
    // You can implement the logic to send the notification to users here
    alert("Notification pushed successfully!");
  };

  const handleComposeEmail = () => {
    // Logic to compose email to users
    console.log("Composed email - Subject:", emailSubject);
    console.log("Composed email - Body:", emailBody);
    // You can implement the logic to compose and send the email to users here
    alert("Email composed successfully!");
  };

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Push Notification</h2>
      <textarea
        className='w-full h-24 p-2 mb-4 border border-gray-300 rounded'
        placeholder='Enter notification message'
        value={notificationMessage}
        onChange={(e) => setNotificationMessage(e.target.value)}
      />
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'
        onClick={handlePushNotification}>
        Push Notification
      </button>

      <h2 className='text-xl font-semibold mt-8 mb-4'>Compose Email</h2>
      <input
        type='text'
        className='w-full p-2 mb-4 border border-gray-300 rounded'
        placeholder='Email Subject'
        value={emailSubject}
        onChange={(e) => setEmailSubject(e.target.value)}
      />
      <textarea
        className='w-full h-24 p-2 mb-4 border border-gray-300 rounded'
        placeholder='Email Body'
        value={emailBody}
        onChange={(e) => setEmailBody(e.target.value)}
      />
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'
        onClick={handleComposeEmail}>
        Compose Email
      </button>
    </div>
  );
};

export default NotificationAndEmail;
