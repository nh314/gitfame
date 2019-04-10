import React, { SyntheticEvent } from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Input from "..";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Input isLoading={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("show state value correcly", () => {
  const wrapper = shallow(<Input isLoading={false} />);
  expect(wrapper.find("input").props().value).toEqual("");
  wrapper.setState({ value: "bar" });
  expect(wrapper.find("input").props().value).toEqual("bar");
});

it("onChange handler work correctly", () => {
  let c = "bar";
  const extraCallback = (e: SyntheticEvent<HTMLInputElement>) => {
    c += " " + e.currentTarget.value;
  };
  const wrapper = shallow(<Input onChange={extraCallback} isLoading={false} />);
  const text = "foo";
  wrapper.setState({ newValue: "bar" });
  wrapper.find("input").simulate("change", { currentTarget: { value: text } });
  expect(wrapper.state("value")).toEqual(text);
  expect(wrapper.find("input").props().value).toEqual(text);
  expect(c).toEqual("bar foo");
});

it("shows icon correctly", () => {
  let wrapper = shallow(<Input isLoading={false} />);
  expect(wrapper.find("i.fas").hasClass("fa-search")).toEqual(true);
  expect(wrapper.find("i.fas").hasClass("fa-spinner")).toEqual(false);
  wrapper.setProps({ isLoading: true });
  expect(wrapper.find("i.fas").hasClass("fa-search")).toEqual(false);
  expect(wrapper.find("i.fas").hasClass("fa-spinner")).toEqual(true);
});
