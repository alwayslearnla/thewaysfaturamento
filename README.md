# The Ways - Controle de recebimentos

App web (PWA) para controlar recebimentos de clientes e repasse ao parceiro.

- Os dados dos clientes ficam **somente no navegador/aparelho** de quem usa. Nada é enviado ao GitHub.
- Para levar os dados de um aparelho para outro, use **Exportar planilha** num e **Importar planilha** no outro.
- **Nunca suba para este repositório planilhas exportadas** (contêm dados de clientes).
- O menu **Anonimizador de documentos** lê os extratos só no navegador; nenhum arquivo de cliente é enviado. A pasta `lib/` traz as bibliotecas públicas de PDF e zip que ele usa (pdf.js 3.11.174, jsPDF 2.5.1, JSZip 3.10.1).
- **Nunca suba para este repositório extratos, faturas, arquivos anonimizados ou a chave privada (.json).**
