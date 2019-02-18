import React, { Component } from 'react'
import { Grid, Form, Segment, Header, Message, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import md5 from 'md5'

export class Register extends Component {

    state = {
        username: '',
        email: '',
        number: '',
        skill: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false,
        usersRef: firebase.database().ref('users')
    }

    handleChange= event =>{
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    displayErrors = errors => errors.map((error, i)=><p key={i}>{error.message}</p>)

    isFormValid = ()=>{
        let errors = [];
        let error;
        if(this.isFormEmpty(this.state)){
            error = {message: 'Fill in all fields'};
            this.setState({errors: errors.concat(error)})
            return false;

        }else if(!this.isPassValid(this.state)){
            error = {message: 'Password is invalid'};
            this.setState({errors: errors.concat(error)})
            return false;

        }else {
            return true;
        }
    }

    isPassValid = ({password, passwordConfirmation})=>{
        if(password.length < 6 || passwordConfirmation.length < 6){
            return false;
        }else if(password !== passwordConfirmation){
            return false;
        }else{
            return true;
        }
    }

    isFormEmpty = ({username, email, number, skill, password, passwordConfirmation})=>{
        return !username.length || !email.length || !number.length || !skill.length || !password.length || !passwordConfirmation.length

    }

    saveUser = createdUser =>{
         return this.state.usersRef.child(createdUser.user.uid).set({
            userName: this.state.username,
            userEmail: this.state.email,
            userJobs: 0,
            userMessages: 0,
            userId: createdUser.user.uid,
            userRating: 0.0,
            userProfilePhoto: createdUser.user.photoURL,
            userLocation: "",
            userSkill: this.state.skill,
            userNumber: this.state.number
         })
    }

    handleSubmit = event =>{
        event.preventDefault();
        if(this.isFormValid()){
            this.setState({errors: [], loading: true})
            
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(createdUser=>{
                createdUser.user.updateProfile({
                    displayName: this.state.username,
                    photoURL: `https://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
                    phoneNumber: this.state.number

                }).then(()=>{
                    this.saveUser(createdUser).then(()=>{
                        console.log('User saved');
                    })
                }).catch(err =>{
                    this.setState({errors: this.state.errors.concat(err), loading: false})
                })

            }).catch(err=>{
                console.log(err);
                this.setState({loading: false})

            })

        }
       
    }
  render() {
      const { username, email, number, skill, password, passwordConfirmation, errors, loading } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth: 450}} >
        <Header as="h1" Icon color="red" textAlign="center">
    <Icon name="puzzle piece" color="red" />
    Ejuma - Signup
        </Header>
        <Form onSubmit={this.handleSubmit} size="large">
        <Segment stacked>
        <Form.Input fluid name="username" icon="user" value={username} iconPosition="left" placeholder="Your name" onChange={this.handleChange} type="text" />
        <Form.Input fluid name="email" icon="mail" value={email} iconPosition="left" placeholder="Email Address" onChange={this.handleChange} type="email" />
        <Form.Input fluid name="number" icon="phone" value={number} iconPosition="left" placeholder="Phone number" onChange={this.handleChange} type="phone" />
        <Form.Input fluid name="skill" icon="briefcase" value={skill} iconPosition="left" placeholder="Skill" onChange={this.handleChange} type="text" />
        <Form.Input fluid name="password" icon="lock" value={password} iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" />
        <Form.Input fluid name="passwordConfirmation" value={passwordConfirmation} icon="lock" iconPosition="left" placeholder="Confirm password" onChange={this.handleChange} type="password" />

        <Button disabled={loading} className={loading? 'loading' : ''} size="large" fluid color="red">Register</Button>
            </Segment>

        </Form>
        {errors.length > 0 && (
            <Message error>
            <h3>Error</h3>
            {this.displayErrors(errors)}
            </Message>
        )}
        <Message>Already a user? <Link to="/login">Login</Link></Message>

        </Grid.Column>
      </Grid>
    )
  }
}

export default Register
