import { Flex, Button, Input, Textarea, Spinner } from "@chakra-ui/react";
import { addCompleteServer, submitDailyLog, updateDailyLog } from "../todoServerFuncs";
import { useEffect, useState } from "react";

export default function DailyLog({ logs }) {
  const [log, setLog] = useState({ log: "" });
  const [sending, setSending] = useState(false);
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

  async function SubmitLog() {
    setSending(true);
    if (alreadySubmitted)
      await updateDailyLog(log.id, log.log);
    else {
      await submitDailyLog(new Date(), log.log);
      setAlreadySubmitted(true);
      await addCompleteServer("Submit Log", 1, '')
    }
    setSending(false);
  }
  return (
    <Flex justify={'center'} gap={10}>
      <Textarea type="text" placeholder="What did you do today?" value={log.log} onChange={e => setLog({ ...log, log: e.target.value })} />
      {sending ?
        <Spinner size={'lg'} /> :
        <Button onClick={() => SubmitLog()}>Submit</Button>
      }
    </Flex>
  )
}
