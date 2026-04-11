const fs = require("fs");
const path = require("path");

// 🔥 URL do seu Google Sheets via OpenSheet
const URL =
  "https://opensheet.elk.sh/1LRBI178V3LQn5cBtV8eeh4TgZde4iS4RuUB1_1aCdI4/produtos";

async function gerarJSON() {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    const produtos = data
      .filter((p) => p.id && p.nome)
      .map((p) => ({
        id: Number(p.id),
        nome: p.nome,
        categoria: p.categoria,
        descricao: p.descricao,
        imagem: p.imagem,
      }));

    fs.writeFileSync(
      path.join(__dirname, "produtos.json"),
      JSON.stringify(produtos, null, 2)
    );

    console.log("JSON gerado a partir do Google Sheets!");
  } catch (error) {
    console.error("Erro ao gerar JSON:", error);
  }
}

gerarJSON();
