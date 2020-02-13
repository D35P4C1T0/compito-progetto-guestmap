import React, { Component } from 'react'
import ZMap from './ZMap'
import CommentBox from './CommentBox'
import DummyComments from './DummyComments'
import Input from './SemanticInput'

import {
  Button,
  Header,
  Icon,
  Image,
  Label,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react'

export class CustomSidebar extends Component {
  state = { visible: false }

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state

    return (
      <div>
        {/* <Button.Group>
            <Button disabled={visible} onClick={this.handleShowClick}>
              Show sidebars
            </Button>
            <Button disabled={!visible} onClick={this.handleHideClick}>
              Hide sidebars
            </Button>
          </Button.Group> */}

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='slide out'
            direction='right'
            icon='labeled'
            // inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='wide'
          >
            <Menu.Item>
              <Input />
            </Menu.Item>

            <Menu.Item>
              <div>
                <Label>
                  <span>📍</span> Luogo Scelto
                  {/* 📍 Luogo Scelto */}
                  <Label.Detail>Paese</Label.Detail>
                </Label>
              </div>
            </Menu.Item>

            <Menu.Item>
              <DummyComments />
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher onClick={this.handleShowClick}>
            <ZMap />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
