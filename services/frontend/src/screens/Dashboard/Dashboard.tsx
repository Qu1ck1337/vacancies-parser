import React, {useEffect, useState} from 'react';
import {Text} from "@chakra-ui/react";
import axios from "axios";

const Dashboard = () => {
    const [name, setName] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8000/users/me', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Устанавливаем заголовок Authorization с Bearer токеном
            },
        })
            .then(response => {
                setName(response.data["name"])
            })
            .catch(error => console.log(error))
    });

    return (
        <Text>Hello, {name}!</Text>
    );
};

export default Dashboard;