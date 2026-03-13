'use client'
import { Flex, Stack, List, Heading, Button } from "@chakra-ui/react"
import Header from "../Header"
import { getAllBooks, removeBook } from "../todoServerFuncs";
import { formatDateDDMMYY } from "../utils";
import { AddBookForm, BookListing } from "./bookForm";
import { useEffect, useState } from "react";
export default function Books() {
  const [allBooks, setAllBooks] = useState();
  const updateBooks = async () => {
    setAllBooks(await getAllBooks());
  }
  useEffect(() => {
    updateBooks();
  }, [])
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="1000" gap={10} >
        <Header />
        <Heading>Books I've Read</Heading>
        <List.Root>
          {allBooks?.map((item) => (
            <List.Item >{item.title} <Button onClick={async () => { await removeBook(item.id); updateBooks(); }}>x</Button> </List.Item>
          ))}
        </List.Root>
        <AddBookForm />

      </Stack>
    </Flex >
  )
}
