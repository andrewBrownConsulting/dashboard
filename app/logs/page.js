import { Flex, Text, Stack, List } from "@chakra-ui/react"
import Header from "../Header"
import { getAllDailyLogs } from "../todoServerFuncs";
import { formatDateDDMMYY } from "../utils";
export default async function ViewLogs() {
  const completed = await getAllDailyLogs();
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="1000" gap={10} >
        <Header />
        <Text>Here is the list of logs</Text>
        <List.Root>
          {completed?.map((item) => (
            <List.Item key={item.id}>{item.log} - {formatDateDDMMYY(item.date)}
            </List.Item>))}
        </List.Root>
      </Stack>
    </Flex >
  )
}
