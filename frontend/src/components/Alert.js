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
    }
  }, [message]);

  return (
    showAlert && (
      <div className="alert">
        <p>{message}</p>
      </div>
    )
  );
}

export default Alert;
