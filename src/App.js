import React from 'react';
import './scss/style.css';
import Page from './Components/Contact/Page';
import Sidebar from './Components/Contact/Sidebar';

function App() {
  return (
    <>
      <section className="sidebar">
        <Sidebar />
      </section>
      <Page />
    </>
  );
}

export default App;
