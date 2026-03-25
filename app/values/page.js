import { Flex, Stack, List, Heading, Button, Grid, GridItem } from "@chakra-ui/react"
import Header from "../Header"
function GridValue(item, value) {
  return (
    <>
      <GridItem width={'250px'} borderWidth={1} borderColor={'white'}>
        {item}
      </GridItem>
      <GridItem width={'250px'} borderWidth={1} borderColor={'white'}>
        {value}
      </GridItem>
    </>
  )
}
export default function Values() {
  return (
    <Stack align={'center'} >
      <Header />
      <Grid padding={5} maxWidth={'1000px'} gridTemplateColumns={{ 'base': 'repeat(2,1fr)' }}>
        {GridValue("Date", 10)}
        {GridValue("Gym", 5)}
        {GridValue("Go out with Friends", 10)}
      </Grid>
    </Stack>
  )
}
