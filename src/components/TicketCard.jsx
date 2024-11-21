/* eslint-disable react/prop-types */

import "../styles/TicketCard.css"

export const TicketCard = ({ ticket }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{ticket.id}</span>
        <span className="card-user-icon">P</span>
      </div>
      <div className="card-title">
        <StatusLogo status={ticket.status} className="status-img" />
        <span>{ticket.title}</span>
      </div>
      <div className="card-tag">{ticket.tag}</div>
    </div>
  )
}

function StatusLogo({ status }) {
  switch (status) {
    case "Todo":
      return <img src="/icons/To-do.svg" />
    case "In progress":
      return <img src="/icons/in-progress.svg" />
    case "Backlog":
      return <img src="/icons/Backlog.svg" />
    default:
      return <img src="/icons/To-do.svg" />
  }
}
