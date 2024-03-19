import React from 'react';
import Tree from './components/inputs/checkbox/Tree';

function App() {
  return (
    <div >
      <Tree  items={[
    {id: 1, 
    name: 'foo', 
    items: [
        {
          id: 2, 
          name: 'foo2',
          items: [{id: 3, name: 'foo3'}, {id: 4, name: 'foo4'}]}, 
        {id: 5, name: 'foo5', items: [{id: 6, name: 'foo6', items: [{id: 8, name: 'foo8'}, {id: 9, name: 'foo9', }]}]}
    ]},
    {id: 7, name: 'foo7'}
]} />
    </div>  
  );
}

export default App;
