import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import './PostJob.css';

import ColorPanel from '../ColorPanel/ColorPanel';
import SidePanel from '../SidePanel/SidePanel';
import Messages from '../Messages/Messages';
import MetaPanel from '../MetaPanel/MetaPanel';
const PostJob = () => (
<Grid columns="equal" className="PostJob" style={{background: '#eee'}}>
  <ColorPanel />
  <SidePanel />
  <Grid.Column style={{marginLeft: 320,}}>
  <Messages />
  </Grid.Column>
  <Grid.Column width={4}>
  <MetaPanel />

  </Grid.Column>
</Grid>
)

export default PostJob;
