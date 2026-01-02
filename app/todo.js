'use client'
import { List } from "@chakra-ui/react"
import { useState, useEffect } from "react";
export default function Todo() {
  const [todos, setTodos] = useState([]);

  async function getData() {
    const res = await fetch('/data.json');
    const data = await res.json();
    setTodos(data.tasks);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <List.Root background={'blue'}>
      {todos.map((listItem, index) =>
      (<List.Item key={index}>{listItem.name} - {listItem.score} - {listItem.info}
      </List.Item>))}
    </List.Root>
  );
}
