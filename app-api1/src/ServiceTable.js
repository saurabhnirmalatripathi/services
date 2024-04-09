import React, { useState, useEffect } from 'react';

function ServiceTable() {
  const mockServices = [
    { name: 'Service 1', status: 'Running' },
    { name: 'Service 2', status: 'Stopped' },
    { name: 'Service 3', status: 'Running' },
  ];

  const [services, setServices] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState({});
  const [error, setError] = useState('');

  // Function to simulate fetching services
  const fetchServices = async () => {
    try {
      // Simulate fetching services from an API
      throw new Error('Simulated fetch error');
    } catch {
      setError('Failed to fetch services. Displaying mock data.');
      setServices(mockServices);
      // Initially, all buttons are enabled
      const initialButtonStates = mockServices.reduce((acc, service) => ({
        ...acc,
        [service.name]: false, // false means the button is not disabled
      }), {});
      setButtonDisabled(initialButtonStates);
    }
  };

  // Function to update service status (simulated)
  const updateServiceStatus = async (serviceName, newStatus) => {
    setButtonDisabled(prevState => ({ ...prevState, [serviceName]: true })); // Disable the button immediately when clicked
    
    // Simulate an API call to update service status
    setTimeout(() => {
      setServices(services.map(service => 
        service.name === serviceName ? { ...service, status: newStatus } : service
      ));
      // Note: We do not re-enable the button here. It stays disabled until the refresh action.
    }, 1000); // Simulating response time
  };

  // Handler for start/stop action
  const handleServiceAction = (serviceName) => {
    const service = services.find(service => service.name === serviceName);
    const newStatus = service.status === 'Running' ? 'Stopped' : 'Running';
    updateServiceStatus(serviceName, newStatus);
  };

  // Refresh handler: re-enable all buttons
  const refreshButtons = () => {
    const resetButtonStates = Object.keys(buttonDisabled).reduce((acc, key) => ({
      ...acc,
      [key]: false, // false means the button is not disabled
    }), {});
    setButtonDisabled(resetButtonStates);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={refreshButtons} style={{ margin: '10px', padding: '10px', backgroundColor: 'lightgray' }}>
        Refresh
      </button>
      <table>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map(({ name, status }) => (
            <tr key={name}>
              <td>{name}</td>
              <td style={{ backgroundColor: status === 'Running' ? '#d4edda' : '#f8d7da' }}>{status}</td>
              <td>
                <button
                  onClick={() => handleServiceAction(name)}
                  disabled={buttonDisabled[name]}
                  style={{
                    backgroundColor: buttonDisabled[name] ? '#cccccc' : (status === 'Running' ? '#f44336' : '#4CAF50'),
                    color: 'white',
                    cursor: buttonDisabled[name] ? 'default' : 'pointer',
                    opacity: buttonDisabled[name] ? 0.5 : 1,
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                  }}
                >
                  {status === 'Running' ? 'Stop' : 'Start'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceTable;
