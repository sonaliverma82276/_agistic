import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Container } from 'reactstrap';
import ScrollableAnchor from 'react-scrollable-anchor';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class map extends Component {
    constructor(props){
		super(props);
		this.state = {
			windowHeight: 720,
            lat:this.props.lat,
            long:this.props.long
		};
	}

	componentDidMount(){
		this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions);
	}

	updateDimensions = () => {
		this.setState({ windowHeight: window.innerHeight });
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.updateDimensions);
	}
   

    render() {
        return (
            <ScrollableAnchor id="location">
                <section className="location" style={{ minHeight: this.state.windowHeight + 'px' }}>
                    <Container style={{position: 'relative'}} >
                    <Map
                    google={this.props.google}
                    zoom={15}
                    style={ {
                        width: '60%',
                        height: '50vh',
                        position: 'relative',
                        margin:'auto'
                    }}
                    initialCenter={{ lat: this.props.lat, lng: this.props.long}}
                    >
                    <Marker position={{ lat: this.props.lat, lng: this.props.long}} label={this.props.city} />
                    </Map>
                    </Container>
                </section>
            </ScrollableAnchor>

            

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'API_KEY'
  })(map);
