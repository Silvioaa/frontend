import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './Page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page/>}/>
        <Route path="/add" element={<Page/>}/>
        <Route path="/edit/:id" element={<Page/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
