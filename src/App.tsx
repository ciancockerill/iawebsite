import React, {useEffect, useState} from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

import talkingGif from './assets/images/talking.gif'
import bicycleGif from './assets/images/bikeconveyer.gif'
import customerGif from './assets/images/customerrelation.gif'
import iaLogo from './assets/images/ia-logo.svg'
import interviewGif from './assets/images/interviewRoom.gif'
import lionLairGif from './assets/images/lionsLair.gif'

const rooms = [
    { id: 1, name: 'Group Discussion', text: '/talkingPageText.txt', img: talkingGif },
    { id: 2, name: 'Bicycle Manufacturing', text: '/bicycleManufacturingText.txt', img: bicycleGif },
    { id: 3, name: 'Customer Relations', text: '/crText.txt', img: customerGif },
    { id: 4, name: 'Interview Room', text: '/hiringText.txt', img: interviewGif },
    { id: 5, name: 'Lions Lair', text: '/pitchText.txt', img: lionLairGif },
];

const App: React.FC = () => {
    const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
    const totalRooms = rooms.length;
    const [currentRoomTxt, setRoomTxt] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setRoomTxt('');
        fetch(rooms[currentRoomIndex].text)
            .then(response => response.text())
            .then(text => {
                setRoomTxt(text);
                setLoading(false);
            });
    },[currentRoomIndex, setRoomTxt])

    // Navigate to the previous room
    const handlePrevRoom = () => {
        setCurrentRoomIndex((prevIndex) => (prevIndex === 0 ? totalRooms - 1 : prevIndex - 1));
    };

    // Navigate to the next room
    const handleNextRoom = () => {
        setCurrentRoomIndex((prevIndex) => (prevIndex === totalRooms - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Container className="text-center mt-5 minimalistic-container">
            <img className="IA-logo" src={iaLogo} alt={"Innovation Academy Logo"}/>
            <h1 className="mb-4">VR Reflection</h1>

            <div className="room-navigation">
                <Row className="align-items-center justify-content-center">
                    <Col xs={2}>
                        <Button variant="dark" onClick={handlePrevRoom} className="arrow-button">
                            {"←"}
                        </Button>
                    </Col>

                    <Col xs={8}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={rooms[currentRoomIndex].id}
                                initial={{opacity: 0, x: 50}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -50}}
                                transition={{duration: 0.5}}
                                className="room-container"
                            >
                                {loading && <>
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                </>}

                                {!loading && <>
                                    <img
                                        src={rooms[currentRoomIndex].img}
                                        alt={rooms[currentRoomIndex].name}
                                        className="img-fluid"
                                        width={375}
                                    />
                                    <h3 className="mt-3">{rooms[currentRoomIndex].name}</h3>

                                    <p>
                                        {currentRoomTxt.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line}
                                                <br/>
                                            </span>
                                        ))}
                                    </p>
                                </>}

                                </motion.div>
                                    </AnimatePresence>
                                    </Col>

                                    <Col xs={2}>
                        <Button variant="dark" onClick={handleNextRoom} className="arrow-button">
                            {"→"}
                        </Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default App;
