const fs = require("fs");
const path = require("path");

const pastaImagens = path.join(__dirname, "imagens");

const baseUrl =
  "https://raw.githubusercontent.com/accium-hub/accium-catalogo/main/catalogo/imagens/";

const arquivos = fs.readdirSync(pastaImagens);

const produtos = arquivos
  .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
  .map((file) => {
    const nomeFormatado = file
      .replace(/\.[^/.]+$/, "")
      .replace(/-/g, " ");

    return {
      nome: nomeFormatado,
      imagem: baseUrl + file,
      descricao: "Produto metálico sob medida",
    };
  });

fs.writeFileSync(
  path.join(__dirname, "produtos.json"),
  JSON.stringify(produtos, null, 2)
);

console.log("JSON gerado com sucesso!");
