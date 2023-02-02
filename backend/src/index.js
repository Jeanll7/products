const express = require("express");

const server = express();

const cors = require("cors");

server.use(express.json());

server.use(cors());

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// function
async function consultarProduto(codigo) {
  return await prisma.produto.findUnique({
    where: {
      codigo,
    },
  });
}

// Get
server.get("/produto", async (req, res) => {
  const produtos = await prisma.produto.findMany();
  return res.json(produtos);
});

// Get
server.get("/produto/:codigo", async (req, res) => {
  const produto = await consultarProduto(req.params.codigo);

  return produto
    ? res.json(produto)
    : res.status(500).json("produto não encontrado");
});

server.post("/produto", async (req, res) => {
  if (consultarProduto(req.body.codigo)) {
    res.status(500).json("produto já cadastrado");
  } else {
    const produto = await prisma.produto.create({
      data: req.body,
    });
    return res.json(produto);
  }
});

server.delete("/produto/:codigo", async (req, res) => {
  if (consultarProduto(req.params.codigo)) {
    const produto = await prisma.produto.delete({
      where: {
        codigo: req.params.codigo,
      },
    });
    res.json(produto);
  } else {
    res.status(500).json("produto não encontrado");
  }
});

server.listen(4003, () => {
  console.log("Server up!!");
});
