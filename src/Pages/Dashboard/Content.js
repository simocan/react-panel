import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {SuccessFile,NotFound} from '../../Other';
import { Card} from 'react-bootstrap';

class Content extends Component {
 
    render() {
        return (
			<div className="card-container-body">
			
<Card className="h-100">
  <Card.Body>
            <Switch>
				    <Route path="/SuccessFile" component={SuccessFile} />
					<Route path="/" component={NotFound} />
					<Route component={NotFound} />
        </Switch>
		</Card.Body>
</Card></div>
        );
    }
}

export default Content;



