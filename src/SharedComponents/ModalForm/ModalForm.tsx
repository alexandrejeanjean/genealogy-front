import React, { PureComponent } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

type TInputs = { name: string; placeholder: string }

type Props = {
  title: string
  inputs: TInputs[]
  handleSubmit: Function
  errorMsg: string
  show: boolean
  onHide: Function
}

interface State {
  name: string
  firstname: string
  lastname: string
  position: number | null
}

class ModalForm extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      name: '',
      position: null,
      firstname: '',
      lastname: '',
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
    const { errorMsg, title, inputs, ...props } = this.props
    return (
      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        {...props}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            New {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this._handleSubmit}>
            {inputs.map((input: TInputs) => (
              <Form.Group controlId='familyName' key={input.placeholder}>
                <Form.Label>
                  {input.name.charAt(0).toUpperCase() + input.name.substr(1)}
                </Form.Label>
                <Form.Control
                  type='text'
                  name={input.name}
                  placeholder={input.placeholder}
                  onChange={this.handleChange}
                />
              </Form.Group>
            ))}

            <Button type='submit' className='btn-primary mt-3'>
              Create {title}
            </Button>
          </Form>
          {errorMsg && <p className='error-text'>{errorMsg}</p>}
        </Modal.Body>
      </Modal>
    )
  }
}

export default ModalForm
