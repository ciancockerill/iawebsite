import React, { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import talkingGif from './assets/talking.gif'
import bicycleGif from './assets/bikeconveyer.gif'
import customerGif from './assets/customerrelation.gif'

const rooms = [
    { id: 1, name: 'Room 1', text: 'Welcome to Room 1', img: talkingGif },
    { id: 2, name: 'Room 2', text: 'This is Room 2', img: bicycleGif },
    { id: 3, name: 'Room 3', text: 'You are now in Room 3', img: customerGif },
];

const App: React.FC = () => {
    const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
    const totalRooms = rooms.length;

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
            <h1 className="mb-4">Innovation Academy | VR Reflection</h1>

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
                                <img
                                    src={rooms[currentRoomIndex].img}
                                    alt={rooms[currentRoomIndex].name}
                                    className="img-fluid"
                                    width={375}
                                />
                                <h3 className="mt-3">{rooms[currentRoomIndex].name}</h3>
                                <p>{rooms[currentRoomIndex].text}</p>
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
