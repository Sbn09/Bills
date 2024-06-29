const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');
module.exports = {

  getAll: (req, res) => {
    try {
      const data = fs.readFileSync(
        path.resolve(
          __dirname,
          '../db/clients.json'
        ) 
      )
      res.send(data)
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },

  getOne: (req, res) => {
    try {
      const data = fs.readFileSync(
        path.resolve(
          __dirname,
          '../db/clients.json'
        ) 
      )
      const clients = JSON.parse(data);
      const id = req.params.id
      const client = clients.find(client => client.idclient == id);
      if(client){
        res.json(client)
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },

   postOne: (req, res) => {
    try {
      const data = fs.readFileSync(
        path.resolve(
          __dirname,
          '../db/clients.json'
        ) 
      )
      const clients = JSON.parse(data);
      const newclient = { ...req.body, idclient: uuid() }
      clients.push(newclient)
      
      fs.writeFileSync(
        path.resolve(
          __dirname,
          '../db/clients.json'
        ),
        JSON.stringify(clients)
      )
      res.json(newclient)
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },

  patchOne: (req, res) => {
    try {
      const data = fs.readFileSync(
        path.resolve(
          __dirname,
          '../db/clients.json'
        ) 
      )
      let clients = JSON.parse(data);
      const id = req.params.id
      let updatedclient = clients.find(client => client.idclient == id);
      let updatedclientIndex = clients.findIndex(client => client.idclient == id);
      
      if(updatedclient) {
        updatedclient = { ...updatedclient, ...req.body }
        clients[updatedclientIndex] = {...updatedclient }
      } else {
        res.sendStatus(404);
        return;
      }

      fs.writeFileSync(
        path.resolve(
          __dirname,
          '../db/clients.json'
        ),
        JSON.stringify(clients)
      )
      res.json(updatedclient)

    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },

  deleteOne: (req, res) => {
    try {
      const data = fs.readFileSync(
        path.resolve(
          __dirname,
          '../db/clients.json'
        ) 
      )
      let clients = JSON.parse(data);
      const id = req.params.id
      clients = clients.filter(client => client.idclient != id)

      fs.writeFileSync(
        path.resolve(
          __dirname,
          '../db/clients.json'
        ),
        JSON.stringify(clients)
      )
      res.sendStatus(200)
    } catch (err) {
      res.sendStatus(500);
      throw err;
    }
  },
}