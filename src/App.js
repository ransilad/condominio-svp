import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PageContainer from "./pages/PageContainer";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<PageContainer page="dashboard" />} />
          <Route exact path="/feedback" element={<PageContainer page="feedback" />} />
          <Route exact path="/files" element={<PageContainer page="files" />} />
          <Route exact path="/parking" element={<PageContainer page="parking" />} />
          <Route exact path="/users" element={<PageContainer page="users" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
