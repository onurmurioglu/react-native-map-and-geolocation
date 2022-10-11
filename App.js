import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  componentDidMount,
  Touchable,
  TouchableOpacity,
  container,
  Platform,
  PermissionsAndroid
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Geolocation from '@react-native-community/geolocation';
import  { PROVIDER_GOOGLE, Marker, Polygon, Circle } from 'react-native-maps';

import MapView from "react-native-map-clustering";  
import { parse } from '@babel/core';


/* --Directions--

    <MapViewDirections 
              
                apikey = { 'AIzaSyAMDQQEQI-0niKiqy-g02DeqZjSE9-G8hw' }
                origin = {{ latitude: 41.040058, longitude: 28.809457 }}
                destination = {{ latitude: 41.050725, longitude: 28.808352 }}
                
                />

*/

export default class App extends React.Component 
{

 

    constructor(){
        super();

        this.state = { 

            latitude: '',
            longitude: '',
            loading: true
        }

    }
    

    componentDidMount = async () => {

      if(Platform.OS == 'android')
      {
        const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {

          'title' : 'MapsAndGeo',
          'message': 'Konumunuzu istiyoruz'
        });

      //  alert(response);
      }
      else
      {
        Geolocation.requestAuthorization();

      }
            
        Geolocation.getCurrentPosition(
            
           position => {
            
            
            const { coords: { latitude, longitude} } = position; 
            this.setState( { latitude, longitude  } );
           
            //console.log(latitude + ' , ' + longitude)
              console.log(typeof(latitude));
              console.log(typeof(longitude));
            // alert('coords: '+ ' \n\n ' + 'lat: ' + latitude + ' \n ' + 'long: ' + longitude)
            
           },

           error => {

              console.log(error);
              alert('Error' + error)
           },

           
        );

/*
        this.watchId = Geolocation.watchPosition(
          position => {
              
            const {coords: {  latitude, longitude}} = position;
            this.setState({ latitude, longitude })

             // alert('Position:' + position)
          },

          error => {
            console.log('Hata' + error)
            alert('Error' + error)
          }
        );
        console.log(this.watchId);

          */

    }

/* -- Marker --

    <Marker 

              draggable = {true}
              onPress = {() => alert('Marker \'a tıklandı')}
              onDrag = {() => alert('Kaydırıldı')}
              onDragEnd = {() => alert('Kaydırma bitti')} 
              title = {"212 Outlet"}
              description =  {"AVM"}
              pinColor = {"red"}
              opacity = {1.0}
              coordinate = {

              {

                   latitude: 41.0477744,
                   longitude: 28.8117198,
                   latitudeDelta: 0.015,
                   longitudeDelta: 0.0121,

              }
            } 
            
            />


*/

    _stop = () => {
      Geolocation.stopObserving();
    }
    componentWillUnmount = () => {

        Geolocation.clearWatch(this.watchId);

    }

    

    render() {
      
     //const { latitude, longitude} = this.setState.parseFloat;
     
      return (
   
        <View style = { styles.container }>
       
       
         <MapView
         
                
              provider = { PROVIDER_GOOGLE}
              style = {styles.map}
              region = {{ 

                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,

              }}

              showsUserLocation= {true}
          > 
 


            <Marker coordinate={{ latitude: 52.4, longitude: 18.7 }} />
            <Marker coordinate={{ latitude: 52.1, longitude: 18.4 }} />
            <Marker coordinate={{ latitude: 52.6, longitude: 18.3 }} />
            <Marker coordinate={{ latitude: 51.6, longitude: 18.0 }} />
            <Marker coordinate={{ latitude: 53.1, longitude: 18.8 }} />
            <Marker coordinate={{ latitude: 52.9, longitude: 19.4 }} />
            <Marker coordinate={{ latitude: 52.2, longitude: 21 }} />
            <Marker coordinate={{ latitude: 52.4, longitude: 21 }} />
            <Marker coordinate={{ latitude: 51.8, longitude: 20 }} />

        <Polygon
        
          onPress = {() => alert('Polygon Tıklandı')}
          strokeWidth = {3}
          strokeColor = {'red'}
          fillColor = {'yellow'}
          tappable = {true}
          coordinates = {[
          
          { latitude: 41.051873, longitude: 28.809529 },
          { latitude: 41.050525, longitude: 28.809171 },
          { latitude: 41.051896, longitude: 28.812319 },
        
        ]}/>


          <Marker 

            draggable = {true}
            onDrag = {(e) => console.log(e.nativeEvent.coordinate)}
            onDragStart = {(e) => console.log(`Start: ${e.nativeEvent.coordinate}`)}
            onDragEnd = {(e) => alert(e.nativeEvent.coordinate.latitude + '\n' + e.nativeEvent.coordinate.longitude)}
            // onPress = {() => alert('Marker \'a tıklandı')}
         //   onDrag = {() => alert('Kaydırıldı')}
         //   onDragEnd = {() => alert('Kaydırma bitti')} 
            title = {"212 Outlet"}
            description =  {"AVM"}
            pinColor = {"red"}
            opacity = {1.0}
            coordinate = {

            {

                latitude: 41.076902,
                longitude: 28.751460,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,

            }
          } 

          >
             

          </Marker>

        <Circle 
        
           strokeWidth = {3}
           strokeColor = {"red"}
           radius = {300}
           fillColor = {"orange"}
           lineCap = {"butt"}
           center = {{latitude: 41.051873, longitude: 28.809529}}
        
        
        />


        

         </MapView>
       
        
        </View>

      )
  
    }

}

const styles = StyleSheet.create({

    container: {

        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },

    map: {

        ...StyleSheet.absoluteFillObject,

    },

});