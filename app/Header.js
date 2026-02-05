import { Flex, Heading } from "@chakra-ui/react"
import Link from "next/link"
export default function Header() {
  return (
    <Flex justify={'center'} gap={10}>
      <Link href={'/'}><Heading size={'2xl'}>Andrew Todo</Heading></Link>
      <Link href={'/all'}><Heading size={'xl'}>View All</Heading></Link>
    </Flex>
  )
}
