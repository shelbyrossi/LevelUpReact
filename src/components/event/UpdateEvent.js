import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { createEvent, getEvent, getEvents, updateEvent, getGames} from './EventManager.js'


export const UpdateEvent = () => {
  const history = useHistory()
  const [games, setGames] = useState([])
  const [currentEvent, setCurrentEvent] = useState({})

  const { eventId } = useParams()

 
  useEffect(() => {
    getGames().then(gameData => setGames(gameData))
  }, [])

  useEffect(() => {
    // If you don't want to use a different serializer with no depth,
    // unpack the eventData and set the currentEvent fields individually
    getEvent(eventId).then(eventData => setCurrentEvent({
      id: eventData.id,
      date: eventData.date,
      time: eventData.time,
      description: eventData.description,
      game: eventData.game.id
    }))
  }, [eventId])


  const changeEventState = (domEvent) => {
    const copy = {...currentEvent}
    copy[domEvent.target.name] = domEvent.target.value

    setCurrentEvent(copy)
  }

  return (
    <form className="eventForm">
        <h2 className="eventForm__description">Register New Event</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description: </label>
                <input type="text" name="description" required autoFocus className="form-control"
                    value={currentEvent.description}
                    onChange={changeEventState}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="date">Date (0000-00-00): </label>
                <input type="text" name="date" required autoFocus className="form-control"
                    value={currentEvent.date}
                    onChange={changeEventState}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="time">Time (00-00): </label>
                <input type="text" name="time" required autoFocus className="form-control"
                    value={currentEvent.time}
                    onChange={changeEventState}
                />
            </div>
        </fieldset>
        <fieldset>
    <div>
      <label>Game </label>
      <select onChange={changeEventState} name="gameId" value={currentEvent.gameId}>
        <option value="0">Select a game </option>
        {
          games.map(game => <option value={game.id}>{game.title}</option>)
        }
      </select>
    </div>
  </fieldset>

        {/* TODO: create the rest of the input fields */}

        <button type="submit"
        onClick={evt => {
          // Prevent form from being submitted
          evt.preventDefault()

          // TODO: Call the update function and route to the Game list
          updateEvent(currentEvent).then(() => history.push('/events'))
        }}
        className="btn btn-primary">Update</button>
    </form>
)
}
