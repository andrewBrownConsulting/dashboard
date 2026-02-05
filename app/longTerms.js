'use client'
import { useEffect, useState } from "react";
import PieChart from "./pieChart";
import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import { addLongTermRecord } from "./todoServerFuncs";

const targetMoney = 10000;
const startWeight = 87;
const targetWeight = 75;
export default function LongTerms({ longTerm }) {
  const [inputBalance, setInputBalance] = useState();
  const [inputWeight, setInputWeight] = useState();
  const [balance, setBalance] = useState(0);
  const [weight, setWeight] = useState(0);
  async function setLongTermServer(name, value) {
    addLongTermRecord(name, value);
  }
  useEffect(() => {
    if (!longTerm)
      return;

    longTerm.forEach(element => {
      if (element.name == 'balance')
        setBalance(element.score / targetMoney * 100)
      if (element.name == 'weight')
        setWeight((startWeight - element.score) / (startWeight - targetWeight) * 100)
    });
  }, [longTerm])
  return (
    <Flex justify={'center'} gap={10}>
      <Stack direction={'column'}>
        <PieChart title={"Money"} percent={balance} />
        <Input type="number" onChange={(e) => setInputBalance(e.target.value)} maxW={100} />
        <Button onClick={() => setLongTermServer('balance', inputBalance)}>Add</Button>
      </Stack>
      <Stack direction={'column'}>
        <PieChart title={"Weight"} percent={weight} />
        <Input type="number" onChange={(e) => setInputWeight(e.target.value)} maxW={100} />
        <Button onClick={() => setLongTermServer('weight', inputWeight)}>Add</Button>
      </Stack>
    </Flex>
  )
}
