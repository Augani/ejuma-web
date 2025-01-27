import React, { Component } from 'react'
import {Grid, Header, Icon, Dropdown, Image} from 'semantic-ui-react'
import firebase from '../../firebase'
import { connect } from 'react-redux'
export class UserPanel extends Component {

    state = {
        user: this.props.currentUser
    }

  

    dropdownOptions = ()=>[
        {
            key: "user",
            text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: "avatar",
            text: <span onClick={this.handleSignOut}>Change Profile Photo</span>
        },
        {
            key: "signout",
            text: <span onClick={this.handleSignOut}>Sing Out</span>
        }
    ];

    dropdownOptionsJobs = ()=>[
        {
            key: "post",
            text: <span onClick={this.handleSignOut}>Post a job</span>,
        },
        {
            key: "view",
            text: <span onClick={this.handleSignOut}>View posted jobs</span>
        }
    ];

    dropdownOptionsMes = ()=>[
        {
            key: "sendmessage",
            text: <span onClick={this.handleSignOut}>Send new message</span>,
        },
        {
            key: "viewmessages",
            text: <span onClick={this.handleSignOut}>View messages</span>
        }
    ];

    dropdownOptionsEar = ()=>[
        {
            key: "viewearnings",
            text: <span onClick={this.handleSignOut}>View earnings</span>,
        },
        {
            key: "withdraw",
            text: <span onClick={this.handleSignOut}>Withdraw</span>
        }
    ];


    handleSignOut = ()=>{
        firebase.auth().signOut().then(()=>{
            console.log('signed Out')
        })
    }
  render() {

    const { user} = this.state;

    return (
      <Grid style={{background: '#4c3c4c'}}>
        <Grid.Column>
            <Grid.Row style={{padding: '1.2em', margin: 0}}>
            
            <Header inverted floated="left" as="h2">
            <Icon name="code" />
                <Header.Content>Ejuma</Header.Content>
            </Header>
            </Grid.Row>
            <Header style={{padding: '0.25em'}} as="h4" inverted>
                <Dropdown trigger={
                    <span>
                        <Image src={user.photoURL} spaced="right" avatar />
                    {user.displayName}
                    </span>
                } options={this.dropdownOptions()} />
            </Header>
            
        </Grid.Column>
      </Grid>
    )
  }
}
const mapStateToProps = state =>({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(UserPanel);
