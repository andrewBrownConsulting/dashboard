import { Flex, Text, Heading, Stack, List } from "@chakra-ui/react"
import Header from "../Header"
import { formatDateDDMMYY } from "../utils";
export default async function ViewLogs() {
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="1000" gap={10} >
        <Header />
        <Heading>Logs</Heading>
        <List.Root>
          <List.Item key={'a'}>
            <Text>{"Loading..."} - {"01/01/2000"}
            </Text>
          </List.Item>
        </List.Root>
      </Stack>
    </Flex >
  )
}
