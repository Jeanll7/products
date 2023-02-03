import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./App.css";
import api from "./service/api";

function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    bucarProdutos();
  }, []);

  async function bucarProdutos() {
    await api.get("/produto").then((response) => {
      setProdutos(response.data);
    });
  }

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
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.codigo}</td>
                <td>${p.preco}</td>
                <td>{p.data}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
