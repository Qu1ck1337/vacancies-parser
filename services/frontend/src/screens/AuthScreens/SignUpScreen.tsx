import React, {useState} from 'react';
import {
    Button,Card, CardBody, CardHeader, Flex, Heading, Input,
    Spacer, Text, Link,
} from "@chakra-ui/react";

const SignUpScreen = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    return (
        <>
            <Flex
                height="100vh"
                alignItems="center"
                justifyContent="center"
                bg="gray.50"
            >
                <Card>
                    <CardBody>
                        <CardHeader>
                            <Heading size="md" textAlign="center">Registration</Heading>
                        </CardHeader>
                        <form onSubmit={() => {}}>
                            <Flex direction={"column"}>
                                <Input placeholder='Name'
                                       mb={2}
                                       w={"md"}
                                       onChange={(event) => setName(event.target.value)}
                                       required/>
                                <Input placeholder='Username'
                                       mb={2}
                                       w={"md"}
                                       onChange={(event) => setUsername(event.target.value)}
                                       required/>
                                <Input placeholder='Password'
                                       mb={2}
                                       w={"md"}
                                       onChange={(event) => setPassword(event.target.value)}
                                       required/>
                                <Flex alignItems={"center"}>
                                    <Text alignSelf={"start"}>
                                        Already registered? {' '}
                                        <Link color='teal.500' href='/login'>
                                            Log in
                                        </Link>
                                    </Text>
                                    <Spacer></Spacer>
                                    <Button type={"submit"} colorScheme='blue' maxW={"max-content"}>Sign up</Button>
                                </Flex>
                            </Flex>
                        </form>
                    </CardBody>
                </Card>
            </Flex>
        </>
    );
};

export default SignUpScreen;