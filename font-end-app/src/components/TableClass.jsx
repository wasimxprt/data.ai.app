import React, { Component } from 'react'
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $, { error } from "jquery";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';

import Error from './Error';
import DatePickerComponent from './DatePickerComponent';

const apps = [
    {
        "id": "1",
        "ad_revenue": "100",
        "app": "WhatsApp",
        "country": "USA",
        "date": "2023-04-30T18:30:00.000Z",
        "impressions": "1000",
        "platform": "iOS"
    },
]


const TableClass = () => {

    const [hasError, setHasError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [data, setData] = React.useState(apps);



    React.useEffect(() => {

        const getData = async () => {
            const response = await fetch("/data");
            const body = await response.json();
            setData(body.data)
        };

        getData().catch((err) => {
            setHasError(true);
            setErrorMessage(err.message)
        });

    }, []);



    React.useEffect(() => {
        if (!$.fn.DataTable.isDataTable("#table")) {
            $(document).ready(function () {
                setTimeout(function () {
                    $("#table").DataTable({
                        pagingType: "full_numbers",
                        pageLength: 10,
                        retrieve: true,
                        processing: true,
                        dom: "Bfrtip",
                        select: {
                            style: "single",
                        },
                        buttons: [

                            {
                                extend: "copy",
                                className: "btn btn-primary",
                            },
                            {
                                extend: "csv",
                                className: "btn btn-primary",
                            },
                            {
                                extend: "print",
                                customize: function (win) {
                                    $(win.document.body).css("font-size", "10pt");
                                    $(win.document.body)
                                        .find("table")
                                        .addClass("compact")
                                        .css("font-size", "inherit");
                                },
                                className: "btn btn-primary",
                            },
                        ],
                        fnRowCallback: function (
                            nRow,
                            aData,
                            iDisplayIndex,
                            iDisplayIndexFull
                        ) {
                            var index = iDisplayIndexFull + 1;
                            $("td:first", nRow).html(index);
                            return nRow;
                        },
                        lengthMenu: [
                            [10, 20, 30, 50, -1],
                            [10, 20, 30, 50, "All"],
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                render: function (data, type, row, meta) {
                                    return type === "export" ? meta.row + 1 : data;
                                },
                            },
                        ],
                    });
                }, 500);


            });



        }
    }, [])

    const showTable = () => {
        try {
            return data.map((item, index) => {
                return (
                    <tr key={index}>
                        <td className="text-xs font-weight-bold">{item.id}</td>
                        <td className="text-xs font-weight-bold">{item.app}</td>
                        <td className="text-xs font-weight-bold">{item.platform}</td>
                        <td className="text-xs font-weight-bold">{item.country}</td>
                        <td className="text-xs font-weight-bold">{item.ad_revenue}</td>
                        <td className="text-xs font-weight-bold">{item.date?.substring(0, 10)}</td>
                        <td className="text-xs font-weight-bold">{item.impressions}</td>
                    </tr>
                );
            });
        } catch (e) {
            setHasError(true);
            setErrorMessage(e.message);
        }
    };

    const rangeHandler = (e) => {

        $.fn.DataTable.ext.search.push(
            function (settings, data, dataIndex) {
                var min = $("#min").val();
                var max = $("#max").val();
                var date = new Date(data[5]);
                if (
                    (min === null && max === null) ||
                    (min === null && date <= max) ||
                    (min <= date && max === null) ||
                    (min <= date && date <= max)
                ) {
                    return true;
                }

                return false;
            }
        );

        var table = $('#table').DataTable();
        table.draw();
    }

    const changeHandler = (id) => {

        var table = $('#table').DataTable();
        var column = table.column(id);
        column.visible(!column.visible());
    }

    return (
        <>
            {hasError ? <Error errorMessage={errorMessage} /> :
                <Container>
                    <Row style={{ marginTop: "40px" }}>
                        <Col><h2>GSR Engineer : Tech Front-End Exercise</h2></Col>
                    </Row>
                    <Row style={{ marginTop: "40px" }}>
                        <Col>
                            <Form.Group controlId="min">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="date" name="min" placeholder="End" onChange={rangeHandler} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="max">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control type="date" name="max" placeholder="End" onChange={rangeHandler} />
                            </Form.Group></Col>
                        <Col>

                        </Col>
                    </Row>
                    <Row style={{ marginTop: "40px" }}>
                        <Col>
                            <div className="form-check">
                                <input className="form-check-input" defaultChecked type="checkbox" value="0" id="id-col" onChange={() => changeHandler(0)} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    ID
                                </label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" defaultChecked value="1" id="app-col" onChange={() => changeHandler(1)} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    App
                                </label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" defaultChecked value="2" id="app-col" onChange={() => changeHandler(2)} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Platform
                                </label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" defaultChecked value="3" id="app-col" onChange={() => changeHandler(3)} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Country
                                </label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" defaultChecked value="4" id="app-col" onChange={() => changeHandler(4)} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Revenue
                                </label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" defaultChecked value="6" id="app-col" onChange={() => changeHandler(6)} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Impressions
                                </label>
                            </div>
                        </Col>
                        <Col> </Col>
                        <Col> </Col>
                        <Col> </Col>

                    </Row>
                    <Row style={{ marginTop: "40px" }}>
                        <Col>
                            <div className="table-responsive p-0 pb-2">
                                <table id="table" className="table align-items-center justify-content-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">ID</th>
                                            <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">App</th>
                                            <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Platform</th>
                                            <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Country</th>
                                            <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Revenue</th>
                                            <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Date</th>
                                            <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Impressions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {showTable()}
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            }

        </>

    )

}

export default TableClass
