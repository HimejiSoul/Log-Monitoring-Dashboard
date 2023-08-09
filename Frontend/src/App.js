import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import Summary from "./components/Summary";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/Summary" element={<Summary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;