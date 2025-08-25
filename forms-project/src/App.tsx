import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Button } from './components/Button';
import { FormCard } from './components/FormCard';
import { FormContent } from './components/FormContent';
import { useFormStore } from './store/useFormDataStore';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [uncontrolled, setUncontrolled] = useState(true);

  const uncontrolledForm = useFormStore((state) => state.uncontrolledForm);
  const hookForm = useFormStore((state) => state.hookForm);

  const [highlighted, setHighlighted] = useState<string | null>(null);

  const openUncontrolled = () => {
    setUncontrolled(true);
    setModalOpen(true);
  };

  const openHookForm = () => {
    setUncontrolled(false);
    setModalOpen(true);
  };

  useEffect(() => {
    if (uncontrolledForm) {
      setHighlighted('uncontrolled');
      const timer = setTimeout(() => setHighlighted(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [uncontrolledForm]);

  useEffect(() => {
    if (hookForm) {
      setHighlighted('hook');
      const timer = setTimeout(() => setHighlighted(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [hookForm]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-10">
      <div className="flex w-full justify-around gap-6 max-md:flex-col">
        <Button
          onClick={openUncontrolled}
          className="bg-button-background hover:bg-button-background-hover"
        >
          Uncontrolled Form
        </Button>

        <Button onClick={openHookForm} className="bg-button-reload hover:bg-button-reload-hover">
          React Hook Form
        </Button>
      </div>

      <div className="flex w-full justify-around gap-6 max-md:flex-col">
        {uncontrolledForm && (
          <FormCard
            data={uncontrolledForm}
            highlighted={highlighted === 'uncontrolled'}
            title="Uncontrolled Form"
          />
        )}
        {hookForm && (
          <FormCard data={hookForm} highlighted={highlighted === 'hook'} title="React Hook Form" />
        )}
      </div>

      {modalOpen &&
        createPortal(
          <FormContent onClose={() => setModalOpen(false)} uncontrolled={uncontrolled} />,
          document.body
        )}
    </div>
  );
}
