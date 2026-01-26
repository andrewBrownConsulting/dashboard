'use client'
import { useState } from "react";
import { Stack, Grid, Heading, Flex, GridItem } from "@chakra-ui/react"
import PointsGraph from "./pointsGraph";
import Todo from "./todo"
import LogoItems from "./logoItems";
import { getAllCompletedServer, getAllTodosServer } from "./todoServerFuncs";
export default function Home() {

  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  async function updateLists() {
    const todos = await getAllTodosServer();
    const completed = await getAllCompletedServer();
    setTodos(todos);
    setCompleted(completed);
  }
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="1000" gap={10} >
        <Flex justify={'center'}>
          <Heading size={'2xl'}>Andrew Todo</Heading>
        </Flex>
        <Flex justify={'center'}>
          <PointsGraph completed={completed} />
        </Flex>
        <Grid templateColumns={{ "base": "1fr", "lg": "1fr 1fr" }} gap={10}>
          <GridItem>
            <Todo todos={todos} completed={completed} updateLists={updateLists} />
          </GridItem>
          <GridItem>
            <LogoItems updateLists={updateLists} />
          </GridItem>
        </Grid>
      </Stack>
    </Flex >
  );
}
