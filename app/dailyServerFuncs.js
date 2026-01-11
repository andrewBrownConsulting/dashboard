'use server'
import { ObjectId } from "mongodb";
import client from "./mongoClient";

export async function addScoreForDate(score, date) {
  await client.connect();
  const db = client.db("dashboarddb");
  const dailyScores = db.collection("dailyScores")
  await dailyScores.insertOne({ score, date });
}
export async function deleteDailyScore(id) {
  await client.connect();
  const db = client.db("dashboarddb");
  const dailyScores = db.collection("dailyScores")
  await dailyScores.deleteOne({ _id: new ObjectId(id) });
}
export async function getDailyScores() {
  await client.connect();
  const db = client.db("dashboarddb");
  const dailyScores = db.collection("dailyScores")
  let dailyScoresArray = await dailyScores.find({}).toArray();
  dailyScoresArray = dailyScoresArray.map(val => ({ id: val._id.toString(), date: val.date, score: val.score }))
  return dailyScoresArray;
}
