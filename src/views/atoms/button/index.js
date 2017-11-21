import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

class MegaButton extends Component {
  render(){
    return(
      <div>
        <Button style={{background:'#7cb341', padding:'10px', color:'#fff' ,margin:'15px'}} className='btn-lg btn-success'>
          {this.props.children}
        </Button>
      </div>
  )
  }
}

export default MegaButton;
