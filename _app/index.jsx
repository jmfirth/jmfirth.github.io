import React from 'react'
import { render } from 'react-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

const Navigation = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="https://github.com/jmfirth"><img src="//www.gravatar.com/avatar/d93d42b6e3acc1a199adea8cd8d3e2af?s=50"></img></a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/">Home</NavItem>
        <NavItem eventKey={2} href="/search">Search</NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} href="https://github.com/jmfirth/docker-webpack">docker-webpack</MenuItem>
          <MenuItem eventKey={3.2} href="https://github.com/jmfirth/generator-elm-spa">generator-elm-spa</MenuItem>
          <MenuItem eventKey={3.3} href="https://github.com/jmfirth/lala">lala</MenuItem>
          <MenuItem eventKey={3,4} href="https://github.com/jmfirth/cljs-react-bootstrap">Clojurescript React-Bootstrap</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.5} href="https://bitbucket.org/jmfirth/hue-cli">hue-cli</MenuItem>
          <MenuItem eventKey={3.6} href="https://bitbucket.org/jmfirth/hue-cli-rewrite">hue-cli-rewrite</MenuItem>
        </NavDropdown>
        <NavItem eventKey={4} href="/about">About</NavItem>
      </Nav>
      {/*
      <Nav pullRight>
        <div class="input-group">
          <input type="text" placeholder="Search..." class="form-control"/>
          <div class="input-group-btn">
            <button type="button" class="btn btn-info">
              <span class="glyphicon glyphicon-search"></span>
            </button>
          </div>
        </div>
      </Nav>
        */}
    </Navbar.Collapse>
  </Navbar>
)

const nav = document.getElementById('nav')
if (nav)
  render(<Navigation/>, nav)
