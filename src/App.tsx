import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './features/components/footer/Footer';
import AboutUs from './features/pages/AboutUs/AboutUs';
import authorData from './features/pages/AboutUs/authorData';
import Main from './features/pages/Main';
import NotFound from './features/pages/NotFound';
import { cn } from './libs/utils';

export default function App() {
  return (
    <BrowserRouter>
      <div
        className={cn(
          'flex min-h-screen w-full flex-col justify-between overflow-x-hidden overflow-y-auto p-10 max-md:p-5',
          '@container'
        )}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<AboutUs author={authorData[0]} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
