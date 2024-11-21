/* eslint-disable react/prop-types */

import { TicketCard } from "./TicketCard"

import "../styles/KanbanBoard.css"

const KanbanBoard = ({ grouping, sorting, data }) => {
  const { tickets = [], users = [] } = data

  // Helper to sort tickets
  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sorting === "priority") return b.priority - a.priority
      if (sorting === "title") return a.title.localeCompare(b.title)
      return 0
    })
  }

  // Group tickets based on user selection
  const groupTickets = () => {
    if (grouping === "status") {
      return tickets.reduce((acc, ticket) => {
        acc[ticket.status] = acc[ticket.status] || []
        acc[ticket.status].push(ticket)
        return acc
      }, {})
    } else if (grouping === "user") {
      return tickets.reduce((acc, ticket) => {
        const user =
          users.find((u) => u.id === ticket.userId)?.name || "Unassigned"
        acc[user] = acc[user] || []
        acc[user].push(ticket)
        return acc
      }, {})
    } else if (grouping === "priority") {
      return tickets.reduce((acc, ticket) => {
        const priorityName = ["No priority", "Low", "Medium", "High", "Urgent"][
          ticket.priority
        ]
        acc[priorityName] = acc[priorityName] || []
        acc[priorityName].push(ticket)
        return acc
      }, {})
    }
  }

  const groupedTickets = groupTickets()

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group) => {
        const groupTicketsCount = groupedTickets[group].length
        return (
          <div key={group} className="kanban-column">
            <div className="group-header">
              <span className="group-header-left">
                <span className="group-title">{group}</span>
                <span>{groupTicketsCount}</span>
              </span>
              <span className="group-header-right-icons">
                <img src="/icons/add.svg" alt="add icon" />
                <img src="/icons/3dotmenu.svg" alt="menu icon" />
              </span>
            </div>
            {sortTickets(groupedTickets[group]).map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoard
