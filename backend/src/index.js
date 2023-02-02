const express = require("express");

const server = express();

const cors = require("cors");

server.use(express.json());

server.use(cors());

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// function consultarPreco(preco) {
//   return prisma.produto.findUnique({
//     where: {
//       preco,
//     },
//   });
// }

// Get
server.get("/produto", async (req, res) => {
  const produtos = await prisma.produto.findMany();
  return res.json(produtos);
});

// Get
server.get("/produto/:codigo", async (req, res) => {
  const { codigo } = req.params;
  const produto = await prisma.produto.findUnique({
    where: {
      codigo,
    },
  });

  // if (produto) {
  //   return res.json(produto);
  // } else {
  //   return res.status(500).json("produto não encontrado");
  // }
  return produto
    ? res.json(produto)
    : res.status(500).json("produto não encontrado");
});

server.post("/produto", async (req, res) => {
  const produto = req.body;

  const produtoPrisma = await prisma.produto.create({
    data: produto,
  });

  return res.json(produtoPrisma); // Cadastrar novo registro no banco de dados
});

server.listen(4003, () => {
  console.log("Server up!!");
});
