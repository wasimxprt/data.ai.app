import React from 'react'
import { Form } from 'react-bootstrap';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

const DatePickerComponent = ({label}) => {
    return (
        <Form.Group controlId="dob">
            <Form.Label>{label}</Form.Label>
            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
        </Form.Group>
    )
}

export default DatePickerComponent
