import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import './style.css'

export default function RoundICard({ src, title, description }) {
    return (
        <Container className="text-center">
            <Row className="justify-content-center">
                <Col xl={6} xs={12} md={4}>
                    <div className='round-icard'>
                        <Image src={src} roundedCircle fluid className='round-image' />
                        <h4 className="mt-3">{title}</h4>
                        <h6>{description}</h6>
                    </div>

                </Col>
            </Row>
        </Container>
    );
}

