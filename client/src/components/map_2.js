// import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import base from '../../../config/firebase';
// import { withGoogleMap, GoogleMap, Marker, } from 'react-google-maps';
// import Helmet from 'react-helmet'

// const googleApiKey = 'AIzaSyCuNBC8C1JNqGkZfHuUHjjEbMa-aooZMoc';

// const GettingStartedGoogleMap = withGoogleMap(props => (
//   <GoogleMap
//     ref={props.onMapLoad}
//     defaultZoom={3}
//     defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
//     onClick={props.onMapClick}
//   >
//     {props.markers.map(marker => (
//       <Marker
//         {...marker}
//         onRightClick={() => props.onMarkerRightClick(marker)}
//       />
//     ))}
//   </GoogleMap>
// ));


// export default class GettingStartedExample extends Component {
  
//   constructor(props){
//     super(props)
    
//     this.state = {
//       markers: [{
//         position: {
//           lat: 25.0112183,
//           lng: 121.52067570000001,
//         },
//         key: `Taiwan`,
//         defaultAnimation: 2,
//       }],
//     }
  
//     this.handleMapLoad = this.handleMapLoad.bind(this);
//     this.handleMapClick = this.handleMapClick.bind(this);
//     this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
    
//   }

//   handleMapLoad(map) {
//     this._mapComponent = map;
//     if (map) {
//       console.log(map.getZoom());
//     }
//   }

//   /*
//    * This is called when you click on the map.
//    * Go and try click now.
//    */
//   handleMapClick(event) {
//     const nextMarkers = [
//       ...this.state.markers,
//       {
//         position: event.latLng,
//         defaultAnimation: 2,
//         key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
//       },
//     ];
//     this.setState({
//       markers: nextMarkers,
//     });

//     if (nextMarkers.length === 3) {
//       this.props.toast(
//         `Right click on the marker to remove it`,
//         `Also check the code!`
//       );
//     }
//   }

//   handleMarkerRightClick(targetMarker) {
//     /*
//      * All you modify is data, and the view is driven by data.
//      * This is so called data-driven-development. (And yes, it's now in
//      * web front end and even with google maps API.)
//      */
//     const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
//     this.setState({
//       markers: nextMarkers,
//     });
//   }

//   render() {
//     return (
//       <div style={{height: `100%`}}>
//         <Helmet
//           title="Getting Started"
//         />
//         <GettingStartedGoogleMap
//           containerElement={
//             <div style={{ height: `100%` }} />
//           }
//           mapElement={
//             <div style={{ height: `100%` }} />
//           }
//           onMapLoad={this.handleMapLoad}
//           onMapClick={this.handleMapClick}
//           markers={this.state.markers}
//           onMarkerRightClick={this.handleMarkerRightClick}
//         />
//       </div>
//     );
//   }
// }

// // function mapStateToProps(state) {
// //   const { concertsDisplayList, filteredConcertsDisplayList } = state.concerts;
// //   return { concertsDisplayList, filteredConcertsDisplayList };
// // }

// // export default connect(mapStateToProps)(ConcertMap2);