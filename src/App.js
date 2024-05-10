import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
            <Routes>
                <Route index element={<h1>hello world</h1>}></Route>
                <Route></Route>
                <Route></Route>
                <Route></Route>
            </Routes>
      </div>
    </Router>
  );
}

export default App;