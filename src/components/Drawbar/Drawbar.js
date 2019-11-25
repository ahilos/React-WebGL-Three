import React, { Component } from 'react';
import {ListGroup, Collapse} from 'react-bootstrap';
import './Drawbar.css';
class Drawbar extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            toggled_key: '',
        }

        this.clicklisthandle = this.clicklisthandle.bind(this);
    }
    clicklisthandle(event)
    {
        if(this.state.toggled_key === event.target.value)
            this.setState({toggled_key:''});
        else
            this.setState({toggled_key:event.target.value})
    }
    clickanitem(event)
    {
        window.location = `#Three/${event.target.value}`
    }
    render() {
        const active_path = window.location.hash;
        return (
            <ListGroup defaultActiveKey={active_path}>           
                
                <ListGroup.Item action onClick={this.clicklisthandle} variant="dark" value={'Simple'}>
                    +Simple Exmaples
                </ListGroup.Item>
                
                <Collapse in={this.state.toggled_key === 'Simple'}>
                    <div>
                        <ListGroup defaultActiveKey={active_path}>
                            <ListGroup.Item action onClick={this.clickanitem} value='RotatingCube'>
                                Rotating Cube
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={this.clickanitem} value='GroupExample'>
                                GroupExample
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Collapse>


                <ListGroup.Item action onClick={this.clicklisthandle} variant="dark" value={'Loader'}>
                    +Loader Exmaples
                </ListGroup.Item>
                
                <Collapse in={this.state.toggled_key === 'Loader'}>
                    <div>
                        <ListGroup defaultActiveKey={active_path}>
                            <ListGroup.Item action onClick={this.clickanitem} value='TextureLoaderExample'>
                                TextureLoaderExample
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={this.clickanitem} value='GLTFLoaderExample'>
                                GLTFLoaderExample
                            </ListGroup.Item>
                            
                            <ListGroup.Item action onClick={this.clickanitem} value='ObjectLoaderExample'>
                                ObjectLoaderExample
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Collapse>

                <ListGroup.Item action onClick={this.clicklisthandle} variant="dark" value={'Control'}>
                    +Control Exmaples
                </ListGroup.Item>
                
                <Collapse in={this.state.toggled_key === 'Control'}>
                    <div>
                        <ListGroup defaultActiveKey={active_path}>
                            <ListGroup.Item action onClick={this.clickanitem} value='OrbitControlExample'>
                                OrbitControlExample
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Collapse>
                

                <ListGroup.Item action onClick={this.clickanitem} value='ShopBrowser'>
                    ShopBrowser
                </ListGroup.Item>
            </ListGroup> 
        );
    }
}
export default Drawbar;
