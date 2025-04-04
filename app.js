//Importando o Express
const express = require('express');

// Definindo uma porta para o servidor


const app = express()

const PORT = 3000
//Configurando o aplicativo para entender JSON no corpo das requisições
app.use(express.json());

//Dados de exemplo - nossos usuários
let usuarios = [
    { id: 1, nome:'Maria' },
    { id: 2, nome: 'João' }
];

//CREATE - Criar um novo usuário (POST)
app.post('/api/usuarios', (req, res) => {
    //Criamos um novo usuário com um ID único
    const novoUsuario = {id: usuarios.length + 1, nome: req.body.nome };

    // Adicionamos o novo usuário á lista de usuários
    usuarios.push(novoUsuario);

    //Respondemos com o status 201 (Criado) e o novo usuário em JSON
    res.status(201).json(novoUsuario);
});

//READ - Ler todos os usuários (GET)
app.get('/api/usuarios', (req,res) => {
    //Respondemos com a lista de todos os usuários em JSON
    res.json(usuarios);
});

//UPDATE - Atualizar um usuário pelo ID(PUT)
app.put('/api/usuarios/:id' , (req,res) => {
    //Buscamos o usuário pelo ID , que é passado como parâmetro de rota
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));

    // Se o usuário não for encontrado , retornamos o status 404 (Não encontrado)
    if(!usuario) return res.status(404).send('Usuário não encontrado');

    //Atualizamos o nome do usuário com o novo nome enviado no corpo da requisição 
    usuario.nome = req.body.nome;

    //Respondemos com o usuário atualizado em JSON
    res.json(usuario);
});

//DELETE - Deletar um usuário pelo ID (DELETE)
app.delete('/api/usuarios/:id', (req, res) => {
    //Encontramos o indice do usuário pelo ID
    const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(req.params.id));

    //Se o indice for -1 , o usuário não foi encontrado, e retornamos o status 404
    if (usuarioIndex === -1) return res.status(404).send('Usuário não encontardo')

    // Removemos o usuário da lista 
    const usuarioDeletado = usuarios.splice(usuarioIndex,1);

    // Respondemos com o usuário deletado em JSON
    res.json(usuarioDeletado);
});

// Iniciamos o servidor na porta definida  e exibimos uma mensagem no console
app.listen(PORT, () => {
    console.log('Servidor rodando na porta http://localhost:3000');
});
