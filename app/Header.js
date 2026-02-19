import { Flex, Heading, Text } from "@chakra-ui/react"
import Link from "next/link"
export default function Header() {
  return (
    <>
      <Flex justify={'center'} gap={10} align="center" >
        <Link href={'/'}><Heading size={'2xl'} textJustify={'center'}>Andrew Todo</Heading></Link>
        <Link href={'/all'} ><Heading textAlign="center" size={'2xl'}>View All</Heading></Link>
        <Link href={'/logs'}><Heading size={'2xl'}>Logs</Heading></Link>
      </Flex>
      <Heading textAlign={"center"} fontSize={'3xl'}>Change of the week: <Text as="span" color="red.500">Record a Vlog</Text>
      </Heading>
    </>
  )
}
