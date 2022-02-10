export const getGames = () => {
    return fetch("http://localhost:8000/games", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
    })
      .then(response => response.json())
  }
  
  export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(game)
    })
      .then(res => res.json())
  }
  
  export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      }
    })
      .then(res => res.json())
  }
  
  export const getGame = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`
      }
    }).then(res => res.json())
  }
  
  export const updateGame = (game) => {
    return fetch(`http://localhost:8000/games/${game.id}`, {
      method: "Put",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(game)
    })
  }
  
  export const deleteGame = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
      method: "Delete",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      },
    })
  }