import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class RegisterModal extends Component {
    state = {
        modal: false,
        f_name: '',
        l_name: '',
        username: '',
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props
        if(error != prevProps.error) {
            // Check for register error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg})
            } else {
                this.setState({ msg: null })
            }
        }
        
        // If authenticated, close modal
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors()
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        
        const { f_name, l_name, username, email, password } = this.state

        // Create user object
        const newUser = { f_name, l_name, username, email, password }
        
        // Attempt to register
        this.props.register(newUser)
    }

    render () {
        return (
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Register
                </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <Form onSubmit={this.onSubmit}>
                        <ModalHeader toggle={this.toggle}>
                            Register
                        </ModalHeader>
                        <ModalBody>
                            { this.state.msg ? (
                                <Alert color='danger'>{this.state.msg}</Alert>
                            ) : null }
                            <FormGroup>
                                <Label for="item">First Name</Label>
                                <Input
                                    type="text"
                                    name="f_name"
                                    id="f_name"
                                    placeholder="First Name here"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="item">Last Name</Label>
                                <Input
                                    type="text"
                                    name="l_name"
                                    id="l_name"
                                    placeholder="Last Name here"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="item">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Username here"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="item">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email address here"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="item">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password here"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter className="text-right">
                            <Button
                                outline
                                type="submit"
                                color="danger"
                                style={{marginRight: '2rem', marginBottom: '2rem'}}
                            >Cancel</Button>
                            <Button
                                outline
                                color="success"
                                style={{marginBottom: '2rem'}}
                            >Register</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
