import { Component } from 'react';

import Main from './features/components/Main';

class App extends Component {
  render() {
    return (
      <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto">
        <Main />
      </div>
    );
  }
}

export default App;
