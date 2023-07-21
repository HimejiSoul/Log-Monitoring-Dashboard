import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<UserList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;