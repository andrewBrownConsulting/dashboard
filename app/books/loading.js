import { Flex, Stack, List, Heading } from "@chakra-ui/react"
import Header from "../Header"
import { AddBookForm, BookListing } from "./bookForm"
export default async function Books() {
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="1000" gap={10} >
        <Header />
        <Heading>Books</Heading>
        <List.Root>
          <BookListing key={"a"} id={"1"} title={"Loading..."} />
        </List.Root>
        <AddBookForm />
      </Stack>
    </Flex >
  )
}
