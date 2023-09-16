import React, { useState, useEffect } from 'react';

function Alert({ message }) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (message) {
      setShowAlert(true);

      // Auto-hide the alert after 3 seconds
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      // Clear the message when unmounting
      setShowAlert(false);
    }
  }, [message]);

  return (
    showAlert && (
      <div className="full-screen-alert">
        <p>{message}</p>
      </div>
    )
  );
}

export default Alert;
