import { useState } from 'react';
import { createPortal } from 'react-dom';

import { Button } from './components/Button';
import { FormContent } from './components/FormContent';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [uncontrolled, setUncontrolled] = useState(true);

  const openUncontrolled = () => {
    setUncontrolled(true);
    setModalOpen(true);
  };

  const openHookForm = () => {
    setUncontrolled(false);
    setModalOpen(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center gap-10 p-10 max-md:flex-col">
      <Button
        onClick={openUncontrolled}
        className="bg-button-background hover:bg-button-background-hover"
      >
        Uncontrolled Form
      </Button>

      <Button onClick={openHookForm} className="bg-button-reload hover:bg-button-reload-hover">
        React Hook Form
      </Button>

      {modalOpen &&
        createPortal(
          <FormContent onClose={() => setModalOpen(false)} uncontrolled={uncontrolled} />,
          document.body
        )}
    </div>
  );
}
