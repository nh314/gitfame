import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "..";

it("renders without crashing", () => {
  render(<Input isLoading={false} term="" onTermChange={() => {}} formRef={React.createRef<HTMLFormElement>()} />);
});

it("show term value correctly", () => {
  render(<Input isLoading={false} term="bar" onTermChange={() => {}} formRef={React.createRef<HTMLFormElement>()} />);
  expect(screen.getByRole("textbox")).toHaveValue("bar");
});

it("onTermChange handler work correctly", () => {
  let c = "bar";
  const extraCallback = (e: any) => {
    c += " " + e.target.value;
  };
  
  render(<Input onTermChange={extraCallback} isLoading={false} term="bar" formRef={React.createRef<HTMLFormElement>()} />);
  
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "foo" } });
  
  expect(c).toEqual("bar foo");
});

it("shows icon correctly", () => {
  const { rerender, container } = render(<Input isLoading={false} term="" onTermChange={() => {}} formRef={React.createRef<HTMLFormElement>()} />);
  
  expect(container.querySelector("span.material-symbols-outlined")?.textContent).toEqual("search");
  
  rerender(<Input isLoading={true} term="" onTermChange={() => {}} formRef={React.createRef<HTMLFormElement>()} />);
  
  expect(container.querySelector("span.material-symbols-outlined")?.textContent).toEqual("progress_activity");
});
