'use client'
import { Button, GridItem, Heading, Select, Portal, createListCollection } from "@chakra-ui/react"
import { addTodoServer, } from "./todoServerFuncs";
import { useState } from "react";
export default function LogoItems({ updateLists }) {
  const [gymType, setGymType] = useState("Push")
  async function addLogoTodo(name, score, info) {
    addTodoServer(name, score, info);
    updateLists();
  }
  const logoItem = (name, score, info) => (
    <GridItem height={100} background={"white"} color='black' textAlign={'center'}
      borderRadius={'lg'} onClick={() => addLogoTodo(name, score, info)}>{name}</GridItem>
  )
  const gymOptions = createListCollection({
    items: [
      { label: "Push 1", value: "Push 1" },
      { label: "Pull 1", value: "Pull 1" },
      { label: "Legs 1", value: "Legs 1" },
      { label: "Push 2", value: "Push 2" },
      { label: "Pull 2", value: "Pull 2" },
      { label: "Legs 2", value: "Legs 2" },
    ]
  })
  return (
    <>
      <GridItem height={100} background={"white"} color='black' textAlign={'center'}
        borderRadius={'lg'} >
        <Heading>Gym</Heading>
        <Select.Root collection={gymOptions} width="320px"
          value={gymType}
          onValueChange={e => setGymType(e.value)}
        >
          <Select.HiddenSelect />
          <Select.Label>Select framework</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select framework" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {gymOptions.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                      {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal></Select.Control>
        </Select.Root>
        <Button onClick={() => addLogoTodo("Gym", 5, gymType)}>Add</Button>
      </GridItem>
      {logoItem('Sleep', 10, "Sleep input (currently unsupported)")}
      {logoItem('Reading', 2, "Read a book for >10 mins")}
      {logoItem('Social', 3, "Hangout with friends")}
    </>
  )
}
