import { Suspense } from 'react';
import CountryList from './components/CountryList';
import Spinner from './components/ui/Spinner';

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <CountryList />
    </Suspense>
  );
}
