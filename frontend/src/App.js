import './App.css';
import React, { useState, useEffect } from 'react';
import Alert from '../src/components/Alert';
import axios from 'axios'; // Import Axios

function App() {
  const initialFormData = {
    username: '',
    mobile: '',
    email: '',
    address: '',
    age: '',
    danceForm: '',
    batch: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // State to manage the text in <h1>
  const [h1Text, setH1Text] = useState('⏰HurryUp! Few Seats Left');

  // Pricing information based on age range
  const [pricing, setPricing] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      // Toggle between "Hurry Up!" and "Registrations are Open!"
      setH1Text((prevText) =>
        prevText === '⏰HurryUp! Few Seats Left' ? 'Registrations are Open!' : '⏰HurryUp! Few Seats Left'
      );
    }, 2000); // Change text every 2 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update pricing information based on selected age
    if (name === 'age') {
      setPricing(calculatePricing(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    for (const key in formData) {
      if (formData[key] === '') {
        alert('Fill in all fields. All fields are mandatory.');
        return; // Prevent form submission
      }
    }
  
    try {
      const response = await axios.post(
        // 'http://localhost:3001/submit-form', // Replace with your backend URL
        'https://mern-project-backend-silk.vercel.app/submit-form', // Replace with your backend URL
        formData, // Your form data here
        {
          withCredentials: true, // Enable credentials (cookies)
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setSubmitSuccess(true);
        console.log('Form submitted successfully');
        // Clear the form
        setFormData(initialFormData);
      } else {
        alert('Form submission failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while submitting the form. Please try again later.');
      console.error(error);
    }
  };
  
  const handleEmailButtonClick = () => {
    const subject = encodeURIComponent('User Query'); // Encode the subject
    const body = encodeURIComponent('Please describe your query here.'); // Encode the body text

    // Construct the mailto link with recipient, subject, and body
    const mailtoLink = `mailto:ananyakashyap0508@gmail.com?subject=${subject}&body=${body}`;

    // Open the user's default email client with the pre-filled email
    window.location.href = mailtoLink;
  };

  // Calculate pricing based on age range
  const calculatePricing = (selectedAge) => {
    switch (selectedAge) {
      case '06-10':
        return 'Rs. 999 to Rs. 1499 Per Month';
      case '10-25':
        return 'Rs. 1499 to Rs. 1999 Per Month';
      case '25-40':
        return 'Rs. 1999 to Rs. 2499 Per Month';
      case '40+':
        return 'Rs. 1999 Per Month';
      default:
        return '';
    }
  };

  return (
        <>
         <div className="background-video">
        <video autoPlay muted loop>
          <source src={require("../src/assets/theme.mp4")} type="video/mp4" />
          {/* You can provide multiple source elements for different video formats */}
        </video>
        </div>
    <div className="header">
        <h1 className="academy-name">Hare Krishna Dance Academy</h1>
      </div>
      <h1 style={{ width: '400px', margin: '0 auto' }}>{h1Text}</h1>
      <form className="form-container"  onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Full Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your name"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile No.:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            placeholder="Enter your mobile no."
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <select id="age" name="age" value={formData.age} onChange={handleInputChange} required>
            <option value="">Select Age</option>
            <option value="06-10">06-10</option>
            <option value="10-25">10-25</option>
            <option value="25-40">25-40</option>
            <option value="40+">40+</option>
          </select>
        </div>
        <div>
          <label htmlFor="danceForm">Dance Form:</label>
          <select
            id="danceForm"
            name="danceForm"
            value={formData.danceForm}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Dance Form</option>
            <option value="Katthak">Katthak</option>
            <option value="Bhangra">Bhangra</option>
            <option value="Free style">Free style</option>
            <option value="Zumba">Zumba</option>
            <option value="Garba">Garba</option>
          </select>
        </div>
        <div>
          <label htmlFor="batch">Batch:</label>
          <select id="batch" name="batch" value={formData.batch} onChange={handleInputChange} required>
            <option value="">Select Batch</option>
            <option value="Mon-Tue">Monday-Friday</option>
            <option value="Sat-Sun">Saturday-Sunday</option>
          </select>
        </div>
        <div className="price-container">
          <label className="price-label">Price As per Age:</label>
          <span className="price-value">{pricing}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p className="query-message">Have a question or need assistance? Contact our support team:</p>
      <button className="contact-support-button" onClick={handleEmailButtonClick}>
  Contact Support
</button>

      {submitSuccess && <Alert message="Your form has been submitted successfully!" />}
    </>
  );
}

export default App;
