import React, { Component } from "react";
import "./App.scss";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

interface Props {}

interface State {
  loading: boolean;
  alertMsg: string;
  hasError: boolean;
  result: number[];
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      alertMsg: "",
      hasError: false,
      result: [],
    };
  }
  handleChange = (event: React.ChangeEvent<any>) => {
    const jsonFile = event.target.files[0];
    if (jsonFile.type !== "application/json") {
      this.setState({
        alertMsg: "Invalid file type! Must be JSON file.",
        hasError: true,
        result: [],
      });
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      console.log(event.target?.result);
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
        params: { menus: event.target?.result },
      };
      this.setState({
        alertMsg: "",
        hasError: false,
        result: [],
        loading: true,
      });
      axios
        .get("http://127.0.0.1:3000/api/v1/menus/calculate_ids", options)
        .then((response) => {
          this.setState({
            alertMsg: response.data.message,
            hasError: false,
            result: response.data.result,
            loading: false,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            alertMsg: "An error occurred, please try again later.",
            hasError: true,
            result: [],
            loading: false,
          });
        });
    };
  };
  render() {
    return (
      <Container className="mt-5 mb-5">
        {this.state.alertMsg.length > 0 ? (
          <Alert variant={this.state.hasError ? "danger" : "success"}>
            {this.state.alertMsg}
          </Alert>
        ) : null}
        <Form>
          <Form.Group>
            <Form.File
              id="exampleFormControlFile1"
              label="Select JSON File"
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
        <h4>Output:</h4>
        {this.state.loading ? (
          <p>
            <Spinner animation="border" />
          </p>
        ) : (
          <p>
            {this.state.result.length > 0
              ? this.state.result.join(", ")
              : "No calculations yet."}
          </p>
        )}
      </Container>
    );
  }
}

export default App;
