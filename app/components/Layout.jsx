import React from 'react'
import ReactDOM from 'react-dom'
import FileInput from 'react-file-input'
import Papa from 'papaparse'
import { LineChart } from 'react-d3'
import { Col, Row, Input, Button } from 'react-bootstrap'

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: "",
      line: [
      {
        name: 'line',
        values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
        strokeWidth: 3,
        strokeDashArray: '5,5'
      }
      ]
    }
  }

  handleChange(event) {
    this.parseCsv(event.target.files[0]);
  }

  parseCsv(file) {
    var passed_this = this;

    Papa.parse(file, {
      complete(results) {
        var tmp = [
        {
          name: 'line 2',
          values: [],
          strokeWidth: 3,
          strokeDashArray: '5,5'
        }
        ];
        for (var i = 1; i < results.data.length; i++) {
          var point = results.data[i];
          console.log(point[0] + ";" + point[1]);
          tmp[0].values.push({ x: i, y: point[1] });
        }
        passed_this.setState({ filename: file.name, line: tmp });
      }
    })
  }

  render() {
    return (
      <div>
        <Header/>
        <Body/>
        <Row className='flex-container'>
        <Col md={6}>
        <form className='col-xs-offset-3 col-xs-6'>
        <legend>
        Upload a File:
        </legend>
        <div className='form-group'>
        <FileInput
        name='myCsv'
        accept='.csv'
        placeholder={this.state.filename}
        className='inputClass'
        onChange={this.handleChange.bind(this)}>
        </FileInput>
        </div>
        </form>
        </Col>
        <Col md={6} className='align-item'>
        <LineChart
        legend={true}
        data={this.state.line}
        height={500}
        viewBoxObject={{x: 0, y: 0, width: 500, height: 500}}
        yAxisLabel='Roll (degrees)'
        xAxisLabel='Time (ns)'
        domain={{x: [0, 1000], y: [-180, 180]}}
        gridHorizontal={true} />
        </Col>
        </Row>
      </div>
      )
  }
}
