
import React from 'react';

import Stateless from './stateless';
import { getGreetings } from '../services/greetingsService';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.greetings = getGreetings();

    this.state = {
      greeting: this.greetings[0],
      name: props.defaultName
    };

    this.setGreeting = this.setGreeting.bind(this);
    this.setName = this.setName.bind(this);
    this.greetingRadio = this.greetingRadio.bind(this);
  }

  setGreeting(greeting) {
    this.setState({ greeting });
  };

  setName(name) {
    this.setState({ name });
  };

  greetingRadio(greeting) {
    const greetingId = `greeting_${greeting}`;

    return (
      <div key={greeting}>
        <label htmlFor={greetingId}>
          <input 
                id={greetingId}
                type="radio"
                name="greeting"
                value={greeting}
                checked={greeting === this.state.greeting}
                onChange={(ev) => this.setGreeting(ev.target.value)} />
            {greeting}
          </label>
        </div>
      );
    }
  
  render() {
    return (
      <div>
        {
          this.greetings.map(this.greetingRadio)
        }
        <input value={this.state.name} onChange={(ev) => this.setName(ev.target.value)} />
        <Stateless greeting={this.state.greeting}>
          {this.state.name}
        </Stateless>
      </div>
    )
  }
}
