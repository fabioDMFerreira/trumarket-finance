import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { trumarket_icp_app_backend } from 'declarations/trumarket-icp-app-backend';

import ShipmentsList from './pages/ShipmentsList';
import ShipmentDetails from './pages/ShipmentDetails';
import Scaffold from './components/Scaffold';
import { useEffect, useState } from 'react';

function App() {
  const [test, setTest] = useState<boolean>(false);

  useEffect(() => {
    trumarket_icp_app_backend.getVersion().then((version) => {
      console.log('Version:', version);
    });

    localStorage.getItem('test') === 'true' ? setTest(true) : setTest(false);
  });

  return (
    <Scaffold>
      <Router>
        <Routes>
          <Route path="/" element={<ShipmentsList test={test} />} />
          <Route
            path="/shipments/:id"
            element={<ShipmentDetails test={test} />}
          />
        </Routes>
      </Router>
    </Scaffold>
  );
}

export default App;
