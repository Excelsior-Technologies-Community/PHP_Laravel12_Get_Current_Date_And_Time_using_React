import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import DateTimeDisplay from './components/DateTimeDisplay';

function App() {
    return <DateTimeDisplay />;
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);