'use client'
import { Grid, GridItem, Button, Heading, Box, List, Stack, Flex, Text } from "@chakra-ui/react"
import { CheckIcon } from "@chakra-ui/icons";
import { undoCompleteTodoServer, completeTodoServer, deletedCompletedId, deleteTodoServer } from "./todoServerFuncs"; import { useEffect } from "react";
export default function Todo({ todos, completed, updateLists }) {
  async function deleteCompleted(id) {
    await deletedCompletedId(id);
    updateLists();
  }
  function isToday(date) {
    const d = new Date(date);
    const today = new Date();
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  }
  async function deleteTodo(id) {
    await deleteTodoServer(id);
    updateLists();
  }
  async function completeTodo(id) {
    await completeTodoServer(id);
    updateLists();
  }
  async function undoCompleteTodo(id) {
    await undoCompleteTodoServer(id);
    updateLists();
  }
  useEffect(() => {
    updateLists();
  }, [])
  return (
    <Flex justify={'center'}>
      <List.Root borderWidth={1} borderColor={"white"} borderRadius={10} maxW={500}>
        <Flex>
          <Heading px={2}>To Do:</Heading>
        </Flex>
        {
          completed.filter(item => isToday(item.date)).map((listItem) => (
            <Grid templateColumns={"1fr 80px 50px 150px 1fr"} gap={2} key={listItem.id} textDecoration={"line-through"}>
              <GridItem align={'center'} px={2} >
                <Box
                  boxSize="20px"
                  bg="green.500"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => undoCompleteTodo(listItem.id)}
                >
                  <CheckIcon color="white" boxSize="12px" />
                </Box>
              </GridItem>
              <GridItem align={'center'} ><Text>{listItem.name}</Text></GridItem>
              <GridItem align={'center'} ><Text>{listItem.score}</Text></GridItem>
              <GridItem align={'center'} ><Text whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis">{listItem.info}</Text></GridItem>
              <GridItem align={'center'} >
                <Button onClick={() => deleteCompleted(listItem.id)} background={'none'}>❌</Button>
              </GridItem>
            </Grid>
          ))
        }
        {
          todos.map((listItem) => (
            <Grid templateColumns={"1fr 80px 50px 150px 1fr"} gap={2} key={listItem.id}>
              <GridItem align={'center'} px={2}>
                <Box
                  boxSize="20px"
                  bg="gray"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => completeTodo(listItem.id)}
                >
                </Box>
              </GridItem>
              <GridItem align={'center'} ><Text>{listItem.name}</Text></GridItem>
              <GridItem align={'center'} ><Text>{listItem.score}</Text></GridItem>
              <GridItem align={'center'} ><Text whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis">{listItem.info}</Text></GridItem>
              <GridItem align={'center'} >
                <Button onClick={() => deleteTodo(listItem.id)} background={'none'}>❌</Button>
              </GridItem>
            </Grid>
          ))
        }
      </List.Root >
    </Flex >

  );
}
