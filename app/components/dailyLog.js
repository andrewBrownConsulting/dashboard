import { Flex, Button, Input } from "@chakra-ui/react";
import { addCompleteServer, submitDailyLog } from "../todoServerFuncs";
import { useEffect, useState } from "react";

export default function DailyLog({ logs }) {
  const [log, setLog] = useState("");
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
    submitDailyLog(new Date(), log);
    setLog('');
    if (!alreadySubmitted) {
      setAlreadySubmitted(true);
      addCompleteServer("Submit Log", 1, '')
    }
  }
  return (
    <Flex justify={'center'} gap={10}>
      <Input type="text" placeholder="What did you do today?" value={log} onChange={e => setLog(e.target.value)} />
      <Button onClick={() => SubmitLog()}>Submit</Button>
    </Flex>
  )
}
