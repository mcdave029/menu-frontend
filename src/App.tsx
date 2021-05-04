import React, { Component } from "react";
import "./App.scss";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

class App extends Component {
  handleChange = (event: React.ChangeEvent<any>) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      console.log(event.target?.result);
    };
  }
  render() {
    return (
      <Container>
        <Form>
          <Form.Group>
            <Form.File id="exampleFormControlFile1" label="Select JSON File" onChange={this.handleChange} />
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default App;
