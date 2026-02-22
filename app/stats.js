import { useEffect, useState } from "react"
import { Button } from "@chakra-ui/react";
export default function Stats({ completed, last30Bool, setLast30Bool }) {
  const [sevenAvg, setSevenAvg] = useState();
  const [thirtyAvg, setThirtyAvg] = useState();
  useEffect(() => {
    if (!completed)
      return
    const now = new Date();
    const sevenDaysAgo = new Date().setDate(now.getDate() - 7);
    const thirtyDaysAgo = new Date().setDate(now.getDate() - 30);
    const lastSeven = completed.filter(item => (item.date >= sevenDaysAgo))
    const sevenTot = lastSeven.reduce((sum, item) => sum + Number(item.score), 0)
    setSevenAvg(sevenTot / 7);
    const lastThirty = completed.filter(item => (item.date >= thirtyDaysAgo))
    const thirtyTot = lastThirty.reduce((sum, item) => sum + Number(item.score), 0)
    setThirtyAvg(thirtyTot / 30);
  }, [completed])
  return (
    <div>
      <h1>Stats</h1>
      <p>7 day average: {sevenAvg?.toFixed(1)}</p>
      <p>30 day average: {thirtyAvg?.toFixed(1)}</p>
      <Button onClick={() => setLast30Bool(!last30Bool)}>Last 30</Button>
    </div>
  )
}
