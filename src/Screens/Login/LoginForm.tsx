import React, { PureComponent } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import dna from '../../assets/dna.svg'

type Props = {
  handleSubmit: Function
  errorMsg: string
}

interface State {
  username: string
  password: string
}

class LoginForm extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      password: '',
      username: '',
    }
  }

  handleChange = (event: React.FormEvent<{ name: string; value: string }>) => {
    const name = event.currentTarget.name
    const value = event.currentTarget.value
    this.setState(({ [name]: value } as unknown) as Pick<State, keyof State>)
  }

  _handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { handleSubmit } = this.props
    handleSubmit(this.state)
  }

  render() {
    const { errorMsg } = this.props
    return (
      <Container>
        <Row className='d-flex justify-content-center align-items-center vh-100'>
          <Col xs={4}>
            <div className='d-flex mb-4'>
              <img src={dna} alt='genealogy-logo' className='dna-logo' />
              <h1>Genealogy</h1>
            </div>
            <Form onSubmit={this._handleSubmit}>
              <Form.Group controlId='formBasicUsername'>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type='text'
                  name='username'
                  placeholder='Enter username'
                  onChange={this.handleChange}
                />
                <Form.Text className='text-muted'>
                  We'll never share your username with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Button variant='primary' type='submit' className='mt-3'>
                Sign in
              </Button>
            </Form>
            {errorMsg && <p className='error-text'>{errorMsg}</p>}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LoginForm
