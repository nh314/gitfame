// @flow
import React, { Component } from "react";
import { List, Image, Icon, Button, Table } from "semantic-ui-react";
import { toast } from "react-toastify";

import styles from "./style.js";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  repo: Object,
  onClick?: () => Promise<String>,
  removeItem?: Function
};

const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};
export class GitRepoListItem extends Component<Props> {
  onClick = () => {
    if (this.props.onClick) {
      this.props
        .onClick()
        .then(
          value => toast.success(value, toastConfig),
          err => toast.warn(err, toastConfig)
        );
    }
  };

  render() {
    return (
      <List.Item>
        <Image
          avatar
          src={this.props.repo.owner.avatar_url}
          onClick={() => {
            window.open(this.props.repo.owner.html_url, "_blank");
          }}
          className="no-trigger-main-event"
        />
        <List.Content onClick={this.onClick}>
          <List.Header>{this.props.repo.full_name}</List.Header>
          <List.Description>
            <div style={styles.gitStats}>
              <Icon name="star" />
              {new Intl.NumberFormat().format(this.props.repo.stargazers_count)}
            </div>
            <div style={styles.gitStats}>
              <Icon name="fork" />
              {this.props.repo.forks_count}
            </div>
          </List.Description>
        </List.Content>
        <List.Content floated="right">
          <Button
            icon
            as="a"
            href={this.props.repo.html_url}
            target="_blank"
            title="Open repo in a new tab"
            className="no-trigger-main-event"
          >
            <Icon name="share square" />
          </Button>
        </List.Content>
      </List.Item>
    );
  }
}

export const GitRepoTableRow = (props: Props) => {
  return (
    <Table.Row>
      <Table.Cell>
        <a href={props.repo.html_url} target="_blank" rel="noopener noreferrer">
          {props.repo.full_name}
        </a>
      </Table.Cell>
      <Table.Cell>
        {new Intl.NumberFormat().format(props.repo.stargazers_count)}
      </Table.Cell>
      <Table.Cell>
        {new Intl.NumberFormat().format(props.repo.forks_count)}
      </Table.Cell>
      <Table.Cell>
        <Button onClick={props.removeItem}>Remove</Button>
      </Table.Cell>
    </Table.Row>
  );
};
