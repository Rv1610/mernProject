import './App.css';
import React, { useState, useEffect } from 'react';
import Alert from '../src/components/Alert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import logo from '../src/assets/Logos.png'; // Replace with the correct path to your logo image

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
  const [submittedUsername, setSubmittedUsername] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const [h1Text, setH1Text] = useState('⏰HurryUp! Few Seats Left');
  const [pricing, setPricing] = useState('');


useEffect(() => {
  const messages = [
    '⏰HurryUp! Few Seats Left',
    'Registrations are Open!',
    'Navratri Special Offer'
  ];
  
  let currentIndex = 0;

  const interval = setInterval(() => {
    setH1Text(messages[currentIndex]);
    currentIndex = (currentIndex + 1) % messages.length;
  }, 2000);

  return () => clearInterval(interval);
}, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'age') {
      setPricing(calculatePricing(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowSpinner(true);
    setSubmissionMessage('Please wait, your submission is in processing...');

    for (const key in formData) {
      if (formData[key] === '') {
        setShowSpinner(false);
        setSubmissionMessage('');
        alert('Fill in all fields. All fields are mandatory.');
        return;
      }
    }

    const mobileNumberPattern = /^[0-9]{10}$/;

    if (!mobileNumberPattern.test(formData.mobile)) {
      setShowSpinner(false);
      setSubmissionMessage('');
      alert('Invalid mobile number. Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      const response = await axios.post(
        'https://backend-9t1f.onrender.com/submit-form',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setShowSpinner(false);
        setSubmissionMessage(`Hare Krishna 🙏🏻 ${formData.username} Ji! Your form is submitted successfully!`);
        setSubmitSuccess(true);
        setSubmittedUsername(formData.username);
        setFormData(initialFormData);
      } else {
        setShowSpinner(false);
        setSubmissionMessage('');
        alert('Form submission failed. Please try again.');
      }
    } catch (error) {
      setShowSpinner(false);
      setSubmissionMessage('');
      alert('An error occurred while submitting the form. Please try again later.');
      console.error(error);
    }
  };

  const handleEmailButtonClick = () => {
    const subject = encodeURIComponent('User Query');
    const body = encodeURIComponent('Please describe your query here.');
    const mailtoLink = `mailto:rakar2317@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const handleWhatsAppButtonClick = () => {
    const phoneNumber = '918800980768';
    const whatsappURL = `https://wa.me/${phoneNumber}`;
    window.open(whatsappURL);
  };

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
          <source src={require("../src/assets/krishnaVideo.mp4")} type="video/mp4" />
        </video>
      </div>
      <div className="header">
  <img src={logo} alt="Hare Krishna Dance Academy Logo" className="academy-logo" />
</div>

      <h1 style={{ width: '400px' }}>{h1Text}</h1>
      <form className="form-container" onSubmit={handleSubmit}>
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
      <p className="query-message">Have a question or need assistance? Contact our support team through WhatsApp or Email:</p>
      <div className="support-icons-container">
        <FontAwesomeIcon icon={faEnvelope} className="email-icon" onClick={handleEmailButtonClick} />
        <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" onClick={handleWhatsAppButtonClick} />
      </div>

      {showSpinner && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>{submissionMessage}</p>
        </div>
      )}

      {submitSuccess && (
        <Alert message={`Hare Krishna 🙏🏻 ${submittedUsername} Ji! Your form is submitted successfully!`} />
      )}
    </>
  );
}

export default App;
