# AGENTS.md - GitFame Development Guide

## Project Overview

GitFame is a React + TypeScript web application that compares GitHub repositories. It uses:
- Create React App 5.0.1 with TypeScript
- Redux for state management
- Enzyme for testing
- SCSS for styling

---

## Build / Lint / Test Commands

### Development
```bash
yarn start        # Start development server (http://localhost:3000)
```

### Building
```bash
yarn build        # Production build to /build folder
```

### Testing
```bash
yarn test                           # Run all tests once
yarn test --watchAll                # Run tests in watch mode
yarn test --watchAll=false          # Run all tests once (CI mode)
yarn test --testPathPattern=Input   # Run tests matching pattern
yarn test --testPathPattern=Input.test.tsx  # Run single test file
yarn test --testNamePattern="shows icon"    # Run single test by name
```

### CI/CD
The project uses Travis CI (`.travis.yml`):
1. Runs `yarn test` with `CI=true` (watchAll=false by default)
2. Runs `yarn build` on every push
3. Auto-deploys to GitHub Pages from `develop` branch

---

## Code Style Guidelines

### TypeScript

**Strict Mode**: The project uses `"strict": true` in `tsconfig.json`.

**Type Annotations**:
- Always annotate component state and props
- Use interface for object shapes, type for unions/primitives
- Use `type Props = { ... }` and `type States = { ... }` for React components

**Import patterns**:
```typescript
// React core - default import
import React, { Component, SyntheticEvent } from "react";

// Third-party libraries - named imports
import { configure } from "enzyme";
import { createStore } from "redux";

// Local components - default import
import Logo from "./components/Logo";

// Types/interfaces - named import
import { GitRepo } from "./components/GitRepo/Repo";

// Styles - side-effect import
import "./App.scss";
import "normalize.css";
```

### React Components

**Class Components**: The project uses class-based React components (not hooks).

```typescript
// Component file structure
type Props = {
  prop1: string;
  prop2?: number;
};

type States = {
  value: string;
};

export default class ComponentName extends Component<Props, States> {
  state: States = {
    value: ""
  };

  static defaultProps = {
    prop2: 0
  };

  componentDidMount = () => {
    // lifecycle methods as arrow functions
  };

  render() {
    return <div>{this.props.prop1}</div>;
  }
}
```

**Functional Components** (for simple presentational components):
```typescript
type Props = {
  onClick: () => void;
};

export default function ComponentName(props: Props) {
  return <button onClick={props.onClick}>Click</button>;
}
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `SearchResultList` |
| Types/Interfaces | PascalCase | `GitRepo`, `InputState` |
| Variables/Functions | camelCase | `searchTerm`, `onRepoClick` |
| Constants | camelCase or SCREAMING_SNAKE | `MAX_RESULT`, `apiURL` |
| Files | PascalCase (components) or kebab-case | `Repo.tsx`, `compare-list.tsx` |
| CSS Classes | kebab-case | `.compare-list`, `.repo-name` |
| Action Types | SCREAMING_SNAKE | `SET_TERM`, `SET_LOADING` |

### Error Handling

**Async/Await**: Use try-catch for async operations.

```typescript
async function fetchData() {
  try {
    const result = await someAsyncOperation();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

**Custom Error Classes**: Extend Error for domain-specific errors.

```typescript
interface IResponseError {
  httpStatus: number;
  message: string;
}

export class ResponseError extends Error implements IResponseError {
  httpStatus: number;
  constructor(message: string, httpStatus: number) {
    super(message);
    this.httpStatus = httpStatus;
  }
}
```

### Redux Patterns

**Types file** (`types.ts`):
```typescript
// State shape
export type InputState = {
  term: string;
  isLoading: boolean;
};

// Action type constants
export const SET_TERM = "SET_TERM";
export const SET_LOADING = "SET_LOADING";

// Union type for actions
type SetTermAction = {
  type: typeof SET_TERM;
  payload: string;
};

export type InputActionTypes = SetTermAction | SetLoadingAction;
```

**Actions file** (`actions.ts`):
```typescript
export function setTerm(term: string): InputActionTypes {
  return {
    type: SET_TERM,
    payload: term
  };
}
```

**Reducers file** (`reducers.ts`):
```typescript
export function inputReducer(
  state = initialState,
  action: InputActionTypes
): InputState {
  switch (action.type) {
    case SET_TERM:
      return { ...state, term: action.payload };
    default:
      return state;
  }
}
```

### SCSS / Styling

- Use SCSS files co-located with components (e.g., `Repo.tsx` + `Repo.scss`)
- Follow BEM-lite naming: `.componentName`, `.componentName-child`, `.componentName--modifier`
- Nest media queries inside selectors for responsive design

```scss
.component {
  display: flex;

  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
}
```

### Testing with Enzyme

**Setup** (`setupTests.ts`):
```typescript
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
```

**Test file location**: `ComponentName/__tests__/ComponentName.test.tsx`

**Test patterns**:
```typescript
import { shallow } from "enzyme";

it("shows icon correctly", () => {
  let wrapper = shallow(<Input isLoading={false} />);
  expect(wrapper.find("i.fas").hasClass("fa-search")).toEqual(true);
});
```

---

## Project Structure

```
src/
├── App.tsx              # Main application component
├── App.scss             # Main styles
├── App.test.tsx         # Main tests
├── index.tsx            # Entry point
├── index.css           # Global styles
├── setupTests.ts       # Enzyme configuration
├── components/         # React components
│   ├── GitRepo/
│   │   ├── Repo.tsx
│   │   ├── SearchResultList.tsx
│   │   ├── CompareList.tsx
│   │   ├── CompareListFilter.tsx
│   │   └── Repo.scss
│   ├── Input/
│   │   ├── index.tsx
│   │   ├── Input.scss
│   │   └── __tests__/Input.test.tsx
│   └── Logo/
├── services/           # API and external services
│   └── github.ts       # GitHub API integration
├── store/              # Redux store
│   ├── index.ts        # Store configuration
│   └── Input/          # Input feature slice
│       ├── actions.ts
│       ├── reducers.ts
│       └── types.ts
└── types/              # Shared type definitions
```

---

## Common Patterns

**Event Handlers**:
```typescript
// Synthetic events for DOM elements
onClick = (e: SyntheticEvent<HTMLDivElement>) => {
  this.props.onClick && this.props.onClick(e);
};

// Form events
onSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

// Input change handlers
onChange = (e: SyntheticEvent<HTMLInputElement>) => {
  this.setState({ term: e.currentTarget.value });
};
```

**Conditional Rendering**:
```typescript
// Use && for optional content
{this.props.errorMessage && <p>{this.props.errorMessage}</p>}

// Use ternary for mutually exclusive content
{isLoading ? <Spinner /> : <Content />}
```

**List Rendering**:
```typescript
// Always use key prop with unique identifier
{repos.map((repo: GitRepo) => (
  <Repo key={repo.id} repo={repo} />
))}
```
