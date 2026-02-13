'use client'
import { useState } from "react";
import { Stack, Grid, Flex, GridItem } from "@chakra-ui/react"
import PointsGraph from "./pointsGraph";
import Todo from "./todo"
import LogoItems from "./logoItems";
import { getAllCompletedServer, getAllDailyLogs, getAllLongTermRecords, getAllTodosServer } from "./todoServerFuncs";
import Header from "./Header";
import LongTerms from "./longTerms";
import DailyLog from "./components/dailyLog";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [longTerm, setLongTerm] = useState([]);
  const [logs, setLogs] = useState();
  async function updateLists() {
    const [todos, completed, longTerm, logs] = await Promise.all([
      getAllTodosServer(), getAllCompletedServer(), getAllLongTermRecords(), getAllDailyLogs()
    ]);
    const sortedLongTerm = longTerm.sort((a, b) => (a.date - b.date));
    setTodos(todos);
    setCompleted(completed);
    setLongTerm(sortedLongTerm);
    setLogs(logs);

  }
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="1000" gap={10} >
        <Header />
        <DailyLog logs={logs} />
        <Flex justify={'center'}>
          <PointsGraph completed={completed} />
        </Flex>
        <Grid templateColumns={{ "base": "1fr", "lg": "2fr 1fr" }} gap={10}>
          <GridItem>
            <Todo todos={todos} completed={completed} updateLists={updateLists} />
          </GridItem>
          <GridItem>
            <LogoItems updateLists={updateLists} />
          </GridItem>
        </Grid>
        <LongTerms longTerm={longTerm} updateLists={updateLists} />
      </Stack>
    </Flex >
  );
}
