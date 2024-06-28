import React, {useState} from 'react';
import {
    Button, Card, CardBody, CardHeader, Flex, Heading, Input,
    Spacer, Text, Link, Box, Alert, AlertIcon, AlertTitle, AlertDescription,
} from "@chakra-ui/react";

const LoginScreen = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)

    return (
        <>
            <Flex
                height="100vh"
                alignItems="center"
                justifyContent="center"
                bg="gray.50"
            >
                <Card>
                    <CardHeader>
                        <Heading size="md" textAlign="center">Welcome!</Heading>
                    </CardHeader>
                    <CardBody>
                        <Alert status='error' mb={2} borderRadius={8} hidden={!loginError}>
                            <AlertIcon />
                            <AlertTitle>Неверный логин или пароль!</AlertTitle>
                        </Alert>
                        <form onSubmit={() => {}}>
                            <Flex direction={"column"}>
                                <Input placeholder='Login'
                                       mb={2}
                                       w={"md"}
                                       onChange={(event) => setLogin(event.target.value)}
                                       required/>
                                <Input placeholder='Password'
                                       mb={2}
                                       w={"md"}
                                       onChange={(event) => setPassword(event.target.value)}
                                       required/>
                                <Flex alignItems={"center"}>
                                    <Text alignSelf={"start"}>
                                        Haven't registered yet? {' '}
                                        <Link color='teal.500' href='/sign-up'>
                                            Sign up
                                        </Link>
                                    </Text>
                                    <Spacer></Spacer>
                                    <Button type="submit" colorScheme='blue' maxW={"max-content"}>Login</Button>
                                </Flex>
                            </Flex>
                        </form>
                    </CardBody>
                </Card>
            </Flex>
        </>
    );
};

export default LoginScreen;