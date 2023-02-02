const express = require("express");

const server = express();

const cors = require("cors");

server.use(express.json());

server.use(cors());

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
  const existeCodigo = await prisma.produto.findUnique({
    where: {
      codigo: req.body.codigo,
    },
  });

  if (existeCodigo) {
    res.status(500).json("produto já cadastrado");
  } else {
    const produto = await prisma.produto.create({
      data: req.body,
    });
    return res.json(produto);
  }
});

async function isConsultarProduto(preco) {
  return await prisma.produto.findUnique({
    where: {
      codigo,
    },
  });
}

server.delete("/produto/:codigo", async (req, res) => {
  const existeCodigo = await prisma.produto.findUnique({
    where: {
      codigo: req.params.codigo,
    },
  });

  if (existeCodigo) {
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
