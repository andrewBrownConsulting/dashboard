'use client'
import { useEffect, useState } from "react";
import PieChart from "./pieChart";
import { Input, Button, Text, Flex, Stack, Grid } from "@chakra-ui/react";
import { addLongTermRecord } from "./todoServerFuncs";

function LongTermPie({ longTerm, title, name, target, start }) {
  const [newVal, setNewVal] = useState();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!longTerm)
      return;
    longTerm.forEach(element => {
      if (element.name == name) {
        setVal(element.score);
        console.log(element.score)
      }
    });
  }, [longTerm]);
  return (
    <Stack direction={'column'}>
      <PieChart title={title} percent={((start - val) / (start - target)) * 100} score={val} target={target} />
      <Input type="number" onChange={(e) => setNewVal(e.target.value)} maxW={100} />
      <Button onClick={() => addLongTermRecord(name, newVal)}>Add</Button>
    </Stack>
  );
}
export default function LongTerms({ longTerm }) {
  return (
    <Flex justify={'center'} >
      <Grid gridTemplateColumns={{ "base": "1fr 1fr", "sm": "1fr 1fr 1fr", "md": "1fr 1fr 1fr 1fr 1fr" }} gap={10}>
        <LongTermPie longTerm={longTerm} name={'balance'} title={'Money'} target={10000} start={0} />
        <LongTermPie longTerm={longTerm} name={'weight'} title={'Weight'} target={75} start={87} />
        <LongTermPie longTerm={longTerm} name={'pull'} title={'Pull'} target={10} start={0} />
        <LongTermPie longTerm={longTerm} name={'bench'} title={'Bench'} target={80} start={40} />
        <LongTermPie longTerm={longTerm} name={'run'} title={'Run'} target={25} start={40} />
        <LongTermPie longTerm={longTerm} name={'read'} title={'Reading'} target={300} start={0} />
      </Grid>
    </Flex>
  )
}
