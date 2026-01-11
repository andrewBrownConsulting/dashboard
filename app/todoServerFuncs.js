'use server'
import { ObjectId } from "mongodb";
import client from "./mongoClient";

export async function addTodoServer(name, score, info) {
  await client.connect();
  const db = client.db("dashboarddb");
  const todo = db.collection("todo")
  await todo.insertOne({ name, score, info });
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
export async function completeTodoServer(id) {
  await client.connect();
  const db = client.db("dashboarddb");
  const todo = db.collection("todo")
  const completed = db.collection("completed")
  const date = new Date();
  const task = await todo.findOne({ _id: new ObjectId(id) });
  await completed.insertOne({ ...task, date: date });
  await todo.deleteOne({ _id: new ObjectId(id) });
  const completeTasks = await completed.find({}).toArray()
  console.log(completeTasks)
}
export async function getAllCompletedServer() {
  await client.connect();
  const db = client.db("dashboarddb");
  const completed = db.collection("completed")
  let completedArray = await completed.find({}).toArray();
  completedArray = completedArray.map(val => ({ id: val._id.toString(), name: val.name, score: val.score, info: val.info }))
  return completedArray;
}
export async function deletedCompletedId(id) {
  await client.connect();
  const db = client.db("dashboarddb");
  const todo = db.collection("completed")
  await todo.deleteOne({ _id: new ObjectId(id) });
}
