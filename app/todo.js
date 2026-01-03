'use client'
import { Button, Input, List } from "@chakra-ui/react"
import { addTodoServer, completeTodoServer, deleteTodoServer, getAllTodosServer } from "./todoServerFuncs";
import { useEffect, useState } from "react";
export default function Todo() {
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [info, setInfo] = useState("");

  const [todos, setTodos] = useState([]);

  async function getAllTodos() {
    const todos = await getAllTodosServer();
    setTodos(todos);
  }
  async function addTodo() {
    await addTodoServer(name, score, info);
    setName(null);
    setScore(null);
    setInfo(null);
    getAllTodos();
  }
  async function deleteId(id) {
    await deleteTodoServer(id);
    getAllTodos();
  }
  async function completeId(id) {
    await completeTodoServer(id);
    getAllTodos();
  }
  useEffect(() => {
    getAllTodos();
  }, [])
  return (
    <div>
      <h1>To Do:</h1>
      <List.Root background={'blue'}>
        {
          todos.map((listItem) =>
          (<List.Item key={listItem.id}>
            {listItem.name} - {listItem.score} - {listItem.info}
            <Button onClick={() => completeId(listItem.id)}>Complete</Button>
            <Button onClick={() => deleteId(listItem.id)}>X</Button>
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
