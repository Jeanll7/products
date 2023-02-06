import { useEffect, useState } from "react";
import { Table, Form, InputGroup, Navbar, Button } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import "./App.css";
import moment from "moment";
import api from "./service/api";

function App() {
  const [produtos, setProdutos] = useState([]);

  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState();
  const [preco, setPreco] = useState();
  // const [data, setData] = useState();

  useEffect(() => {
    bucarProdutos();
  }, []);

  async function bucarProdutos() {
    await api.get("/produto").then((response) => {
      setProdutos(response.data);
    });
  }

  async function cadastrarProduto() {
    const produto = {
      nome,
      codigo,
      preco,
    };

    await api
      .post("/produto", produto)
      .then((response) => {
        setProdutos([...produtos, response.data]);
        alert("Produto cadastrado com sucesso!");
        limparForm();
      })
      .catch(() => {
        alert("Produto já cadastrado");
      });
  }

  async function excluirProduto(codigo) {
    await api.delete(`/produto/${codigo}`).then(() => {
      bucarProdutos();
      alert("Produto excluido com sucesso!");
    });
  }

  function limparForm() {
    setNome("");
    setCodigo("");
    setPreco("");
  }

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-3 text-1">Cadastrar Produto</h1>
      <Navbar className="nav gap-2 d-row">
        <InputGroup className="mb-3  w-25">
          <Form.Control
            className="input"
            placeholder="Nome"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3 w-25">
          <Form.Control
            className="input"
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
            className="input"
            placeholder="Preço"
            type="number"
            value={preco}
            onChange={(e) => {
              setPreco(e.target.value);
            }}
          />
        </InputGroup>
        <div className="mb-3">
          <Button onClick={cadastrarProduto}>Salvar</Button>
        </div>
      </Navbar>
      <Table className="table" striped hover variant="dark">
        <thead>
          <tr>
            <th>id</th>
            <th>nome_produto</th>
            <th>código</th>
            <th>preço</th>
            <th>data_hora</th>
            <th>excluir</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => {
            return (
              <tr>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.codigo}</td>
                <td>R$ {p.preco}</td>
                <td>{moment(p.data).format("DD/MM/YYYY _ h:mm a")}</td>
                <td>
                  <Button
                    className="button"
                    onClick={() => {
                      excluirProduto(p.codigo);
                    }}
                  >
                    <FiTrash2 />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
