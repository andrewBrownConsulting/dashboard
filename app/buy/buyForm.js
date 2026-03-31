"use client"
import { useState } from "react"
import { addBuyItem } from "../todoServerFuncs"
import { Input, Button } from "@chakra-ui/react"
export function AddBuyForm() {
  const [name, setName] = useState("")
  return (
    <form onSubmit={() => addBuyItem(name)}>
      <Input name="item" type="text" value={name} onChange={e => setName(e.target.value)} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
export function BuyListing({ id, title }) {
  return (
    <form>

    </form>
  )
}

