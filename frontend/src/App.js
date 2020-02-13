// import ZMap from './ZMap'
// import CommentBox from './CommentBox'
// import DummyComments from './DummyComments'
// import Input from './SemanticInput'

import React, { Component } from 'react'
import { CustomSidebar } from './Sidebar'
import 'semantic-ui-less/semantic.less'
import { StoreProvider, createStore, action } from 'easy-peasy'
import './App.css'

// import Button from '@bit/semantic-org.semantic-ui-react.button'
// import Header from '@bit/semantic-org.semantic-ui-react.header'
// import Icon from '@bit/semantic-org.semantic-ui-react.icon'
// import Image from '@bit/semantic-org.semantic-ui-react.image'
// import Menu from '@bit/semantic-org.semantic-ui-react.menu'
// import Segment from '@bit/semantic-org.semantic-ui-react.segment'
// import Sidebar from '@bit/semantic-org.semantic-ui-react.sidebar'

const style = (
  <link
    rel='stylesheet'
    href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'
  />
)

const store = createStore({
  todos: {
    items: ['Create store', 'Wrap application', 'Use store'],
    add: action((state, payload) => {
      state.items.push(payload)
    })
  }
})

export default () => (
  <StoreProvider store={store}>
    {style}
    <CustomSidebar />
  </StoreProvider>
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
