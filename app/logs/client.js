'use client'
import { formatDateDDMMYY } from "../utils";
import { Flex, Text, Stack, List, Heading } from "@chakra-ui/react"
import Header from "../Header"
export function ClientView({ completed }) {
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="500px" gap={10} >
        <Header />
        <Heading>Logs</Heading>
        <List.Root>
          {completed?.map((item) => (
            <List.Item key={item.id}>
              <Text>
                {item.log} - {formatDateDDMMYY(item.date)}
              </Text>
            </List.Item>))}
        </List.Root>
      </Stack>
    </Flex >
  )
}
