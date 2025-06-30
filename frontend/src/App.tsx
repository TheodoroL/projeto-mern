import { useState } from 'react';
import './App.css';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Olá mundo</h1>
      <button onClick={() => setCount((e) => e += 1)}> clique aqui {count}</button>
    </>
  )
}
