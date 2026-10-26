import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import AddBakery from './pages/AddBakery.jsx';
import BakeryList from './pages/BakeryList.jsx';

export default function App() {
  return (
    <>
      <NavBar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBakery />} />
          <Route path="/bakeries" element={<BakeryList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="text-center text-muted small py-4">
        Bakery Manager &middot; React + Spring Boot + Docker
      </footer>
    </>
  );
}
