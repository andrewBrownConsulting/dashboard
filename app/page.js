import { Grid, GridItem, List, Box } from "@chakra-ui/react"
import PointsGraph from "./pointsGraph";
import Todo from "./todo"
export default function Home() {
  const logoItem = (name) => (
    <GridItem height={100} background={"white"} color='black' textAlign={'center'}
      borderRadius={'lg'}>{name}</GridItem>
  )
  return (
    <Box margin={"auto"}>
      <Grid templateColumns={{ 'bs': '1fr', 'md': '1fr 1fr 1fr 1fr' }}
        width={'100%'} maxW={1000} gap={10} >
        {logoItem('Gym')}
        {logoItem('Sleep')}
        {logoItem('Reading')}
        {logoItem('Social')}
        <GridItem colSpan={4} background={"green.50"}>
          <PointsGraph />
        </GridItem>
        <GridItem colSpan={2}>
          <Todo />
        </GridItem>
      </Grid>
    </Box>
  );
}
