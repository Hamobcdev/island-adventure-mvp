import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Onboarding from './pages/Onboarding';
import HomeIsland from './pages/HomeIsland';
import AdsHut from './pages/AdsHut';
import Wallet from './pages/Wallet';

const App = () => {
  return (
    <TonConnectUIProvider manifestUrl="island-adventure-p464zfreg-synergy-blockchain-pacific.vercel.app/tonconnect-manifest.json">
      <Router>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<HomeIsland />} />
          <Route path="/ads" element={<AdsHut />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </Router>
      <SpeedInsights />
    </TonConnectUIProvider>
  );
};

export default App;
