import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"
import { useHistory } from "react-router-dom"

export const EventList = (props) => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const history = useHistory()

    return (
        events.map((event) => {
            return (
                <section><center>
                    <h1>{event.game.title}</h1>

                    <div>{event.description}
                    {event.date} at {event.time}</div>

                    <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            history.push({ pathname: "/events/new" })
                        }}
                    >Register New Event</button>
                </center></section>
            )
        })
    )
}
