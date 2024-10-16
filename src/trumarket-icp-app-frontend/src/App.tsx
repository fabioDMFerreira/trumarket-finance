import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { trumarket_icp_app_backend } from 'declarations/trumarket-icp-app-backend';

import ShipmentsList from './pages/ShipmentsList';
import ShipmentDetails from './pages/ShipmentDetails';
import Scaffold from './components/Scaffold';

function App() {
  trumarket_icp_app_backend.getVersion().then((version) => {
    console.log('Version:', version);
  });

  return (
    <Scaffold>
      <Router>
        <Routes>
          <Route path="/" element={<ShipmentsList />} />
          <Route path="/shipments/:id" element={<ShipmentDetails />} />
        </Routes>
      </Router>
    </Scaffold>
  );
}

export default App;
