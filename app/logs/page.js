import { getAllDailyLogs } from "../todoServerFuncs";
import { ClientView } from "./client";
export default async function ViewLogs() {
  const completed = await getAllDailyLogs();
  return <ClientView completed={completed} />
}
