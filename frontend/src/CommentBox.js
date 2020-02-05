import _ from "lodash"
import React, { Component } from "react"
import { Button, Image, List, Transition } from "semantic-ui-react"
import avatar from "./media/user.svg"

const comments = [
  "Alfonso",
  "Pleisolder",
  "Carlos",
  "Girardi",
  "Boccaccio",
  "Belen",
  "Diletta"
] // qui fetchi i commenti

//  direi che i commenti possono essere oggetti tipo così:
//  commento: { autore:"autore", contenuto:"contenuto"}
//  e le location possono essere così:
//  location: { spot:latlng, arrayCommenti:commento[] }

export default class Comments extends Component {
  state = { items: comments.slice(0, 3) } //selezioni i primi 3 commenti

  handleAdd = () =>
    this.setState(prevState => ({
      items: comments.slice(0, prevState.items.length + 1)
    }))

  handleRemove = () =>
    this.setState(prevState => ({ items: prevState.items.slice(0, -1) }))

  render() {
    const { items } = this.state

    return (
      <div>
        <Button.Group>
          <Button
            disabled={items.length === 0}
            icon="minus"
            onClick={this.handleRemove}
          />
          <Button
            disabled={items.length === comments.length}
            icon="plus"
            onClick={this.handleAdd}
          />
        </Button.Group>

        <Transition.Group
          as={List}
          duration={200}
          divided
          size="huge"
          verticalAlign="middle"
        >
          {items.map(item => (
            <List.Item key={item}>
              <Image avatar src={avatar} />
              <List.Content header={_.startCase(item)} content="el topo que gira" />
            </List.Item>
          ))}
        </Transition.Group>
      </div>
    )
  }
}
