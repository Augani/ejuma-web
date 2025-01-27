import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import UserPanel from './UserPanel'
import Pages from './Pages'

export class SidePanel extends Component {
  render() {

    const { currentUser} = this.props;
    return (
      <Menu size="large"
      inverted
      vertical
      style={{background: '#4c3c4c', fontSize: '1.2rem'}}
      fixed="left">
        <UserPanel />
        <Pages />
      </Menu>
    )
  }
}

export default SidePanel
