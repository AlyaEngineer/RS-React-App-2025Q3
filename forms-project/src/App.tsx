import { Button } from './components/Button';

export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-10 p-10 max-md:flex-col">
      <Button className="bg-button-background hover:bg-button-background-hover">
        Uncontrolled Form
      </Button>

      <Button className="bg-button-reload hover:bg-button-reload-hover">
        React Hook Form
      </Button>
    </div>
  );
}
