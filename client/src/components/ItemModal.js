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
    Input
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addItem } from '../actions/itemActions'

class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
        category: '',
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newItem = {
            name: this.state.name,
            category: this.state.category
        }

        // Add item via addItem action
        this.props.addItem(newItem);

        // Close modal
        this.toggle();
    }

    render () {
        return (
            <div>
                { this.props.isAuthenticated ? 
                    <Button
                        color="primary"
                        style={{marginBottom: '2rem'}}
                        onClick={this.toggle}
                    >+ New Item</Button>
                : 
                <div className="alert alert-info text-center">Please login to manage items</div>
                }
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <Form onSubmit={this.onSubmit}>
                        <ModalHeader toggle={this.toggle}>
                            Add To Shopping List
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="item">Item Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add Item Name"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="selectCategory">Select Category</Label>
                                <Input type="select" name="category" id="selectCategory" onChange={this.onChange}>
                                    <option value="Fruits">Fruits</option>
                                    <option value="Foods">Foods</option>
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Beverages">Beverages</option>
                                </Input>
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
                            >Add Item</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(ItemModal);
