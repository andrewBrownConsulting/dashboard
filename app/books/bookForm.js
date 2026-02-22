"use client"
import { useState } from "react"
import { addBook, removeBook } from "../todoServerFuncs"
import { List, Input, Button } from "@chakra-ui/react"
import { useRouter } from "next"
export function AddBookForm() {
  const [name, setName] = useState("")
  return (
    <form onSubmit={() => addBook(name)}>
      <Input name="bookName" type="text" value={name} onChange={e => setName(e.target.value)} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
export function BookListing({ id, title }) {
  return (
    <form>
      <List.Item >{title} <Button onClick={() => { removeBook(id) }}>x</Button> </List.Item>
    </form>
  )
}

