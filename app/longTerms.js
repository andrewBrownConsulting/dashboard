'use client'
import { useEffect, useState } from "react";
import PieChart from "./pieChart";
import { Input, Button, Flex, Stack } from "@chakra-ui/react";
import { addLongTermRecord } from "./todoServerFuncs";

const targetMoney = 10000;
const startWeight = 87;
const targetWeight = 75;
const startBench = 40;
const targetBench = 80;
const targetPull = 10;
const startRun = 35;
const targetRun = 25;
export default function LongTerms({ longTerm }) {
  const [newBalance, setNewBalance] = useState();
  const [balance, setBalance] = useState(0);
  const [newWeight, setNewWeight] = useState();
  const [weight, setWeight] = useState(0);
  const [newBench, setNewBench] = useState();
  const [bench, setBench] = useState(0);
  const [newPull, setNewPull] = useState();
  const [pull, setPull] = useState(0);
  const [newRun, setNewRun] = useState(0);
  const [run, setRun] = useState();
  async function setLongTermServer(name, value) {
    await addLongTermRecord(name, value);
  }
  useEffect(() => {
    if (!longTerm)
      return;

    longTerm.forEach(element => {
      console.log(element)
      if (element.name == 'balance')
        setBalance(element.score / targetMoney * 100)
      else if (element.name == 'weight')
        setWeight((startWeight - element.score) / (startWeight - targetWeight) * 100)
      if (element.name == 'bench')
        setBench((element.score - startBench) / (targetBench - startBench) * 100)
      if (element.name == 'pull')
        setPull((element.score) / (targetPull) * 100)
      if (element.name == 'run')
        setRun((startRun - element.score) / (startRun - targetRun) * 100)
    });
  }, [longTerm])
  return (
    <Flex justify={'center'} gap={10}>
      <Stack direction={'column'}>
        <PieChart title={"Money"} percent={balance} />
        <Input type="number" onChange={(e) => setNewBalance(e.target.value)} maxW={100} />
        <Button onClick={() => setLongTermServer('balance', newBalance)}>Add</Button>
      </Stack>
      <Stack direction={'column'}>
        <PieChart title={"Weight"} percent={weight} />
        <Input type="number" onChange={(e) => setNewWeight(e.target.value)} maxW={100} />
        <Button onClick={() => setLongTermServer('weight', newWeight)}>Add</Button>
      </Stack>
      <Stack direction={'column'}>
        <PieChart title={"Bench"} percent={bench} />
        <Input type="number" onChange={(e) => setNewBench(e.target.value)} maxW={100} />
        <Button onClick={() => setLongTermServer('bench', newBench)}>Add</Button>
      </Stack>
      <Stack direction={'column'}>
        <PieChart title={"Pull"} percent={pull} />
        <Input type="number" onChange={(e) => setNewPull(e.target.value)} maxW={100} />
        <Button onClick={() => setLongTermServer('pull', newPull)}>Add</Button>
      </Stack>
      <Stack direction={'column'}>
        <PieChart title={"Run"} percent={run} />
        <Input type="number" onChange={(e) => setNewRun(e.target.value)} maxW={100} />
        <Button onClick={() => setLongTermServer('run', newRun)}>Add</Button>
      </Stack>
    </Flex>
  )
}
