import { useEffect } from "react";
import "./App.css";
import api from "./service/api";

function App() {
  useEffect(() => {
    alert("GET");
  }, []);

  return (
    <div className="App">
      <h3>Prisma</h3>
    </div>
  );
}

export default App;
