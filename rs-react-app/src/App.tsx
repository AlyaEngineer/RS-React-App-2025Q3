import { Component } from 'react';

import Main from './features/components/Main';
import { cn } from './libs/utils';

class App extends Component {
  render() {
    return (
      <div
        className={cn(
          'min-h-screen w-full overflow-x-hidden overflow-y-auto p-10 max-md:p-5',
          '@container'
        )}
      >
        <Main />
      </div>
    );
  }
}

export default App;
