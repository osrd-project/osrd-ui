import React from 'react';
import CheckboxList from './components/inputs/CheckboxList';

function App() {
  return (
    <div >
      <CheckboxList small items={[
        { id: '1', label: 'Item 1' },
        { id: '2', label: 'Item 2' },
        { id: '3', label: 'Item 3' },
      ]} />
    </div>  
  );
}

export default App;
