'use client'
import { useEffect, useState } from "react";
import PieChart from "./pieChart";
import { Input, Button, Text, Flex, Stack, Grid, Spinner } from "@chakra-ui/react";
import { addLongTermRecord } from "./todoServerFuncs";

function LongTermPie({ longTerm, title, name, target, start, updateLists }) {
  const [newVal, setNewVal] = useState();
  const [val, setVal] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  async function submitToServer(name, newVal) {
    setSubmitting(true)
    await addLongTermRecord(name, newVal);
    updateLists();
    setSubmitting(false)
  }
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
      {submitting ?
        <Spinner size={'lg'} /> :
        <Button onClick={() => submitToServer(name, newVal)}>Add</Button>
      }
    </Stack >
  );
}
export default function LongTerms({ longTerm, updateLists }) {
  return (
    <Flex justify={'center'} >
      <Grid gridTemplateColumns={{ "base": "1fr 1fr", "sm": "1fr 1fr 1fr", "md": "1fr 1fr 1fr 1fr 1fr" }} gap={10}>
        <LongTermPie longTerm={longTerm} updateLists={updateLists} name={'balance'} title={'Money'} target={10000} start={0} />
        <LongTermPie longTerm={longTerm} updateLists={updateLists} name={'weight'} title={'Weight'} target={75} start={87} />
        <LongTermPie longTerm={longTerm} updateLists={updateLists} name={'pull'} title={'Pull'} target={10} start={0} />
        <LongTermPie longTerm={longTerm} updateLists={updateLists} name={'bench'} title={'Bench'} target={80} start={40} />
        <LongTermPie longTerm={longTerm} updateLists={updateLists} name={'run'} title={'Run'} target={25} start={40} />
        <LongTermPie longTerm={longTerm} updateLists={updateLists} name={'read'} title={'Reading'} target={300} start={0} />
      </Grid>
    </Flex>
  )
}
