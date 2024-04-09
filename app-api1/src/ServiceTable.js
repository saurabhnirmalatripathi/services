import React, { useState, useEffect } from 'react';

function ServiceTable() {
  const mockServices = [
    { name: 'Service 1', status: 'Running' },
    { name: 'Service 2', status: 'Stopped' },
    { name: 'Service 3', status: 'Running' },
  ];

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState({});
  const [error, setError] = useState('');

  // Simulate fetching services from an API
  const fetchServices = async () => {
    try {
      // Simulating an API call failure
      throw new Error('Network response was not ok');

      // This is where the actual fetch call would go
      // const response = await fetch('https://example.com/api/services');
      // const data = await response.json();
      // setServices(data);
      // setError('');
    } catch (error) {
      console.error('Failed to fetch services:', error.message);
      setServices(mockServices); // Fallback to mock data
      setError('Failed to fetch services. Displaying mock data.'); // Display an error message
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const updateServiceStatus = async (serviceName, action) => {
    setLoading((prev) => ({ ...prev, [serviceName]: true }));

    try {
      // Here you'd make an actual API call to update the service status
      // For now, we simulate an API response after a delay
      setTimeout(() => {
        const updatedStatus = action === 'start' ? 'Running' : 'Stopped';
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.name === serviceName ? { ...service, status: updatedStatus } : service
          )
        );
        setLoading((prev) => ({ ...prev, [serviceName]: false }));
      }, 1000);
    } catch (error) {
      console.error('Error updating service status:', error);
      setLoading((prev) => ({ ...prev, [serviceName]: false }));
    }
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={fetchServices} style={{ marginBottom: '10px', backgroundColor: '#4CAF50', color: 'white', padding: '10px 24px', borderRadius: '5px', cursor: 'pointer' }}>Refresh Services</button>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.name}>
                <td>{service.name}</td>
                <td>{service.status}</td>
                <td>
                  <button
                    disabled={loading[service.name]}
                    onClick={() => updateServiceStatus(service.name, service.status === 'Running' ? 'stop' : 'start')}
                    style={{
                      backgroundColor: service.status === 'Running' ? '#f44336' : '#4CAF50',
                      color: 'white',
                      cursor: 'pointer',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      opacity: loading[service.name] ? 0.5 : 1,
                    }}
                  >
                    {loading[service.name] ? 'Processing...' : service.status === 'Running' ? 'Stop' : 'Start'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceTable;
