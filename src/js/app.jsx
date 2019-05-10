import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      balance: '',
      rate: '',
      term: 15,
      result: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'select' ? target.selected : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    this.setState({
      result: `$${this.calculate(this.state.rate, this.state.balance, this.state.term)} is your payment.`
    })
  }

  calculate(rate, balance, term){
    rate = rate / 100;
    let monthly = rate / 12;
    let months = term * 12;
    let m = balance * ((monthly * (1 + monthly) ** months)/(((1 + monthly) ** months) - 1));
    return m.toFixed(2);
  }

  render() {
    return (
      <div className='container'>
        <h3>Mortgage Calculator</h3>
        <form>
          <div className='form-group row'>
            <label htmlFor='loan-balance' className='col-sm-2'>Loan Balance</label>
            <input name='balance' type='number' className='col-sm-2' id='loan-balance' step='1000' value={this.state.balance} onChange={this.handleInputChange} />
          </div>
          <div className='form-group row'>
            <label htmlFor='rate' className='col-sm-2'>Intrest Rate (%) </label>
            <input name='rate' type='number' className='col-sm-2' id='rate' step='0.01' value={this.state.rate} onChange={this.handleInputChange} />
          </div>
          <div className='form-group row'>
              <label htmlFor='term' className='col-sm-1'>Loan Term (years) </label>
              <select value={this.state.term} onChange={this.handleInputChange} name='term' id='term'>
                <option value='15'>15</option>
                <option value='30'>30</option>
              </select>
          </div>
          <button className='btn btn-primary' name='submit' onClick={this.handleSubmit}>Calculate</button>
        </form>
        <div name='output'><h1>{this.state.result}</h1></div>
      </div>
    );
  }
}