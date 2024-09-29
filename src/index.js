import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import './index.css';
import './components/OS/OS.css';
import App from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <PrimeReactProvider>
    <App />
    </PrimeReactProvider>
</React.StrictMode>
);