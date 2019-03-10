import React, { Component } from "react";
import { Form } from "semantic-ui-react";

type Props = {
  onSubmit?: (term?: string) => void
};

export default class MyInput extends Component<Props> {
  textInput: any;

  constructor() {
    super();
    this.state = {
      keyword: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit && this.state.keyword) {
      this.props.onSubmit(this.state.keyword);
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <Form.Input
            onChange={(e, { name, value }) => this.setState({ [name]: value })}
            action={{ color: "teal", icon: "search" }}
            placeholder="Search..."
            autoFocus={true}
            name="keyword"
            autoComplete="off"
          />
        </Form.Field>
      </Form>
    );
  }
}
