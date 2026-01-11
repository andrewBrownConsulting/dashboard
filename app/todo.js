'use client'
import { Button, Input, List } from "@chakra-ui/react"
import { addTodoServer, completeTodoServer, deletedCompletedId, deleteTodoServer, getAllCompletedServer, getAllTodosServer } from "./todoServerFuncs";
import { useEffect, useState } from "react";
export default function Todo({ todos, updateLists }) {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [info, setInfo] = useState("");

  async function addTodo() {
    await addTodoServer(name, score, info);
    setName("");
    setScore("");
    setInfo("");
    updateLists();
  }
  async function deleteTodo(id) {
    await deleteTodoServer(id);
    updateLists();
  }
  async function completeTodo(id) {
    await completeTodoServer(id);
    updateLists();
  }
  useEffect(() => {
    updateLists();
  }, [])
  return (
    <div>
      <h1>To Do:</h1>
      <List.Root background={'blue'}>
        {
          todos.map((listItem) =>
          (<List.Item key={listItem.id}>
            {listItem.name} - {listItem.score} - {listItem.info}
            <Button onClick={() => completeTodo(listItem.id)}>Complete</Button>
            <Button onClick={() => deleteTodo(listItem.id)}>X</Button>
          </List.Item>))
        }
      </List.Root>
      <form onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
        <Input type="text" placeholder="task" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="number" placeholder="score" onChange={(e) => setScore(e.target.value)} />
        <Input type="text" placeholder="description" onChange={(e) => setInfo(e.target.value)} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
