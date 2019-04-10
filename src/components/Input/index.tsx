import React, { Component, SyntheticEvent, FormEvent, RefObject } from "react";
import "./Input.scss";

type Props = {
  onChange?: (event: SyntheticEvent<HTMLInputElement>) => void;
  onSubmit?: (term: string) => void;
  isLoading: boolean;
  formRef: RefObject<HTMLFormElement>;
  term: string;
  onTermChange: (event: SyntheticEvent<HTMLInputElement>) => void;
};

export default class extends Component<Props> {
  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { term } = this.props;
    if (term !== "" && this.props.onSubmit) {
      this.props.onSubmit(term);
    }
  };

  render() {
    const iconClass = !this.props.isLoading
      ? "fa-search"
      : "fa-spinner spinning";
    return (
      <form
        className="Input-form"
        onSubmit={this.onSubmit}
        ref={this.props.formRef}
      >
        <input
          className="Input"
          value={this.props.term}
          onChange={this.props.onTermChange}
        />
        <button className="submit-button" type="submit">
          <i className={"fas fa-lg " + iconClass} />
        </button>
      </form>
    );
  }
}
