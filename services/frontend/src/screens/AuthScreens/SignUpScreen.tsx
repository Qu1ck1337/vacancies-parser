import React, {useEffect, useState} from 'react';
import {
    Button,Card, CardBody, CardHeader, Flex, Heading, Input,
    Spacer, Text, Link,
} from "@chakra-ui/react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignUpScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const OnRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        
        await axios.post(
            'http://localhost:8000/sign-up',
            {
                name: name,
                email: email,
                password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json', // Важно указать Content-Type
                },
            })
            .then(response => {
                sessionStorage.setItem("token", response.data["token"]["access_token"]);
                navigate('/dashboard');
            })
            .catch ((error) => {
                console.error('Error while signing up:', error);
            })
    }


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
                        <form onSubmit={OnRegister}>
                            <Flex direction={"column"}>
                                <Input placeholder='Name'
                                       mb={2}
                                       w={"md"}
                                       onChange={(event) => setName(event.target.value)}
                                       required/>
                                <Input placeholder='Email'
                                       mb={2}
                                       w={"md"}
                                       onChange={(event) => setEmail(event.target.value)}
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