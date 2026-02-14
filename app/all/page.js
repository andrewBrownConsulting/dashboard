'use client'
import { Flex, Text, Stack, List, Heading, ListItem } from "@chakra-ui/react"
import Header from "../Header"
import { useEffect, useState } from "react"
import { getAllCompletedServer } from "../todoServerFuncs";
import { formatDateDDMMYY } from "../utils";
export default function ViewAll() {
  const [completedItems, setCompletedItems] = useState();
  async function getCompleted() {
    let completed = await getAllCompletedServer();
    completed = completed.sort((a, b) => (new Date(b.date) - new Date(a.date)))
    //group the completed items by date
    const grouped = Object.values(
      completed.reduce((acc, item) => {
        const key = formatDateDDMMYY(item.date); // use normalized date string
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {})
    );
    setCompletedItems(grouped);
    { grouped.map((dateArray) => console.log(formatDateDDMMYY(dateArray[0].date))) }
  }
  useEffect(() => {
    getCompleted();
  }, [])
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="1000" gap={10} >
        <Header />
        <Text>Todo Items:</Text>
        {completedItems?.map((dateArray) => (
          <div key={dateArray[0].id}>
            <Heading>{formatDateDDMMYY(dateArray[0].date)}</Heading>
            <List.Root>
              {dateArray.map(item => <ListItem key={item.id}>{item.name} - {item.score} - {item.info}</ListItem>)}
            </List.Root>
          </div>
        ))}

      </Stack>
    </Flex >
  )
}
