import React, { SyntheticEvent } from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Input from "..";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Input isLoading={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("show term value correcly", () => {
  const wrapper = shallow(<Input isLoading={false} term="bar" />);
  expect(wrapper.find("input").props().value).toEqual("bar");
});

it("onTermChange handler work correctly", () => {
  let c = "bar";
  const extraCallback = (e: SyntheticEvent<HTMLInputElement>) => {
    c += " " + e.currentTarget.value;
  };
  const wrapper = shallow(
    <Input onTermChange={extraCallback} isLoading={false} term="bar" />
  );
  const text = "foo";
  wrapper.find("input").simulate("change", { currentTarget: { value: text } });
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
