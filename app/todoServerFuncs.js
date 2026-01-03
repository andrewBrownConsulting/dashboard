'use server'
import { ObjectId } from "mongodb";
import client from "./client";

export async function addTodoServer(name, score, info) {
  await client.connect();
  const db = client.db("dashboarddb");
  const todo = db.collection("todo")
  await todo.insertOne({ name, score, info });
}
export async function completeTodoServer(id) {
  await client.connect();
  const db = client.db("dashboarddb");
  const todo = db.collection("todo")
  const completed = db.collection("completed")
  const task = await todo.findOne({ _id: new ObjectId(id) });
  await completed.insertOne(task);
  await todo.deleteOne({ _id: new ObjectId(id) });
  console.log(task)
  const completeTasks = await completed.find({}).toArray()
  console.log(completeTasks)
}
export async function deleteTodoServer(id) {
  await client.connect();
  const db = client.db("dashboarddb");
  const todo = db.collection("todo")
  await todo.deleteOne({ _id: new ObjectId(id) });
}
export async function getAllTodosServer() {
  await client.connect();
  const db = client.db("dashboarddb");
  const todo = db.collection("todo")
  let todoArray = await todo.find({}).toArray();
  todoArray = todoArray.map(val => ({ id: val._id.toString(), name: val.name, score: val.score, info: val.info }))
  return todoArray;
}
