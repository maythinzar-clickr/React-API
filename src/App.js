import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/HeaderNav';
import ProductPage from './pages/ProductPage';
import ProductOperation from './pages/OperateForm';
import ProductList from './components/ProductList';
const App = () => {
  return (
    <BrowserRouter>
      <div className="font-sans bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/create" element={<ProductOperation />} />
              <Route path="/update/:id" element={<ProductOperation />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;