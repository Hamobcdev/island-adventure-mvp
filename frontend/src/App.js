import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Onboarding from './pages/Onboarding';
import HomeIsland from './pages/HomeIsland';
import AdsHut from './pages/AdsHut';
import Wallet from './pages/Wallet';
import { Builder } from '@ton/ton';

const App = () => {
  return (
    <TonConnectUIProvider manifestUrl="https://island-adventure-orcxo0gu1-synergy-blockchain-pacific.vercel.app/tonconnect-manifest.json">
      <Router>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<HomeIsland />} />
          <Route path="/ads" element={<AdsHut />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </Router>
    </TonConnectUIProvider>
  );
};

export default App;
