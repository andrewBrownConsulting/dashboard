'use client'

import { Spinner, Input, Grid, GridItem, Heading, Box, Button, Flex, Text, Textarea } from "@chakra-ui/react"
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
  const [submitting, setSubmitting] = useState(false);

  async function deleteCompleted(id) {
    setSubmitting(true);
    await deletedCompletedId(id);
    await updateLists();
    setSubmitting(false);
  }
  async function deleteTodo(id) {
    setSubmitting(true);
    await deleteTodoServer(id);
    await updateLists();
    setSubmitting(false);
  }
  async function completeTodo(id) {
    setSubmitting(true);
    listItem.completed = true;
    await completeTodoServer(id);
    await updateLists();
    setSubmitting(false);
  }
  async function undoCompleteTodo(id) {
    setSubmitting(true);
    await undoCompleteTodoServer(id);
    await updateLists();
    setSubmitting(false);
  }
  async function updateTodo(listItem) {
    setSubmitting(true);
    if (listItem.completed)
      await updateCompleteServer(listItem.id, name, score, info);
    else
      await updateTodoServer(listItem.id, name, score, info);
    await updateLists();
    setEditing(false);
    setSubmitting(false);
  }
  if (editing)
    return (
      <>
        <Grid templateColumns={columnTemplate} gap={gap} id={listItem.id} key={listItem.id} textDecoration={listItem.completed && "line-through"}>
          <GridItem>-</GridItem>
          <GridItem align={'center'}><Input h="28px" p={0} m={0} defaultValue={listItem.name} onChange={e => setName(e.target.value)} /></GridItem >
          <GridItem align={'center'}><Input h="28px" p={0} m={0} defaultValue={listItem.score} type="number" onChange={(e) => setScore(e.target.value)} /></GridItem>
          <GridItem align={'center'}><Textarea h="28px" p={0} m={0} defaultValue={listItem.info} onChange={(e) => setInfo(e.target.value)} /></GridItem>
          <GridItem align={'center'}>
            {submitting ? <Spinner size="md" /> :
              <Text onClick={() => updateTodo(listItem)} style={{ cursor: "pointer" }}>✅</Text>
            }
          </GridItem>
        </Grid >
        <Box width={"100%"} height={"1px"} background="gray.500"></Box>
      </>
    )
  return (
    <>
      <Grid templateColumns={columnTemplate} gap={gap} id={listItem.id} key={listItem.id} textDecoration={listItem.completed && "line-through"}>
        <GridItem align={'center'} px={2}  >
          {submitting ? <Spinner size="md" /> :
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
          }
        </GridItem>
        <GridItem align={'center'} ><Text>{listItem.name}</Text></GridItem>
        <GridItem align={'center'} ><Text>{listItem.score}</Text></GridItem>
        <GridItem align={'center'} ><Text >{listItem.info}</Text></GridItem>
        <GridItem align={'center'} >
          <Text onClick={() => setEditing(true)} style={{ cursor: "pointer" }} background={'none'}>✏️</Text>
        </GridItem>
        <GridItem align={'center'}>
          {submitting ? <Spinner size="md" /> :
            <Text
              onClick={
                listItem.completed ?
                  () => deleteCompleted(listItem.id) :
                  () => deleteTodo(listItem.id)

              }
              style={{ cursor: "pointer" }}
              background={'none'}>❌</Text>
          }
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
  const [submitting, setSubmitting] = useState(false);
  async function addNewTodo(e) {
    e.preventDefault();
    setSubmitting(true)
    await addTodoServer(name, score, info);
    await updateLists();
    setName("");
    setScore("");
    setInfo("");
    setSubmitting(false)
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
      {combinedList.map((listItem) => (
        <TodoListItem key={listItem.id} listItem={listItem} updateLists={updateLists} />
      ))
      }
      <form onSubmit={addNewTodo}>
        <Grid templateColumns={columnTemplate} gap={gap}>
          <GridItem>-</GridItem>
          <GridItem align={'center'}><Input h="28px" p={0} m={0} value={name} onChange={e => setName(e.target.value)} /></GridItem >
          <GridItem align={'center'}><Input h="28px" p={0} m={0} value={score} type="number" onChange={(e) => setScore(e.target.value)} /></GridItem>
          <GridItem align={'center'}><Textarea h="28px" p={0} m={0} value={info} resize="vertical" onChange={(e) => setInfo(e.target.value)} /></GridItem>
          <GridItem align={'center'} colSpan={2}>
            {submitting ? <Spinner size="md" /> :
              <Button h="28px" p={0} m={0} bg={'none'} type="submit">✅</Button>
            }
          </GridItem>
        </Grid>
      </form>
    </Flex >

  );
}
