import React, { useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useState(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    api.post('/repositories', {
      "title": `Repository ${Date.now()} `,
      "url": "https://github.com/JOCILEUDO/gostack-desafio-03",
      "techs": [
        "Node.js",
        "React Js",
        "React native"
      ]
    }).then(response => {
      setRepositories([...repositories, response.data])
    }).catch(response => {
      console.warn("chegou aqui")
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`,).then(response => {
      var filtered = repositories.filter(repo => repo.id !== id);
      setRepositories(filtered);
    }).catch(({ error }) => {
      alert(error.data.error)
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
