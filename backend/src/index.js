const express = require("express");

const server = express();

const cors = require("cors");

server.use(express.json());

server.use(cors());

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function consultarPreco(preco) {
  return prisma.produto.findUnique({
    where: {
      preco,
    },
  });
}

server.get("/produto", async (req, res) => {
  const produtos = await prisma.produto.findMany();

  return res.json(produtos);
});

server.get("/produto/:preco", async (req, res) => {
  const produto = await consultarPreco(req.params.preco);

  return produto
    ? res.json(produto)
    : res.status(500).json("produto não encontrado");
});

server.listen(4003, () => {
  console.log("Server up!");
});
