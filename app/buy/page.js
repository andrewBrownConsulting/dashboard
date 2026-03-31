'use client'
import { Flex, Stack, List, Heading, Button } from "@chakra-ui/react"
import Header from "../Header"
import { useEffect, useState } from "react";
import { getAllBuyItems, removeBuyItem } from "../todoServerFuncs";
import { AddBuyForm } from "./buyForm";
export default function Buy() {
  const [allBuyItems, setAllBuyItems] = useState();
  const updateBuyItems = async () => {
    setAllBuyItems(await getAllBuyItems());
  }
  useEffect(() => {
    updateBuyItems();
  }, [])
  return (
    <Flex justify="center" >
      <Stack direction={'column'} maxW="1000" gap={10} >
        <Header />
        <Heading>Buy List</Heading>
        <List.Root>
          {allBuyItems?.map((item) => (
            <List.Item >{item.title} <Button onClick={async () => { await removeBuyItem(item.id); updateBuyItems(); }}>x</Button> </List.Item>
          ))}
        </List.Root>
        <AddBuyForm />
      </Stack>
    </Flex >
  )
}
