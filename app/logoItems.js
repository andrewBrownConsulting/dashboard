'use client'
import { Grid, Flex, GridItem, Button, Heading, Stack, Spinner } from "@chakra-ui/react"
import { addCompleteServer, addTodoServer, } from "./todoServerFuncs";
import { useState } from "react";

const allOptions = [
  { name: "NYTimes", score: 1, info: "Complete NYTimes Games" },
  { name: "Go on Date", score: 10 },
  { name: "Go out with Friends ", score: 10 },
]
function LogoItem({ name, score, info, updateLists }) {
  const [sending, setSending] = useState(false);
  async function addLogoTodo(name, score, info) {
    setSending(true);
    await addCompleteServer(name, score, info)
    await updateLists();
    setSending(false);
  }
  return (
    <GridItem key={name} width={300} background={"black"} color='white' textAlign={'center'} borderRadius={'lg'}  >
      {sending ?
        <Spinner size={'lg'} /> :
        <Button width={200} key={name} id={name} height={10} background={"white"} colour={'black'} onClick={() => addLogoTodo(name, score, info)} p={2} >
          {name}
        </Button>
      }
    </GridItem >
  )
}
export default function LogoItems({ updateLists }) {
  return (
    <Flex justify={'center'}>
      <Grid templateColumns='1fr' gap={2}>
        <GridItem p={1} height={10}>
          <Heading textAlign={'center'}>Quick Options</Heading>
        </GridItem>
        {allOptions.map((val, i) => (<LogoItem name={val.name} score={val.score} info={val.info} updateLists={updateLists} />))}
      </Grid>
    </Flex>
  )
}
