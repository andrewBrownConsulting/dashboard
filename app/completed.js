'use client'
import { Button, List } from "@chakra-ui/react"
import { deletedCompletedId, getAllCompletedServer } from "./todoServerFuncs";
import { useEffect, useState } from "react";
export default function Completed({ completed, updateLists }) {
  async function deleteCompleted(id) {
    await deletedCompletedId(id);
    updateLists();
  }
  useEffect(() => {
    updateLists();
  }, [])
  return (
    <div>
      <h1>Completed:</h1>
      <List.Root background={'red'}>
        {
          completed.map((listItem) =>
          (<List.Item key={listItem.id}>
            {listItem.name} - {listItem.score} - {listItem.info}
            <Button onClick={() => deleteCompleted(listItem.id)}>X</Button>
          </List.Item>))
        }
      </List.Root>
    </div>
  )
}
