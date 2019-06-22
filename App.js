// https://aboutreact.com/react-native-swipeable-cardview-like-tinder/

import React from 'react';
import { StyleSheet, 
  Text, 
  View,
 Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
//Component swipable class handles all its animations
class SwipableCard extends React.Component{

}

// Parent app class handles all the data
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      Sample_Card_Array:[{
        id:'1', title: 'Card 1', backgroundColor:'#FFC107',swipeLeft:false,swipeRight:false,
        id:'2', title: 'Card 2', backgroundColor:'#ED2525',swipeLeft:false,swipeRight:false,
        id:'3', title: 'Card 3', backgroundColor:'#00BCD4',swipeLeft:false,swipeRight:false,
        id:'4', title: 'Card 4', backgroundColor:'#FFFB14',swipeLeft:false,swipeRight:false,
      }],
      NoMoreCards: false,
    }
  }

  componentDidMount(){
    this.setState({
      Sample_Card_Array: this.state.Sample_Card_Array.reverse(),
      NoMoreCards: this.state.Sample_Card_Array.length == 0 ? true : this.state.NoMoreCards,
    });
  }

  removeCard(id){
    // delete array entry by given id
    this.state.Sample_Card_Array.splice(
      this.state.Sample_Card_Array.findIndex(x=>x.id==id),
      1
    );
    // update state 
    this.setState({
      Sample_Card_Array: this.state.Sample_Card_Array,
      NoMoreCards: this.state.Sample_Card_Array.length == 0 ? true : this.state.NoMoreCards,
    });
  }

  handleSwipeLeft(id){
    
  }

  render(){
  return (
    <View style={styles.MainContainer}>
      {this.state.Sample_Card_Array.map((item,key)=>(
          <SwipableCard
          key={key}
          item={item}
          removeCard={()=>this.removeCard(item.id)}
          onSwipeLeft={()=>this.handleSwipeLeft(item.id)}
          onSwipeRight={()=>this.handleSwipeRight(item.id)}
        />))}
        {this.state.NoMoreCards ? (
          <Text style={{ fontSize: 22, color: '#000' }}> No more cards!</Text>
        ):null}
    </View>
  );
  }
}

// STYLING =========================================================================================
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  card_Style: {
    width: '75%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 7,
  },
  Card_Title: {
    color: '#fff',
    fontSize: 24,
  },
  Left_Text_Style: {
    top: 22,
    right: 32,
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  Right_Text_Style: {
    top: 22,
    left: 32,
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});