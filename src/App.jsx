import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/auth/auth-layout";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
