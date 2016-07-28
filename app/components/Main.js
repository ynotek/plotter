var React = require('react')
var ReactDOM = require('react-dom')
var FileInput = require('react-file-input')
var Papa = require('papaparse')
var rd3 = require('react-d3')
// var Col = require('react-bootstrap').Col
// var Row = require('react-bootstrap').Row
import { Col, Row, Input } from 'react-bootstrap'
var LineChart = rd3.LineChart

var Main = React.createClass({
  getInitialState: function () {
    return {
      line: [
        {
          name: 'line',
          values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
          strokeWidth: 3,
          strokeDashArray: '5,5'
        }
      ]
    }
  },

  handleChange: function (event) {
    this.parseCsv(event.target.files[0])
  },

  parseCsv: function (file) {
    var passed_this = this

    Papa.parse(file, {
      complete(results) {
        var tmp = [
          {
            name: 'line 2',
            values: [],
            strokeWidth: 3,
            strokeDashArray: '5,5'
          }
        ]
        for (var i = 1; i < results.data.length; i++) {
          var point = results.data[i];
          console.log(point[0] + ";" + point[1]);
          tmp[0].values.push({ x: i, y: point[1] });
        }
        passed_this.setState({ line: tmp })
      }
    })
  },

  render: function () {
    return (
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
              placeholder='Sensors file'
              className='inputClass'
              onChange={this.handleChange} />
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
    )
  }
})

ReactDOM.render(<Main />, document.getElementById('app'))
