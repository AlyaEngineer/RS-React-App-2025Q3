import { BrowserRouter, Routes, Route } from 'react-router';

import Main from './features/pages/Main';
import { cn } from './libs/utils';

export default function App() {
    return (
      <BrowserRouter>
        <div
        className={cn(
          'min-h-screen w-full overflow-x-hidden overflow-y-auto p-10 max-md:p-5',
          '@container'
        )}
      >
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
      </BrowserRouter>
    );
  }
