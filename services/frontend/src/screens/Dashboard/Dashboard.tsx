import React, {useEffect, useRef, useState} from 'react';
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
    NumberInput,
    NumberInputField,
    Select,
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
    const [schedule, setSchedule] = useState([])


    useEffect(() => {
        axios.get("https://api.hh.ru/dictionaries").then(response => {
            setSchedule(response.data["schedule"]);
        })
        checkVacanciesHistory();
    }, []);


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
    }, []);

    const checkVacanciesHistory = () => {
        axios.get('http://localhost:8000/vacancies_history', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Устанавливаем заголовок Authorization с Bearer токеном
            },
        })
            .then(response => {
                setHistory(response.data);
            })
            .catch(error => console.log(error))
    };

    const searchVacancies = (page: number) => {
        axios.post('http://localhost:8000/search_vacancies', {
            page: page,
            position: position.length > 0 ? position : undefined,
            skills: skills.length > 0 ? skills : undefined,
            work_format: workFormat.length > 0 ? workFormat : undefined,
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
                setCurrentPage(response.data["page"])
                setMaxPage(response.data["pages"])
                checkVacanciesHistory();
            })
            .catch(error => console.log(error))
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        new Promise(() => searchVacancies(0)).then(
            checkVacanciesHistory
        )
    }

    const onNextPage = () => {
        searchVacancies(currentPage + 1);
    }

    const onPrevPage = () => {
        searchVacancies(currentPage - 1);
    }

    const onReturnHistory = (item: any) => {
        setPosition(item["position"]);
        setSkills(item["skills"]);
        setWorkFormat(item["work_format"]);
        setMinimalSalary(item["minimal_salary"]);
        scrollToSearchForm();
    }


    const searchForm = useRef<HTMLFormElement>(null);

    const scrollToSearchForm = () => {
        if (searchForm.current) {
            searchForm.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };



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
                                <Button onClick={() => onReturnHistory(item)}>To return</Button>
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

                    <Text>{currentPage + 1} of {maxPage} Page</Text>
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
                        <form onSubmit={onSubmit} ref={searchForm}>
                            <Flex direction={"column"}>
                                <Input placeholder='Position'
                                       mb={2}
                                       w={"lg"}
                                       onChange={(event) => setPosition(event.target.value)}
                                       value={position}
                                />
                                <Input placeholder='Skills'
                                       mb={2}
                                       w={"lg"}
                                       onChange={(event) => setSkills(event.target.value)}
                                       value={skills}
                                />
                                <Select placeholder='Work format' onChange={
                                    event => {
                                        setWorkFormat(event.currentTarget.value);
                                        console.log(event.currentTarget.value);
                                    }}
                                    value={workFormat}
                                >
                                    {schedule.map(item => {
                                        return (<option value={item["id"]}>{item["name"]}</option>)
                                    })}
                                </Select>
                                <Box mb={2}>
                                    <Text>Minimal Salary</Text>
                                    <Flex
                                        alignItems={"center"}
                                    >
                                        <NumberInput
                                            min={0}
                                            defaultValue={0}
                                            onChange={(valueAsString, valueAsNumber) => {
                                                setMinimalSalary(valueAsNumber);
                                            }}
                                            value={minimalSalary}
                                        >
                                            <NumberInputField />
                                        </NumberInput>
                                        <Text ml={"2"} size={"lg"}>RUB</Text>
                                    </Flex>

                                </Box>
                                <Flex
                                    alignItems="center"
                                    justifyContent="end">
                                    <Button colorScheme='blue' onClick={onSubmit}>Search</Button>
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