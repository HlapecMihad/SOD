import { useEffect, useState } from 'react'
import './App.css'

function App() {
   const [message, setMessage] = useState<string | null>(null);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      fetch('http://localhost:8000/index.php', {
        method: 'GET', // or 'POST' if you want
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            setMessage(data.message); // Display the success message
          } else {
            setError(data.message); // Display the error message
          }
        })
        .catch((err) => {
          setError('Failed to connect to the backend');
          console.error(err);
        });
    }, []);
   return (
      <div className="card">
        {/* Display the success or error message */}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
   )
}

export default App
