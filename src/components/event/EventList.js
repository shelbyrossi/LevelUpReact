import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "./EventManager.js"

export const EventList = (props) => {
  const [events, setEvents] = useState([])
  const history = useHistory()

  const getAllTheEvents = () => getEvents().then(data => setEvents(data))

  useEffect(() => {
    getAllTheEvents()
  }, [])

  return (
    <><center>
      <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/events/new" })
        }}
      >Register New Event</button>
      {
        events.map((event) => {
          return (
            <section>
              <div><h1>{event.game.title}</h1>

              {event.description}
              {event.date} at {event.time}</div>
              <Link className="btn" to={`/events/${event.id}/update`}>Edit Event</Link>
              <button className="btn" onClick={() => {
                deleteEvent(event.id).then(getAllTheEvents)
              }}>Destroy Event</button>
              {
                event.joined
                ?
                // Leave button
                <button className="btn" onClick={() => {
                  leaveEvent(event.id).then(getAllTheEvents)
                }}>
                  Leave Event
                </button>
                :
                // join button
                <button className="btn" onClick={() => {
                  joinEvent(event.id).then(getAllTheEvents)
                }}>
                  Join Event
                </button>
        }
        
            </section>
          )
        })
    }
    </center>
    </>
  )
}