'use client'
import { useState } from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react"
import PointsGraph from "./pointsGraph";
import Todo from "./todo"
import Completed from "./completed";
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
    <Box margin={"auto"}>
      <Grid templateColumns={{ 'bs': '1fr', 'md': '1fr 1fr 1fr 1fr' }}
        width={'100%'} maxW={1000} gap={10} >
        <LogoItems updateLists={updateLists} />
        <GridItem colSpan={4} background={"green.50"} >
          <PointsGraph />
        </GridItem>
        <GridItem colSpan={2}>
          <Todo todos={todos} updateLists={updateLists} />
        </GridItem>
        <GridItem colSpan={2}>
          <Completed completed={completed} updateLists={updateLists} />
        </GridItem>
      </Grid>
    </Box >
  );
}
