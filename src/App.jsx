import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./Shared/Routes/PageRoutes";

function App() {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
}

export default App;
