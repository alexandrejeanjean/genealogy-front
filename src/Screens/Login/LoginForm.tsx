import React, { PureComponent } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import tree from '../../assets/tree.svg'

import './loginForm.scss'

type TLoginForm = {
  handleSubmit: Function
  errorMsg: string
}

interface ILoginState {
  username: string
  password: string
}

class LoginForm extends PureComponent<TLoginForm, ILoginState> {
  constructor(props: TLoginForm) {
    super(props)

    this.state = {
      password: '',
      username: '',
    }
  }

  handleChange = (event: React.FormEvent<{ name: string; value: string }>) => {
    const name = event.currentTarget.name
    const value = event.currentTarget.value
    this.setState(({ [name]: value } as unknown) as Pick<
      ILoginState,
      keyof ILoginState
    >)
  }

  _handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { handleSubmit } = this.props
    handleSubmit(this.state)
  }

  render() {
    const { errorMsg } = this.props
    return (
      <Container fluid className='login-wrapper'>
        <Row className='vh-100'>
          <Col
            xs={12}
            sm={12}
            md={4}
            className='left d-flex flex-column justify-content-center align-items-center'
          >
            <div className='left-mobile-title-wrapper mb-4'>
              <img src={tree} alt='genealogy-logo' className='dna-logo' />
              <h1>Family tree</h1>
            </div>
            <div className='left-desktop-title-wrapper mb-4'>
              <h1>Connexion</h1>
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

              <Button type='submit' className='btn-primary mt-3'>
                Sign in
              </Button>
            </Form>
            {errorMsg && <p className='error-text'>{errorMsg}</p>}
          </Col>
          <Col md={8} className='right-desktop-title-wrapper'>
            <img src={tree} alt='' className='right-desktop-logo' />
            <h2>Welcome to Family Tree</h2>
            <h3>
              Start your journey now <br /> & build an amazing tree of life
            </h3>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LoginForm
