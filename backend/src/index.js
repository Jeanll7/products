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
  return res.json(produto);
});

server.listen(4003, () => {
  console.log("Server up!!");
});
