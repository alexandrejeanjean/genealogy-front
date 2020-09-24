import React, { PureComponent } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

type Props = {
  handleSubmit: Function
  errorMsg: string
  show: boolean
  onHide: Function
}

interface State {
  name: string
}

class FamilyForm extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      name: '',
    }
  }

  handleChange = (event: React.FormEvent<{ name: string; value: string }>) => {
    const name = event.currentTarget.name
    const value = event.currentTarget.value
    this.setState(({ [name]: value } as unknown) as Pick<State, keyof State>)
  }

  _handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    const { onHide } = this.props
    event.preventDefault()
    const { handleSubmit } = this.props
    handleSubmit(this.state)
    onHide()
  }

  render() {
    const { errorMsg, ...props } = this.props
    return (
      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        {...props}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            New family
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this._handleSubmit}>
            <Form.Group controlId='familyName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='Enter family name'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button type='submit' className='btn-primary mt-3'>
              Create family
            </Button>
          </Form>
          {errorMsg && <p className='error-text'>{errorMsg}</p>}
        </Modal.Body>
      </Modal>
    )
  }
}

export default FamilyForm
