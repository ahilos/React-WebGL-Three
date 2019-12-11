import React, { Component } from 'react';
import {ListGroup, Media, Container, Row, Col, Image} from 'react-bootstrap';
import './ProductTab.css';
class ProductsTab extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            toggled_key: '',
        }

        this.clickanitem = this.clickanitem.bind(this);
    }

    clickanitem(event)
    {
        console.log(event.target.id);
      this.props.handle(event.target.id);
    }
    render() {
        return (
            <div className={'lists'}>
                <Row style={{justifyContent:'center'}}>
                    <Image src="models/shoes/shoe-1.png" roundedCircle className={'item'} style={{display:'inline-block'}} onClick={this.clickanitem} id={'nike-1'}/>
                    <Image src="models/shoes/shoe-2.png" roundedCircle className={'item'} style={{display:'inline-block'}} onClick={this.clickanitem} id={'nike-2'}/>
                    <Image src="models/shoes/shoe-3.png" roundedCircle className={'item'} style={{display:'inline-block'}} onClick={this.clickanitem} id={'nike-3'}/>
                    <Image src="models/shoes/shoe-1.png" roundedCircle className={'item'} style={{display:'inline-block'}} onClick={this.clickanitem} id={'nike-1'}/>
                    <Image src="models/shoes/shoe-2.png" roundedCircle className={'item'} style={{display:'inline-block'}} onClick={this.clickanitem} id={'nike-2'}/>
                    <Image src="models/shoes/shoe-3.png" roundedCircle className={'item'} style={{display:'inline-block'}} onClick={this.clickanitem} id={'nike-3'}/>
                    <Image src="models/shoes/shoe-1.png" roundedCircle className={'item'} style={{display:'inline-block'}} onClick={this.clickanitem} id={'nike-1'}/>
                    <Image src="models/shoes/shoe-2.png" roundedCircle className={'item'} style={{display:'inline-block'}} onClick={this.clickanitem} id={'nike-2'}/>
                    <Image src="models/shoes/shoe-3.png" roundedCircle className={'item'} style={{display:'inline-block'}} onClick={this.clickanitem} id={'nike-3'}/>
                </Row>
            </div>
        );
    }
}
export default ProductsTab;
