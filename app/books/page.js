import { Flex, Stack, List, Heading } from "@chakra-ui/react"
import Header from "../Header"
import { getAllBooks, removeBook } from "../todoServerFuncs";
import { formatDateDDMMYY } from "../utils";
import { AddBookForm, BookListing } from "./bookForm";
export default async function Books() {
  const allBooks = await getAllBooks();
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="1000" gap={10} >
        <Header />
        <Heading>Books</Heading>
        <List.Root>
          {allBooks?.map((item) => (
            <BookListing key={item.id} id={item.id} title={item.title} />))}
        </List.Root>
        <AddBookForm />

      </Stack>
    </Flex >
  )
}
