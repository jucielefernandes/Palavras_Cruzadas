const http = require('http');
const url = require('url');
const express = require('express');
const session = require('express-session');
const app = express();
var path = require("path");
var parts;
var letras;
var valorInput;
var pergunta;
var branco = 'white';
var num = 1;

    var array = [
[0,1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0],
[0,2,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-1],
[0,0,-1,0,0,0,0,0,0,0,0,0,0,-1,0,0,-1],
[0,0,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1],
[0,0,-1,0,-1,0,0,0,0,0,0,-1,0,-1,0,-1,-1],
[0,-1,0,0,-1,0,-1,0,0,0,0,-1,0,-1,0,-1,0],
[0,-1,0,0,-1,0,-1,0,0,0,0,0,0,-1,0,-1,0],
[0,-1,0,0,-1,-1,-1,-1,-1,-1,0,-1,0,-1,0,-1,0],
[0,-1,0,0,-1,0,-1,0,0,-1,0,-1,0,-1,0,0,0],
[-1,-1,-1,-1,-1,-1,0,0,0,-1,0,-1,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0]
];

    var gabarito = [
['', '','f','r','i','e','n','d','s','','','','','','','',''],
['','','l','u','c','i','f','e','r','','','','','','','','l'],
['','','a','','','','','','','','','','','v','','','o'],
['','','s','t','r','a','n','g','e','r','','t','h','i','n','g','s'],
['','','h','','e','','','','','','','h','','k','','r','t'],
['','e','','','v','','d','','','','','e','','i','','i',''],
['','l','','','e','','a','','','','','','','n','','m',''],
['','i','','','n','a','r','c','o','s','','1','','g','','m',''],
['','t','','','g','','k','','','u','','0','','s','','',''],
['s','e','n','s','e','8','','','','i','','0','','','','',''],
['','','','','','','','','','t','','','','','','',''],
['','','','','','','','','','s','','','','','','','']
];

app.use(express.static(__dirname + '/html'));

// trata a requisicao da raiz no servidor (http://localhost:3000)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/html/index.html'));
})

// trata a requisicao do sobre no servidor (http://localhost:3000/sobre)
app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname+'/html/sobre.html'));
  // res.send('Sobre\n');
})

// trata a requisicao do jogar no servidor (http://localhost:3000/jogar)
app.get('/jogar', (req, res) => {
  res.sendFile(path.join(__dirname+'/html/jogar.html'));
})

app.get('/series', (req, res) => {

    var parts = url.parse(req.url, true);
    var query = parts.query;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write(`<meta charset="UTF-8">`)
    res.write('<link rel="stylesheet" href="style.css">')
    res.write('<body>');
    res.write(`<h1 id="titulo">Séries</h1>` )
    res.write(`<form action="/series" method="get">`)
    res.write('<table>');
    res.write('<div id="container">');
    for (var i = 0; i < array.length; i++) {
        res.write('<tr>');
        //console.log(`${i}, ${j}`);
        for (var j = 0; j < array[i].length; j++) {
            if (array[i][j] >0){
                console.log("ENTRANDO")
                res.write(`<td>${array[i][j]}</td>`);
            }
            else if (array[i][j] == -1) {
                if (query[`l${i}-${j}`] == gabarito[i][j]) {
                    res.write(`<td style="background-color:green;"><input type="text" maxlength=1 value="${query[`l${i}-${j}`]}" id="box" name="l${i}-${j}"></td>`);
                }else{
                    res.write(`<td style="background-color:red;"><input type="text" maxlength=1 value="" id="box" name="l${i}-${j}"></td>`);
            }
            }else{
                // escreve uma célula vazia
                res.write(`<td></td>`);
            }
        }
        res.write('</tr>');
     }
     res.write('<div class=horizontal>')
     res.write("<b>Horizontal</b><br>");
     res.write("<br><b>1.</b> Central Perk / Grupo de amigos <br><b>2.</b> Comandante do inferno / Anjo que tirou férias<br> <b>4.</b> Demogorgon / Sobrenatural <br> <b>11.</b> 8 pessoas mentalmente ligadas <br> <b>12.</b>  Drogas / Tráfico");
     res.write('</div>')
    res.write('</table>');
    res.write('<div class=vertical>')
    res.write("<b>Vertical</b><br>")
    res.write("<br><b>3.</b> Série ruim / Rápido<br> <b>5.</b> Vingança(risos)<br><b>6.</b> Sobrevivente / Guerra nuclear <br><b>7.</b> Acidente aéreo em uma ilha<br><b>8.</b> Invasões / Ataques medievais<br><b>9.</b> Buraco de minhoca / Viagem no tempo <br><b>10.</b> Bolsa de estudos<br><b>13.</b> Casos jurídicos / Advogados")
    res.write('</div>')
    res.write("<input class='botao' type=\"submit\" value='Verificar'>");
    res.write("</form>");
    res.write('</html>');
    res.end();
});

// trata a requisicao da ajuda do servidor (http://localhost:3000)
app.get('/ajuda', (req, res) => {
  res.sendFile(path.join(__dirname+'/html/instru.html'));
})

app.use(session({ secret: 'XXassasas¨¨$', resave: false, saveUninitialized: true }));

// entre em localhost:3000 para escrever os dados na sessao
app.get('/', function(req, res, next) {
    // pega todos os valores presentes na sessao
    var dados = req.session;
    // coloca na sessao uma entrada chamada curso com o valor 'informatica para internet'
    dados.curso = "Informatica para Internet";

    res.send('Dados escritos na sessao');
});

// entre em localhost:3000/nome para ver os dados escritos na sessao
app.get('/nome', function(req, res, next) {
    // pega o valor da entrada chamada curso na sessao
    var curso = req.session.curso;

    // imprime o valor da variavel curso
    res.send(`Nome do Curso: ${curso}`);
});

app.listen(3000, () => {
  console.log('Escutando localhost:3000');
})
const host = 'localhost';
const porta = 3000;


