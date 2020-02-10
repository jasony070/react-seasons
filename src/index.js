import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

// Class based component. extends react.component allows us to use 
// a ton of other functionalities from that library
class App extends React.Component {
    // constructor(props){
    //     // super is reference to parent function
    //     super(props);

    //     // this is the only time we do direct assignment to this.state
    //     // Initialize state
    //     this.state = { lat: null, errorMessage: '' };


    // }
    state = { lat: null, errorMessage: '' };

    componentDidMount(){ // data loading
        window.navigator.geolocation.getCurrentPosition(
            // callback when everything goes as planned
            position => this.setState({lat: position.coords.latitude}),
            // failure callback
            err => this.setState({errorMessage: err.message})
        );
    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }

        if(!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat}/>
        }

        return <Spinner message="Please accept location request"/>;
    }

    render(){
        return (
        <div className="border red">
            {this.renderContent()}
        </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);