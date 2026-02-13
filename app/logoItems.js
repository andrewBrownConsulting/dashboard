'use client'
import { Grid, Flex, GridItem, Button, Box, Heading, Select, Portal, createListCollection, Input, Stack } from "@chakra-ui/react"
import { addCompleteServer, addTodoServer, } from "./todoServerFuncs";
import { useState } from "react";

const allOptions = [
  { value: "NYTimes", score: 2, info: "Complete NYTimes Games" },
  { value: "Go on Date", score: 10 },
  { value: "Go out with Friends ", score: 10 },
]
export default function LogoItems({ updateLists }) {
  async function addLogoTodo(name, score, info) {
    addCompleteServer(name, score, info)
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
  return (
    <Flex justify={'center'}>
      <Stack direction={"row"}>
        {logoItem("Quick Options", allOptions)}
      </Stack>
    </Flex>
  )
}
