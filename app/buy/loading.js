import { Flex, Stack, List, Heading } from "@chakra-ui/react"
import Header from "../Header"
import { AddBuyForm, BuyListing } from "./buyForm"
export default async function Buys() {
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="1000" gap={10} >
        <Header />
        <Heading>Buys</Heading>
        <List.Root>
          <BuyListing key={"a"} id={"1"} title={"Loading..."} />
        </List.Root>
        <AddBuyForm />
      </Stack>
    </Flex >
  )
}
