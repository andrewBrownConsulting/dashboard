import { Grid, GridItem, Flex, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"
export default function Header() {
  return (
    <>
      <Grid justify={'center'} gap={10} align="center" gridTemplateColumns={{ 'base': '1fr', 'sm': '1fr 1fr', 'md': '1fr 1fr 1fr', 'lg': 'repeat(5, 1fr)' }}>
        <GridItem><Link href={'/'}><Heading size={'2xl'} textAlign={'center'}>Andrew Todo</Heading></Link></GridItem>
        <GridItem><Link href={'/all'} ><Heading textAlign={'center'} size={'2xl'}>View All</Heading></Link></GridItem>
        <GridItem><Link href={'/logs'}><Heading textAlign={'center'} size={'2xl'}>Logs</Heading></Link></GridItem>
        <GridItem><Link href={'/books'}><Heading textAlign={'center'} size={'2xl'}>Books</Heading></Link></GridItem>
        <GridItem><Link href={'/values'}><Heading textAlign={'center'} size={'2xl'}>Values</Heading></Link></GridItem>
      </Grid>
    </>
  )
}
