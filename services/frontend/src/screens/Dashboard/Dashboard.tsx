import React, {useEffect, useState} from 'react';
import {
    Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    Heading,
    Input, Link,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import axios from "axios";
import {timeAgo} from "../../utils/timeUtils";

const Dashboard = () => {
    const [name, setName] = useState('')
    const [history, setHistory] = useState([])
    const [vacancies, setVacancies] = useState([])
    const [position, setPosition] = useState("")
    const [skills, setSkills] = useState("")
    const [workFormat, setWorkFormat] = useState("")
    const [minimalSalary, setMinimalSalary] = useState(0)
    const [vacanciesCount, setVacanciesCount] = useState(-1)
    const [cofindersCount, setCofindersCount] = useState(-1)
    const [currentPage, setCurrentPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)
    const [isSearching, setIsSearching] = useState(false);

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

    useEffect(() => {
        axios.get('http://localhost:8000/vacancies_history', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Устанавливаем заголовок Authorization с Bearer токеном
            },
        })
            .then(response => {
                setHistory(response.data);
            })
            .catch(error => console.log(error))
    }, []);

    const searchVacancies = () => {
        console.log(currentPage)
        axios.post('http://localhost:8000/search_vacancies', {
            page: currentPage,
            position: position.length > 0 ? position : undefined,
            skills: skills.length > 0 ? skills : undefined,
            workFormat: workFormat.length > 0 ? workFormat : undefined,
            minimal_salary: minimalSalary > 0 ? minimalSalary : undefined
        }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                console.log(response.data);
                setVacanciesCount(response.data["vacancies_count"]);
                setCofindersCount(response.data["cofinders_count"]);
                setVacancies(response.data["items"]);
                setCurrentPage(response.data["page"] + 1)
                setMaxPage(response.data["pages"] + 1)
            })
            .catch(error => console.log(error))
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        searchVacancies()
    }

    const onNextPage = () => {
        setCurrentPage(currentPage + 1)
        searchVacancies()
    }

    const onPrevPage = () => {
        setCurrentPage(currentPage - 1)
        searchVacancies()
    }

    return (
        <Box
            p={6}
            bg="gray.50"
        >
            <Heading mb={2}>Recent searches</Heading>
            <Divider mb={6} orientation='horizontal' />
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {history.map(item => {
                    return(
                        <Card key={item["created_at"]}>
                            <CardHeader>
                                <Heading size='md'>{timeAgo(item["created_at"])}</Heading>
                            </CardHeader>
                            <CardBody>
                                {item["position"] ? <Text><b>Position:</b> {item["position"]}</Text> : null}
                                {item["skills"] ? <Text><b>Skills:</b> {item["skills"]}</Text> : null}
                                {item["work_format"] ? <Text><b>Work format:</b> {item["work_format"]}</Text> : null}
                                {item["minimal_salary"] ? <Text><b>Minimal salary:</b> {item["minimal_salary"]}</Text> : null}
                            </CardBody>
                            <CardFooter>
                                <Button>To return</Button>
                            </CardFooter>
                        </Card>
                )})}
            </SimpleGrid>

            <Divider m={12} orientation='horizontal' />

            <Box display={vacanciesCount > -1 ? "block" : "None"}>
                <Heading mb={6}><b>Overall vacancies:</b> {vacanciesCount}</Heading>
                <Heading mb={6}><b>Overall cofinders:</b> {cofindersCount}</Heading>
                <SimpleGrid mb={6} spacing={4} templateColumns='repeat(5, 1fr)'>
                    {vacancies.map(item => {
                        return(
                            <Card key={item["id"]}>
                                <CardHeader>
                                    <Heading size='md'>{item["name"]}</Heading>
                                    {item["salary"] ?
                                        <Text>{item["salary"]["from"] != null ? item["salary"]["from"] : ""}
                                            {item["salary"]["to"] != null ? " - " + item["salary"]["to"] : ""}
                                            {item["salary"]["currency"] != null ? " " + item["salary"]["currency"] : ""}</Text>
                                        : ""
                                    }
                                </CardHeader>
                                <CardBody>
                                    {item["snippet"]["requirement"]}
                                </CardBody>
                                <CardFooter>
                                    <Link href={item["alternate_url"]} color='teal.500' isExternal>
                                        To vacancy
                                    </Link>
                                </CardFooter>
                            </Card>
                        )})}
                </SimpleGrid>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink><Button size={"md"} onClick={onPrevPage}> Back </Button></BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink><Button size={"md"} onClick={onNextPage}> Next </Button></BreadcrumbLink>
                    </BreadcrumbItem>

                    <Text>{currentPage} of {maxPage} Page</Text>
                </Breadcrumb>
                <Divider m={12} orientation='horizontal'></Divider>
            </Box>

            <Flex
                alignItems="center"
                justifyContent="center"
            >
                <Card>
                    <CardBody>
                        <CardHeader>
                            <Heading size="md" textAlign="center">Find vacancies</Heading>
                        </CardHeader>
                        <form onSubmit={onSubmit}>
                            <Flex direction={"column"}>
                                <Input placeholder='Position'
                                       mb={2}
                                       w={"lg"}
                                       onChange={(event) => setPosition(event.target.value)}
                                />
                                <Input placeholder='Skills'
                                       mb={2}
                                       w={"lg"}
                                       onChange={(event) => setSkills(event.target.value)}
                                />
                                <Input placeholder='Work Format'
                                       mb={2}
                                       w={"lg"}
                                       onChange={(event) => setWorkFormat(event.target.value)}
                                />
                                <Box mb={2}>
                                    <Text>Minimal Salary</Text>
                                    <NumberInput
                                        min={0}
                                        defaultValue={0}
                                        onChange={(valueAsString, valueAsNumber) => {
                                            setMinimalSalary(valueAsNumber);
                                        }}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Box>
                                <Flex
                                    alignItems="center"
                                    justifyContent="end">
                                    <Button type={"submit"} colorScheme='blue'>Search</Button>
                                </Flex>
                            </Flex>
                        </form>
                    </CardBody>
                </Card>
            </Flex>
        </Box>
    );
};

export default Dashboard;