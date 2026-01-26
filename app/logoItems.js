'use client'
import { Grid, Flex, GridItem, Button, Box, Heading, Select, Portal, createListCollection, Input, Stack } from "@chakra-ui/react"
import { addTodoServer, } from "./todoServerFuncs";
import { useState } from "react";

const gymOptions = [
  { value: "Push 1", score: 5, info: "Bench, Incline, Rope Pushdown, Lats" },
  { value: "Pull 1", score: 5, info: "Pull up, Barbell Row, Curl, Face Pull" },
  { value: "Legs 1", score: 5, info: "Squat, Romanian Deadlift, Leg Press, Leg extension, Calf Raise" },
  { value: "Push 2", score: 5 },
  { value: "Pull 2", score: 5 },
  { value: "Legs 2", score: 5 },
]
const sleepOptions = [
  { value: "Pre 6am", score: 10 },
  { value: "After 6am", score: 0 },
]
const readingOptions = [
  { value: "10 mins", score: 1 },
  { value: "30 mins", score: 3 },
  { value: "60 mins", score: 6 },
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
          options.map((val) => <Button id={val.name} height={10} background={"white"} colour={'black'} onClick={() => addLogoTodo(val.value, val.score, val.info)} p={2} > {val.value}</Button>)
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
          <Button background='gray.300' height={10} onClick={() => setType({ name: 'custom' })}>Custom</Button>
        </Stack>
        {type.name == 'gym' && logoItem("Gym", gymOptions)}
        {type.name == 'sleep' && logoItem("Sleep", sleepOptions)}
        {type.name == 'reading' && logoItem("Reading", readingOptions)}
        {type.name == 'custom' && customItem()}
      </Stack>
    </Flex>
  )
}
