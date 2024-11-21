import { useEffect, useState } from "react"
import { Header } from "./components/Header"
import KanbanBoard from "./components/KanbanBoard"
import { API_URL } from "./utils/config"

function App() {
  const [grouping, setGrouping] = useState("status")
  const [sorting, setSorting] = useState("priority")
  const [data, setData] = useState({})

  useEffect(() => {
    const savedGrouping = localStorage.getItem("grouping")
    const savedSorting = localStorage.getItem("sorting")
    if (savedGrouping) setGrouping(savedGrouping)
    if (savedSorting) setSorting(savedSorting)
    fetch(API_URL)
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
  }, [])

  useEffect(() => {
    localStorage.setItem("grouping", grouping)
    localStorage.setItem("sorting", sorting)
  }, [grouping, sorting])

  return (
    <>
      <Header
        grouping={grouping}
        setGrouping={setGrouping}
        sorting={sorting}
        setSorting={setSorting}
      />
      <KanbanBoard grouping={grouping} sorting={sorting} data={data} />
    </>
  )
}

export default App
