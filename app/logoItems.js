'use client'
import { Grid, Flex, GridItem, Button, Box, Heading, Select, Portal, createListCollection, Input, Stack } from "@chakra-ui/react"
import { addTodoServer, } from "./todoServerFuncs";
import { useState } from "react";

const gymOptions = [
  { value: "Push 1", score: 5, info: "Bench, Incline, Rope Pushdown, Lats" },
  { value: "Push 2", score: 5 },
  { value: "Pull 1", score: 5, info: "Pull up, Barbell Row, Curl, Face Pull" },
  { value: "Pull 2", score: 5 },
  { value: "Legs 1", score: 5, info: "Squat, Romanian Deadlift, Leg Press, Leg extension, Calf Raise" },
  { value: "Legs 2", score: 5 },
  { value: "Run 30", score: 5, info: "Pace 8, no breaks" },
  { value: "Run 60", score: 10, info: "Pace 8, no breaks" },
]
const sleepOptions = [
  { value: "Pre 6am", score: 10 },
  { value: "After 6am", score: 0 },
]
const readingOptions = [
  { value: "10 mins", score: 1, info: "Read for 10 mins" },
  { value: "30 mins", score: 3, info: "Read for 30 mins" },
  { value: "60 mins", score: 6, info: "Read for 60 mins" },
  { value: "NYTimes", score: 2, info: "Complete NYTimes Games" },
]
const workOptions = [
  { value: "Work 9 to 5", score: 10 },
  { value: "1 Hour Personal Project", score: 2 },
]
const socialOptions = [
  { value: "Go on Date", score: 10 },
  { value: "Go out with Friends ", score: 10 },
]
export default function LogoItems({ updateLists }) {
  const [type, setType] = useState({ name: 'gym' });
  const [customType, setCustomType] = useState({ name: "none", score: 0, info: "none" })
  async function addLogoTodo(name, score, info) {
    addTodoServer(name, score, info);
    updateLists();
  }
  const logoItem = (name, options) => (
    <GridItem width={300} background={"black"} color='white' textAlign={'center'}
      borderRadius={'lg'}  >
      <Grid templateColumns='1fr 1fr' gap={2}>
        <GridItem colSpan={2} p={1} height={10}>
          <Heading >{name}</Heading>
        </GridItem>
        {
          options.map((val, i) => <Button key={i} id={val.name} height={10} background={"white"} colour={'black'} onClick={() => addLogoTodo(val.value, val.score, val.info)} p={2} > {val.value}</Button>)
        }
      </Grid>
    </GridItem >
  )
  const customItem = () => (
    <GridItem width={300} background={"black"} color='white' textAlign={'center'}
      borderRadius={'lg'} >
      <Grid templateColumns='1fr 1fr' gap={2}>
        <GridItem colSpan={2} p={1} height={10}>
          <Heading>Custom</Heading>
        </GridItem>
        <Input borderColor="white" placeholder="Name" onChange={e => setCustomType(prev => ({ ...prev, name: e.target.value }))} />
        <Input borderColor="white" placeholder="Info" onChange={e => setCustomType(prev => ({ ...prev, info: e.target.value }))} />
        <Input borderColor="white" type="number" placeholder="Score" onChange={e => setCustomType(prev => ({ ...prev, score: e.target.value }))} />
        <Button onClick={() => addLogoTodo(customType.name, customType.score, customType.info)}>Add</Button>
      </Grid>
    </GridItem>
  );

  return (
    <Flex justify={'center'}>
      <Stack direction={"row"}>
        <Stack direction={'column'}>
          <Button background='gray.300' height={10} onClick={() => setType({ name: 'gym' })}>Gym</Button>
          <Button background='gray.300' height={10} onClick={() => setType({ name: 'sleep' })}>Sleep</Button>
          <Button background='gray.300' height={10} onClick={() => setType({ name: 'reading' })}>Reading</Button>
          <Button background='gray.300' height={10} onClick={() => setType({ name: 'work' })}>Work</Button>
          <Button background='gray.300' height={10} onClick={() => setType({ name: 'social' })}>Social</Button>
          <Button background='gray.300' height={10} onClick={() => setType({ name: 'custom' })}>Custom</Button>
        </Stack>
        {type.name == 'gym' && logoItem("Gym", gymOptions)}
        {type.name == 'sleep' && logoItem("Sleep", sleepOptions)}
        {type.name == 'reading' && logoItem("Reading", readingOptions)}
        {type.name == 'work' && logoItem("Work", workOptions)}
        {type.name == 'social' && logoItem("Social", socialOptions)}
        {type.name == 'custom' && customItem()}
      </Stack>
    </Flex>
  )
}
