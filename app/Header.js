import { Flex, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"
export default function Header() {
  return (
    <>
      <Flex justify={'center'} gap={10} align="center" >
        <Link href={'/'}><Heading size={'2xl'} textJustify={'center'}>Andrew Todo</Heading></Link>
        <Link href={'/all'} ><Heading textAlign="center" size={'2xl'}>View All</Heading></Link>
        <Link href={'/logs'}><Heading size={'2xl'}>Logs</Heading></Link>
        <Link href={'/books'}><Heading size={'2xl'}>Books</Heading></Link>
      </Flex>
    </>
  )
}
