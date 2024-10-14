import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { trumarket_icp_app_backend } from 'declarations/trumarket-icp-app-backend';

import ShipmentsList from './pages/ShipmentsList';
import ShipmentDetails from './pages/ShipmentDetails';

function App() {
  trumarket_icp_app_backend.getVersion().then((version) => {
    console.log('Version:', version);
  });

  return (
    <Router>
      <Container maxWidth={false} style={{ height: '100vh' }}>
        <Routes>
          <Route path="/" element={<ShipmentsList />} />
          <Route path="/shipment/:id" element={<ShipmentDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
