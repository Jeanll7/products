import { useEffect, useState } from "react";
import { Table, Form, InputGroup, Row } from "react-bootstrap";
import "./App.css";
import api from "./service/api";

function App() {
  const [produtos, setProdutos] = useState([]);

  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState();
  const [preco, setPreco] = useState();
  const [data, setData] = useState();

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
      <h1 className="text-center mt-3 mb-3 text-1">Prisma</h1>
      <Row>
        <InputGroup className="mb-3  w-25">
          <Form.Control
            placeholder="Nome"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3 w-25">
          <Form.Control
            placeholder="Código"
            type="number"
            value={codigo}
            onChange={(e) => {
              setCodigo(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3 w-25">
          <Form.Control
            placeholder="Preço"
            type="number"
            value={preco}
            onChange={(e) => {
              setPreco(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3 w-25">
          <Form.Control
            placeholder="Data"
            type="number"
            value={data}
            onChange={(e) => {
              setData(e.target.value);
            }}
          />
        </InputGroup>
      </Row>
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
