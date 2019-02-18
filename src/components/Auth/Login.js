import React, { Component } from 'react'
import { Grid, Form, Segment, Header, Message, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import firebase from '../../firebase'

export class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: [],
        loading: false,
    }

    handleChange= event =>{
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    isFormValid = ({email, password})=> email && password;

    displayErrors = errors => errors.map((error, i)=><p key={i}>{error.message}</p>)

 

   
   

  

    handleSubmit = event =>{
        event.preventDefault();
        if(this.isFormValid(this.state)){
            this.setState({errors: [], loading: true});
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this. state.password)
            .then(signedInUser =>{
                console.log(signedInUser);

            }).catch(err =>{
                console.log(err);
                this.setState({
                    errors: this.state.errors.concat(err),
                    loading: false
                })
            })
            
        }
       
    }
  render() {
      const { email,password, errors, loading } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth: 450}} >
        <Header as="h1"  color="blue" textAlign="center">
    <Icon name="puzzle piece" color="red" />
    Ejuma - Login
        </Header>
        <Form onSubmit={this.handleSubmit} size="large">
        <Segment stacked>
        <Form.Input fluid name="email" icon="mail" value={email} iconPosition="left" placeholder="Email Address" onChange={this.handleChange} type="email" />
       
        <Form.Input fluid name="password" icon="lock" value={password} iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" />

        <Button disabled={loading} className={loading? 'loading' : ''} size="large" fluid color="blue">Login</Button>
            </Segment>

        </Form>
        {errors.length > 0 && (
            <Message error>
            <h3>Error</h3>
            {this.displayErrors(errors)}
            </Message>
        )}
        <Message>Don't have an account? <Link to="/signup">Register</Link></Message>

        </Grid.Column>
      </Grid>
    )
  }
}

export default Login
