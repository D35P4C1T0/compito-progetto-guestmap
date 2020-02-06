import ZMap from './ZMap'
import CommentBox from './CommentBox'
import DummyComments from './DummyComments'
import Input from './SemanticInput'
import 'semantic-ui-less/semantic.less'
import './App.css'

import React, { Component } from 'react'
// import Button from '@bit/semantic-org.semantic-ui-react.button'
// import Header from '@bit/semantic-org.semantic-ui-react.header'
// import Icon from '@bit/semantic-org.semantic-ui-react.icon'
// import Image from '@bit/semantic-org.semantic-ui-react.image'
// import Menu from '@bit/semantic-org.semantic-ui-react.menu'
// import Segment from '@bit/semantic-org.semantic-ui-react.segment'
// import Sidebar from '@bit/semantic-org.semantic-ui-react.sidebar'

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

const style = (
  <link
    rel='stylesheet'
    href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'
  />
)

class CustomSidebar extends Component {
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
            <Menu.Item as='a'>
              <Input />
            </Menu.Item>

            <Menu.Item>
              <div>
                <Label as='a' color='white' image>
                  <span>📍</span> Luogo Scelto
                  {/* 📍 Luogo Scelto */}
                  <Label.Detail>Paese</Label.Detail>
                </Label>
              </div>
            </Menu.Item>

            <Menu.Item as='a'>
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

export default () => (
  <div>
    {style}
    <CustomSidebar />
  </div>
)

// function App() {
//   return (
//     <div>
//       <ZMap />
//       <Sidebar />
//     </div>
//   )
// }

// export default App
