import React from 'react';
import BubbleSort from './methods/BubbleSort';
import MergeSort from './methods/MergeSort';
import QuickSort from './methods/QuickSort';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  const generateArray = () => {
    return [...Array(6)].map(_=>Math.ceil((Math.random()*40) + 10));
  }
  const timeout = 500;

  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/bubble-sort">Bubble Sort</Link></li>
            <li><Link to="/merge-sort">Merge Sort</Link></li>
            <li><Link to="/quick-sort">Quick Sort</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/bubble-sort">
            <BubbleSort generateArray={generateArray} timeout={timeout} />
          </Route>
          <Route path="/merge-sort">
            <MergeSort generateArray={generateArray} timeout={timeout} />
          </Route>
          <Route path="/quick-sort">
            <QuickSort generateArray={generateArray} timeout={timeout} />
          </Route>
          <Route path="/">
            Home Page
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
