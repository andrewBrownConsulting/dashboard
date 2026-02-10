'use client'

import { Input, Grid, GridItem, Heading, Box, Button, Flex, Text } from "@chakra-ui/react"
import { CheckIcon } from "@chakra-ui/icons";
import { updateTodoServer, undoCompleteTodoServer, completeTodoServer, deletedCompletedId, deleteTodoServer, updateCompleteServer, addTodoServer } from "./todoServerFuncs";
import { useState, useEffect } from "react";

const columnTemplate = "25px 1fr 50px 2fr 30px 30px";
const gap = 1;
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
      <>
        <Grid templateColumns={columnTemplate} gap={gap} id={listItem.id} key={listItem.id} textDecoration={listItem.completed && "line-through"}>
          <GridItem>-</GridItem>
          <GridItem align={'center'}><Input h="28px" p={0} m={0} defaultValue={listItem.name} onChange={e => setName(e.target.value)} /></GridItem >
          <GridItem align={'center'}><Input h="28px" p={0} m={0} defaultValue={listItem.score} type="number" onChange={(e) => setScore(e.target.value)} /></GridItem>
          <GridItem align={'center'}><Input h="28px" p={0} m={0} defaultValue={listItem.info} onChange={(e) => setInfo(e.target.value)} /></GridItem>
          <GridItem align={'center'}><Text onClick={() => updateTodo(listItem)} style={{ cursor: "pointer" }}>✅</Text></GridItem>
        </Grid >
        <Box width={"100%"} height={"1px"} background="gray.500"></Box>
      </>
    )
  return (
    <>
      <Grid templateColumns={columnTemplate} gap={gap} id={listItem.id} key={listItem.id} textDecoration={listItem.completed && "line-through"}>
        <GridItem align={'center'} px={2}  >
          <Box
            boxSize="20px"
            bg={listItem.completed ? "green.500" : ""}
            borderRadius="full"
            borderWidth={"1px"}
            borderColor={"gray.500"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={listItem.completed ?
              () => undoCompleteTodo(listItem.id) :
              () => completeTodo(listItem.id)
            }
            style={{ cursor: "pointer" }}
          >
            <CheckIcon color="white" boxSize="12px" />
          </Box>
        </GridItem>
        <GridItem align={'center'} ><Text>{listItem.name}</Text></GridItem>
        <GridItem align={'center'} ><Text>{listItem.score}</Text></GridItem>
        <GridItem align={'center'} ><Text >{listItem.info}</Text></GridItem>
        <GridItem align={'center'} >
          <Text onClick={() => setEditing(true)} style={{ cursor: "pointer" }} background={'none'}>✏️</Text>
        </GridItem>
        <GridItem align={'center'} >
          <Text
            onClick={
              listItem.completed ?
                () => deleteCompleted(listItem.id) :
                () => deleteTodo(listItem.id)

            }
            style={{ cursor: "pointer" }}
            background={'none'}>❌</Text>
        </GridItem>
      </Grid>
      <Box width={"100%"} height={"1px"} background="gray.500"></Box>
    </>
  )
}
export default function Todo({ todos, completed, updateLists }) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [info, setInfo] = useState("");
  async function addNewTodo() {
    await addTodoServer(name, score, info);
    updateLists();
    setName("");
    setScore("");
    setInfo("");
  }
  useEffect(() => {
    updateLists();
  }, [])
  const completedToday = completed.filter(item => isToday(item.date)).map(item => ({ ...item, completed: true }));
  //combine todos with completedToday
  const combinedList = completedToday.concat(todos);
  return (
    <Flex justify={'center'} width={"100%"} p={5} flexDir={'column'} borderWidth={1} borderColor={"white"} borderRadius={10} >
      <Flex>
        <Heading px={2}>To Do:</Heading>
      </Flex>
      {
        combinedList.map((listItem) => (
          <TodoListItem listItem={listItem} updateLists={updateLists} />
        ))
      }
      <Grid templateColumns={columnTemplate} gap={gap}>
        <GridItem>-</GridItem>
        <GridItem align={'center'}><Input h="28px" p={0} m={0} value={name} onChange={e => setName(e.target.value)} /></GridItem >
        <GridItem align={'center'}><Input h="28px" p={0} m={0} value={score} type="number" onChange={(e) => setScore(e.target.value)} /></GridItem>
        <GridItem align={'center'}><Input h="28px" p={0} m={0} value={info} onChange={(e) => setInfo(e.target.value)} /></GridItem>
        <GridItem align={'center'}><Button h="28px" p={0} m={0} bg={'none'} onClick={() => addNewTodo()}>✅</Button></GridItem>
      </Grid>
    </Flex >

  );
}
