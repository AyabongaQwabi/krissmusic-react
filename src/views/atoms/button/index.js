import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

class MegaButton extends Component {
  render(){
    return(
      <div>
        <Button>
          {this.props.children}
        </Button>
      </div>
  )
  }
}

export default MegaButton;
