'use client'
import { Flex, Text, Stack, List } from "@chakra-ui/react"
import Header from "../Header"
import { useEffect, useState } from "react"
import { getAllCompletedServer } from "../todoServerFuncs";
import { formatDateDDMMYY } from "../utils";
export default function ViewAll() {
  const [completedItems, setCompletedItems] = useState();
  async function getCompleted() {
    const completed = await getAllCompletedServer();
    setCompletedItems(completed);
    console.log(completed)
  }
  useEffect(() => {
    getCompleted();
  }, [])
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="1000" gap={10} >
        <Header />
        <Text>Here is the list of todo items</Text>
        <List.Root>
          {completedItems?.map((item) => (
            <List.Item key={item.id}>{item.name} - {item.score} - {formatDateDDMMYY(item.date)}
            </List.Item>))}
        </List.Root>
      </Stack>
    </Flex>
  )
}
