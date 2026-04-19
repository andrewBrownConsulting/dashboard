'use client'
import { useEffect, useState } from "react";
import { Heading, Text, Stack, Grid, Flex, GridItem } from "@chakra-ui/react"
import PointsGraph from "./pointsGraph";
import Todo from "./todo"
import LogoItems from "./logoItems";
import { getAllCompletedServer, getAllDailyLogs, getAllLongTermRecords, getAllTodosServer } from "./todoServerFuncs";
import Header from "./Header";
import LongTerms from "./longTerms";
import DailyLog from "./components/dailyLog";
import Stats from "./stats"

export default function Home() {
  const [todos, setTodos] = useState([{ id: "1", name: "Loading...................................", score: 0, info: "Loading................" }]);
  const [completed, setCompleted] = useState([]);
  const [longTerm, setLongTerm] = useState([]);
  const [logs, setLogs] = useState();
  const [last30Bool, setLast30Bool] = useState(false);
  const [sevenAvg, setSevenAvg] = useState(0);
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
  useEffect(() => { updateLists() }, [])
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="1000" width={"100%"} gap={10} >
        <Header />
        <Grid justify={'center'} gridTemplateColumns={{ base: "1fr", "md": "1fr 1fr" }}>
          <DailyLog logs={logs} />
          <Heading textAlign={"center"} fontSize={'3xl'}>Change of the week: <Text as="span" color="red.500">Create a hell-yeah clip each day</Text> </Heading>
        </Grid>
        <Flex justify={'center'}>
          <Grid templateColumns={{ "base": "1fr", "lg": "1fr 1fr 1fr" }} width={'100%'}>
            <GridItem colSpan={{ "base": 1, "lg": 2 }} height={200}>
              <PointsGraph completed={completed} last30Bool={last30Bool} sevenAvg={sevenAvg} />
            </GridItem>
            <GridItem colSpan={1}>
              <Flex justify={'center'}>
                <Stats completed={completed} last30Bool={last30Bool} setLast30Bool={setLast30Bool} sevenAvg={sevenAvg} setSevenAvg={setSevenAvg} />
              </Flex>
            </GridItem>
          </Grid>
        </Flex>
        <Flex justify={'center'} p={10}>
          <Grid templateColumns={{ "base": "1fr", "lg": "1fr 1fr 1fr" }}>
            <GridItem colSpan={{ "base": 1, "lg": 2 }}>
              <Todo todos={todos} completed={completed} updateLists={updateLists} />
            </GridItem>
            <GridItem colSpan={1}>
              <LogoItems updateLists={updateLists} />
            </GridItem>
          </Grid>
        </Flex>
        <LongTerms longTerm={longTerm} updateLists={updateLists} />
      </Stack>
    </Flex >
  );
}
