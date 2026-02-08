import { Flex, Button, Input, Textarea } from "@chakra-ui/react";
import { addCompleteServer, submitDailyLog, updateDailyLog } from "../todoServerFuncs";
import { useEffect, useState } from "react";

export default function DailyLog({ logs }) {
  const [log, setLog] = useState({ log: "" });
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    if (!logs)
      return;
    const todaysLog = logs.find(item => (item.date.toDateString() == new Date().toDateString()));
    if (todaysLog) {
      setLog(todaysLog);
      setAlreadySubmitted(true);
    }
  }, [logs])

  function SubmitLog() {
    if (alreadySubmitted)
      updateDailyLog(log.id, log.log);
    else {
      submitDailyLog(new Date(), log.log);
      setAlreadySubmitted(true);
      addCompleteServer("Submit Log", 1, '')
    }
  }
  return (
    <Flex justify={'center'} gap={10}>
      <Textarea type="text" placeholder="What did you do today?" value={log.log} onChange={e => setLog({ ...log, log: e.target.value })} />
      <Button onClick={() => SubmitLog()}>Submit</Button>
    </Flex>
  )
}
