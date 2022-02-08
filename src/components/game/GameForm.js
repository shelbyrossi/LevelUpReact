import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes, editGames } from './GameManager.js'


export const GameForm = () => {
  const history = useHistory()
  const [gameTypes, setGameTypes] = useState([])

  /*
      Since the input fields are bound to the values of
      the properties of this state variable, you need to
      provide some default values.
  */
  const [currentGame, setCurrentGame] = useState({
    skillLevel: 1,
    numberOfPlayers: 0,
    title: "",
    maker: "",
    gameTypeId: 0
  })

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then(gameTypeData => setGameTypes(gameTypeData))
  }, [])

  const changeGameState = (domEvent) => {
    const copy = {...currentGame}
    // const copy = Object.assign({}, currentGame)
    copy[domEvent.target.name] = domEvent.target.value

    setCurrentGame(copy)
  }

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" required autoFocus className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Maker: </label>
          <input type="text" name="maker" required autoFocus className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Number of Players: </label>
          <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
            value={currentGame.numberOfPlayers}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Skill Level: </label>
          <input type="text" name="skillLevel" required autoFocus className="form-control"
            value={currentGame.skillLevel}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div>
          <label>Game Type</label>
          <select onChange={changeGameState} name="gameTypeId" value={currentGame.gameTypeId}>
            <option value="0">Select a game type</option>
            {
              gameTypes.map(gameType => <option value={gameType.id}>{gameType.label}</option>)
            }
          </select>
        </div>
      </fieldset>

      {/* TODO: create the rest of the input fields */}

      <button type="submit"
        onClick={evt => {
          // Prevent form from being submitted
          evt.preventDefault()

          const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            number_of_players: parseInt(currentGame.numberOfPlayers),
            skill_level: parseInt(currentGame.skillLevel),
            game_type: parseInt(currentGame.gameTypeId)
          }

          // Send POST request to your API
          createGame(game)
            .then(() => history.push("/games"))
        }}
        className="btn btn-primary">Create</button>
    </form>
  )
}