import { Grid, GridItem, Flex, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"
const links = [
  { name: "Andrew Todo", href: '/' },
  { name: "View All", href: '/all' },
  { name: "Logs", href: '/logs' },
  { name: "Books", href: '/books' },
  { name: "Values", href: '/values' },
  { name: "Buy", href: '/buy' },
]
export default function Header() {
  return (
    <>
      <Grid justify={'center'} gap={10} align="center" gridTemplateColumns={{ 'base': '1fr', 'sm': '1fr 1fr', 'md': '1fr 1fr 1fr', 'lg': 'repeat(6, 1fr)' }}>
        {links.map((val, key) => {
          return <GridItem key={key}><Link href={val.href}><Heading size={'2xl'} textAlign={'center'}>{val.name}</Heading></Link></GridItem>
        })}
        {/* <GridItem><Link href={'/'}><Heading size={'2xl'} textAlign={'center'}>Andrew Todo</Heading></Link></GridItem> */}
      </Grid>
    </>
  )
}
