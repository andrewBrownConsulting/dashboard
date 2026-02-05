'use client'
import { useState } from "react";
import { Stack, Grid, Flex, GridItem } from "@chakra-ui/react"
import PointsGraph from "./pointsGraph";
import Todo from "./todo"
import LogoItems from "./logoItems";
import { getAllCompletedServer, getAllLongTermRecords, getAllTodosServer } from "./todoServerFuncs";
import Header from "./Header";
import LongTerms from "./longTerms";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [longTerm, setLongTerm] = useState([]);
  async function updateLists() {
    const todos = await getAllTodosServer();
    const completed = await getAllCompletedServer();
    let longTerm = await getAllLongTermRecords();
    longTerm = longTerm.sort((a, b) => (a.date - b.date));
    setTodos(todos);
    setCompleted(completed);
    setLongTerm(longTerm);
  }
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="1000" gap={10} >
        <Header />
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
        <LongTerms longTerm={longTerm} />
      </Stack>
    </Flex >
  );
}
