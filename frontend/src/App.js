import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./App.css";
// import api from "./service/api";

function App() {
  const [produtos, setProdutos] = useState([
    {
      nome: "mouse",
      codigo: "2233",
      preco: "80",
      data: "2023-02-02T00:01:12.711Z",
    },
  ]);

  useEffect(() => {
    // alert("GET");
  }, []);

  return (
    <div className="container">
      <h3 className="text-center mt-3 mb-2">Prisma</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>nome_produto</th>
            <th>código</th>
            <th>preço</th>
            <th>data</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => {
            return (
              <tr>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
