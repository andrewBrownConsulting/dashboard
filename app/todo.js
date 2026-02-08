'use client'

import { Input, Grid, GridItem, Button, Heading, Box, List, Stack, Flex, Text } from "@chakra-ui/react"
import { CheckIcon } from "@chakra-ui/icons";

import { updateTodoServer, undoCompleteTodoServer, completeTodoServer, deletedCompletedId, deleteTodoServer, updateCompleteServer } from "./todoServerFuncs";
import { useState, useEffect } from "react";

function isToday(date) {
  const d = new Date(date);
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}
function TodoListItem({ listItem, updateLists }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(listItem.name);
  const [score, setScore] = useState(listItem.score);
  const [info, setInfo] = useState(listItem.info);
  async function deleteCompleted(id) {
    await deletedCompletedId(id);
    updateLists();
  }
  async function deleteTodo(id) {
    await deleteTodoServer(id);
    updateLists();
  }
  async function completeTodo(id) {
    listItem.completed = true;
    await completeTodoServer(id);
    updateLists();
  }
  async function undoCompleteTodo(id) {
    await undoCompleteTodoServer(id);
    updateLists();
  }
  async function updateTodo(listItem) {
    if (listItem.completed)
      await updateCompleteServer(listItem.id, name, score, info);
    else
      await updateTodoServer(listItem.id, name, score, info);
    updateLists();
    setEditing(false);
  }
  if (editing)
    return (
      <Grid templateColumns={"100px 40px 130px 20px "} gap={2} id={listItem.id} key={listItem.id} textDecoration={listItem.completed && "line-through"}>
        <GridItem align={'center'}><Input p={0} m={0} defaultValue={listItem.name} onChange={e => setName(e.target.value)} /></GridItem >
        <GridItem align={'center'}><Input p={0} m={0} defaultValue={listItem.score} type="number" onChange={(e) => setScore(e.target.value)} /></GridItem>
        <GridItem align={'center'}><Input p={0} m={0} defaultValue={listItem.info} onChange={(e) => setInfo(e.target.value)} /></GridItem>
        <GridItem align={'center'}><Button onClick={() => updateTodo(listItem)}>Tick</Button></GridItem>
      </Grid>
    )
  return (
    <Grid templateColumns={"40px 100px 40px 130px 20px 1fr"} gap={2} id={listItem.id} key={listItem.id} textDecoration={listItem.completed && "line-through"}>
      <GridItem align={'center'} px={2} >
        <Box
          boxSize="20px"
          bg="green.500"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={listItem.completed ?
            () => undoCompleteTodo(listItem.id) :
            () => completeTodo(listItem.id)
          }
        >
          <CheckIcon color="white" boxSize="12px" />
        </Box>
      </GridItem>
      <GridItem align={'center'} ><Text>{listItem.name}</Text></GridItem>
      <GridItem align={'center'} ><Text>{listItem.score}</Text></GridItem>
      <GridItem align={'center'} ><Text >{listItem.info}</Text></GridItem>
      <GridItem align={'center'} >
        <Button onClick={() => setEditing(true)} background={'none'}>✏️</Button>
      </GridItem>
      <GridItem align={'center'} >
        <Button
          onClick={
            listItem.completed ?
              () => deleteCompleted(listItem.id) :
              () => deleteTodo(listItem.id)
          }
          background={'none'}>❌</Button>
      </GridItem>
    </Grid>
  )
}
export default function Todo({ todos, completed, updateLists }) {
  useEffect(() => {
    updateLists();
  }, [])
  const completedToday = completed.filter(item => isToday(item.date)).map(item => ({ ...item, completed: true }));
  //combine todos with completedToday
  const combinedList = completedToday.concat(todos);
  return (
    <Flex justify={'center'}>
      <List.Root borderWidth={1} borderColor={"white"} borderRadius={10}>
        <Flex>
          <Heading px={2}>To Do:</Heading>
        </Flex>
        {
          combinedList.map((listItem) => (
            <TodoListItem listItem={listItem} updateLists={updateLists} />
          ))
        }

      </List.Root >
    </Flex >

  );
}
