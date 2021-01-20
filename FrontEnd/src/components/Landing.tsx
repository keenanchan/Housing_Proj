import React from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Dropdown,
} from 'react-bootstrap';
import { landingIcons } from '../assets/icons/all';
export default function Landing() {
  return (
    <Container>
      <Row className="landing-title mb-4">
        Welcome to &nbsp; <b>Homehub 1.0 !</b>
      </Row>
      <Row className="mb-4">
        <Col>
          <Row className="justify-content-center mb-4">
            <landingIcons.one />
            <div className="landing-subtitle">
              <b>What</b> is HomeHub?
            </div>
          </Row>
          <Row className="justify-content-center mb-4">
            <div className="landing-text">
              Homehub connects students with their peers within UCSD, to create
              a <b>reliable housing network</b> for college students to{' '}
              <b>find great places to live.</b>
            </div>
          </Row>
          <Row className="justify-content-center">
            <landingIcons.housing />
          </Row>
        </Col>
        <Col>
          <Row className="justify-content-center mb-4">
            <landingIcons.two />
            <div className="landing-subtitle">
              <b>Why</b> use HomeHub?
            </div>
          </Row>
          <Row>
            <Col>
              <Row className="justify-content-center mb-2">
                <landingIcons.safe className="landing-small-img" />
              </Row>
              <Row className="landing-caption justify-content-center mb-2">Safe</Row>
              <div className="landing-text-small">
                Homehub <b>requires a “@ucsd. edu” email address</b> to create
                an account and interact with listings by other students.
              </div>
            </Col>
            <Col>
              <Row className="justify-content-center mb-2">
                <landingIcons.efficient className="landing-small-img" />
              </Row>
              <Row className="landing-caption justify-content-center mb-2">
                Efficient
              </Row>
              <div className="landing-text-small">
                Finding a home that fits your needs is easy through our{' '}
                <b>smart filter & match and search options.</b>
              </div>
            </Col>
            <Col>
              <Row className="justify-content-center mb-2">
                <landingIcons.connection className="landing-small-img" />
              </Row>
              <Row className="landing-caption justify-content-center mb-2">
                Connection
              </Row>
              <div className="landing-text-small">
                After signing up, users are grouped with{' '}
                <b>other students at UC San Diego.</b>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Button variant="secondary" href="https://forms.gle/jxmNTJE6L2dZBsug9">
          <div className="landing-button-inner">Sign up FOR FREE</div>
        </Button>
      </Row>
    </Container>
  );
}
