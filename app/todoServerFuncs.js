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
export async function updateTodoServer(id, name, score, info) {
  await client.connect();
  const db = client.db("dashboarddb");
  const todo = db.collection("todo")
  await todo.updateOne({ _id: new ObjectId(id) }, { $set: { name, score, info } });
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
}
export async function addCompleteServer(name, score, info) {
  await client.connect();
  const db = client.db("dashboarddb");
  const completed = db.collection("completed")
  const date = new Date();
  await completed.insertOne({ name, score, info, date });
}

export async function undoCompleteTodoServer(id) {
  await client.connect();
  const db = client.db("dashboarddb");
  const todo = db.collection("todo")
  const completed = db.collection("completed")
  const date = new Date();
  const task = await completed.findOne({ _id: new ObjectId(id) });
  await todo.insertOne({ ...task, date: date });
  await completed.deleteOne({ _id: new ObjectId(id) });
}
export async function updateCompleteServer(id, name, score, info) {
  await client.connect();
  const db = client.db("dashboarddb");
  const completed = db.collection("completed")
  await completed.updateOne({ _id: new ObjectId(id) }, { $set: { name, score, info } });
}
export async function getAllCompletedServer() {
  await client.connect();
  const db = client.db("dashboarddb");
  const completed = db.collection("completed")
  let completedArray = await completed.find({}).toArray();
  completedArray = completedArray.map(val => (
    { id: val._id.toString(), name: val.name, score: val.score, info: val.info, date: val.date }))
  return completedArray;
}
export async function deletedCompletedId(id) {
  await client.connect();
  const db = client.db("dashboarddb");
  const todo = db.collection("completed")
  await todo.deleteOne({ _id: new ObjectId(id) });
}
export async function addLongTermRecord(name, score) {
  await client.connect();
  const db = client.db("dashboarddb");
  const longScores = db.collection("longScores")
  const date = new Date();
  await longScores.insertOne({ name, score, date });
}
export async function getLongTermRecords(name) {
  await client.connect();
  const db = client.db("dashboarddb");
  const longScores = db.collection("longScores")
  let longTermArray = await longScores.find({ name: name }).toArray();
  longTermArray = longTermArray.map(val => (
    { id: val._id.toString(), name: val.name, score: val.score, date: val.date }))
  return longTermArray;
}
export async function getAllLongTermRecords() {
  await client.connect();
  const db = client.db("dashboarddb");
  const longScores = db.collection("longScores")
  let longTermArray = await longScores.find({}).toArray();
  longTermArray = longTermArray.map(val => (
    { id: val._id.toString(), name: val.name, score: val.score, date: val.date }))
  return longTermArray;
}
export async function submitDailyLog(date, log) {
  await client.connect();
  const db = client.db("dashboarddb");
  const logs = db.collection("logs")
  await logs.insertOne({ log, date });
}
export async function updateDailyLog(id, log) {
  await client.connect();
  const db = client.db("dashboarddb");
  const logs = db.collection("logs")
  await logs.updateOne({ _id: new ObjectId(id) }, { $set: { log } });
}
export async function getAllDailyLogs() {
  await client.connect();
  const db = client.db("dashboarddb");
  const logs = db.collection("logs")
  let logArray = await logs.find({}).toArray();
  logArray = logArray.map(val => (
    { id: val._id.toString(), log: val.log, date: val.date }))
  return logArray;
}
export async function addBook(title) {
  await client.connect();
  const db = client.db("dashboarddb");
  const books = db.collection("books")
  await books.insertOne({ title });
}
export async function getAllBooks() {
  await client.connect();
  const db = client.db("dashboarddb");
  const books = db.collection("books")
  let bookArray = await books.find({}).toArray();
  bookArray = bookArray.map(val => (
    { id: val._id.toString(), title: val.title }))
  return bookArray;
}
export async function removeBook(id) {
  await client.connect();
  const db = client.db("dashboarddb");
  const books = db.collection("books")
  await books.deleteOne({ _id: new ObjectId(id) });
}
