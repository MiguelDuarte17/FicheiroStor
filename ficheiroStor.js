const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

const itens = [
    { id: 1, name: 'Item1'},
    { id: 2, name: 'Item2'}
];

app.get('/api/itens', (req, res) => {
    res.json(itens);
});

app.get('/api/itens/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = itens.find(item => item.id === id);

    if(!item) {
        return res.status(404).json({ error: 'Item não encontrado'});
    }

    res.json(item);
});

app.post('/api/itens', (req, res) => {
    const { name} = req.body;

    if(!name){
        return res.status(400).json({ error: 'O campo name é obrigatório'});
    }

    const newItem = {
        id: itens.length ? Math.max(...itens.map(item => item.id)) + 1 : 1,
        name
    };
    itens.push(newItem);

    res.status(201).json(newItem);
})

app.put('/api/itens/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = itens.find(item => item.id === id);

    if(!item){
        return res.status(404).json({ error: 'Item não encontrado' });
    }

    const {name } = req.body;
    if (!name) {
    return res.status(400).json({ error: 'O campo name é obrigatório' });
  }

  item.name = name;
  res.json(item);
});

app.delete('/api/itens/:id', (req,res) => {
    const id = Number(req.params.id);
    const index = itens.findIndex(item => item.id === id);
    if (index === -1) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  itens.splice(index, 1);

  res.status(204).send();
});
app.listen(PORT, () => {
    console.log(`API a executar em http://localhost:${PORT}`);
});