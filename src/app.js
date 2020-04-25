const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];



app.get("/repositories", (request, response) => {
  
  
 
 return response.json(repositories);
  

  
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const repositoritory = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }
  repositories.push(repositoritory);
  return response.json(repositoritory);

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs}  = request.body;
  const findRepo = repositories.findIndex(repository => repository.id === id);
  if(findRepo === -1) {
    return response.status(400).json({error:'repository does not exists'});
  }
  
  const repository = {
    id, title, url, techs, likes: repositories[findRepo].likes,
  }
  repositories[findRepo] = repository; 
  

  return response.json(repository).send();

  


});

app.delete("/repositories/:id", async (request, response) => {
  const {id} = request.params;
  const repo = repositories.find(repository => repository.id === id);
  if(!repo) {
    return response.status(400).json({error:'repository does not exists'});
  }
  repositories.pop(repo);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;


  const findRepo = repositories.find(repository => repository.id === id);
  
  if(!findRepo) {
    return response.status(400).json({error:'repository does not exists'});
  }
  
  findRepo.likes += 1;
  return response.json(findRepo);


  



   
  
});

module.exports = app;
