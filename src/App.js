import { response } from "express";
import React,{useState,useEffect} from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories,setRepositories]=useState([]);

  useEffect(()=>{
      api.get("repositories").then(response => {
        setRepositories(response.data);
      })
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories',
            {
                title: `Novo projeto ${Date.now()}`,
                url:"",
                techs:[],
            }
        );

    //const repository = response.data;
    setRepositories([...repositories,response.data]);    
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex =repositories.findIndex(
      repository => repository.id === id);
    if (repositoryIndex === -1) {
      console.log("Repository not found");
    }
    repositories.splice(repositoryIndex,1);
    setRepositories([...repositories]);
    /*
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
    */

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
