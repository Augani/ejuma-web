import React, { Component } from 'react'
import {Menu, Icon, Modal, Form, Button, Input, Label,  Checkbox} from 'semantic-ui-react'


export class Pages extends Component {
    state={
        jobs: [],
        modal: false,
        jobTitle: '',
        jobDescription: '',
        jobBudget: 0,
        jobUrgency: 0,
        jobTerms: false
    }

    handleChange = event =>{
        this.setState({[event.target.name]: event.target.value})
    }
    openModal = ()=>this.setState({modal: true})
    closeModal = ()=>this.setState({modal: false})
  render() {
      const { jobs, modal, jobBudget, jobUrgency } = this.state;
    return (
        <React.Fragment>
    <Menu.Menu style={{paddingBottom: '2em',}}>
    <Menu.Item>
        <span>
            <Icon name="exchange"  /> Post a job
        </span>{" "}
        ({jobs.length}) <Icon name="add" onClick={this.openModal}/>
       
    </Menu.Item>

    </Menu.Menu>

    <Modal basic open={modal} onClose={this.closeModal}>
    <Modal.Header>Post a job</Modal.Header>
    <Modal.Content>
        <Form>
            <Form.Field>
                <Input
                fluid
                label="Job title"
                name="jobTitle"
                onChange={this.handleChange} />
            </Form.Field>

             <Form.Field>
                <Form.TextArea
                fluid
                label="Job Description"
                name="jobDescription"
                placeholder="Briefly describe your job"
                onChange={this.handleChange} />
            </Form.Field>

             <Form.Field>
                <Input
                labelPosition="right"
                
                
               ><Label>Job Budget ₵</Label>
               <Input name="jobBudget" onChange={this.handleChange}  min={0} max={10000} type="range" placeholder="Amount" />
               <Label>{jobBudget}</Label>
               </Input>
            </Form.Field>
            <Form.Field>
                <Input
                labelPosition="right"
                
                
               ><Label>Job urgency</Label>
               <Input name="jobUrgency" onChange={this.handleChange}  min={0} max={5} type="range" placeholder="Urgency" />
               <Label>{jobUrgency}</Label>
               </Input>
               <span>1 is Not urgent</span>
               <span>5 is Very urgent</span>
            </Form.Field>
            <Form.Field>
                <Input
                fluid
                type="file"
                label="Upload photos of job, if available"
                name="jobMedia"
                onChange={this.handleChange} />
            </Form.Field>
        </Form>

    </Modal.Content>
    <Modal.Actions>
    <Form.Field>
      <Checkbox name="jobTerms" label='I agree to the Terms and Conditions' onChange={this.handleChange} inverted style={{paddingBottom: 10,color: '#fff'}} />
    </Form.Field>
        <Button color="green" inverted>
        <Icon name="checkmark" /> Post
        </Button>
        <Button color="red" inverted onClick={this.closeModal}>
        <Icon name="remove" /> Cancel
        </Button>
    </Modal.Actions>

    </Modal>
    </React.Fragment>
    );
  }
}

export default Pages
