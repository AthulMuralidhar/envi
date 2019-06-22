// https://aboutreact.com/react-native-swipeable-cardview-like-tinder/

import React from 'react';
import { StyleSheet, 
  Text, 
  View,
 Dimensions,
PanResponder,
Animated} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

//Component swipable class handles all its animations
// class SwipableCard extends React.Component{
//   constructor(){
//     super();
//     this.panResponder;
//     this.state = {Xposition: new Animated.Value(0)};
//     this.Card_Opacity = new Animated.Value(1);
//   }
  
//   componentWillMount() {
//     this.panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: (evt, gestureState) => false,
//       onMoveShouldSetPanResponder: (evt, gestureState) => true,
//       onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
//       onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
//       onPanResponderMove: (evt, gestureState) => {
//         this.state.Xposition.setValue(gestureState.dx);
//         if (gestureState.dx > SCREEN_WIDTH - 250) {
//           this.props.onSwipeRight();
//         } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
//           this.props.onSwipeLeft();
//         }
//       },
//       onPanResponderRelease: (evt, gestureState) => {
//         if (
//           gestureState.dx < SCREEN_WIDTH - 150 &&
//           gestureState.dx > -SCREEN_WIDTH + 150
//         ) {
//           Animated.spring(
//             this.state.Xposition,
//             {
//               toValue: 0,
//               speed: 5,
//               bounciness: 10,
//             },
//             { useNativeDriver: true }
//           ).start();
//         } else if (gestureState.dx > SCREEN_WIDTH - 150) {
//           Animated.parallel(
//             [
//               Animated.timing(this.state.Xposition, {
//                 toValue: SCREEN_WIDTH,
//                 duration: 200,
//               }),
//               Animated.timing(this.Card_Opacity, {
//                 toValue: 0,
//                 duration: 200,
//               }),
//             ],
//             { useNativeDriver: true }
//           ).start(() => this.props.removeCard());

//         } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
//           Animated.parallel(
//             [
//               Animated.timing(this.state.Xposition, {
//                 toValue: -SCREEN_WIDTH,
//                 duration: 200,
//               }),
//               Animated.timing(this.Card_Opacity, {
//                 toValue: 0,
//                 duration: 200,
//               }),
//             ],
//             { useNativeDriver: true }
//           ).start(() => this.props.removeCard());
//         }
//       },
//     });
//   }
//   render(){
//     const rotateCard = this.state.Xposition.interpolate({
//       inputRange:[-200,0,200],
//       outputRange:['-20deg','0deg','20deg'],
//     });
//     return(
//       <Animated.View
//         {...this.panResponder.panHandlers}
//         style={[
//           styles.card_Style,
//           {
//             backgroundColor:this.props.item.backgroundColor,
//             opacity:this.Card_Opacity,
//             transform:[
//               {translateX:this.state.Xposition},
//               {rotate:rotateCard},
//             ],
//           },
//         ]}>
//       <Text style={styles.card_Title}>{this.props.item.title}</Text>
//       {this.props.item.swipeLeft ? (
//         <Text style={styles.Left_Text_Style}>Left swipe</Text>
//       ):null}
//       {this.props.item.swipeRight ? (
//         <Text style={styles.Right_Text_Style}>Right swipe</Text>
//       ):null}
//       </Animated.View>
//     );
//   }
// }
// // 
// // Parent app class handles all the data
// export default class App extends React.Component {
//   constructor(){
//     super();
//     this.state = {
//       Sample_Card_Array:[{
//         id:'1', title: 'Card 1', backgroundColor:'#FFC107',swipeLeft:false,swipeRight:false,
//         id:'2', title: 'Card 2', backgroundColor:'#ED2525',swipeLeft:false,swipeRight:false,
//         id:'3', title: 'Card 3', backgroundColor:'#00BCD4',swipeLeft:false,swipeRight:false,
//         id:'4', title: 'Card 4', backgroundColor:'#FFFB14',swipeLeft:false,swipeRight:false,
//       }],
//       NoMoreCards: false,
//     }
//   }
// // 
//   componentDidMount(){
//     this.setState({
//       Sample_Card_Array: this.state.Sample_Card_Array.reverse(),
//       NoMoreCards: this.state.Sample_Card_Array.length == 0 ? true : this.state.NoMoreCards,
//     });
//   }
// // 
//   removeCard(id){
//     // delete array entry by given id
//     this.state.Sample_Card_Array.splice(
//       this.state.Sample_Card_Array.findIndex(x=>x.id==id),
//       1
//     );
//     // update state 
//     this.setState({
//       Sample_Card_Array: this.state.Sample_Card_Array,
//       NoMoreCards: this.state.Sample_Card_Array.length == 0 ? true : this.state.NoMoreCards,
//     });
//   }
// // 
//   handleSwipeLeft(id){
//     this.setState({
//       Sample_Card_Array:this.state.Sample_Card_Array.map(card=>{
//         if(card.id===id){
//           return {
//             id:card.id,
//             title:card.title,
//             backgroundColor:card.backgroundColor,
//             swipeLeft: !card.swipeLeft,
//             swipeRight:card.swipeRight,
//           }
//         }
//         return card
//       })
//     })
//   }
// // 
//   handleSwipeRight(id){
//         this.setState({
//       Sample_Card_Array:this.state.Sample_Card_Array.map(card=>{
//         if(card.id===id){
//           return {
//             id:card.id,
//             title:card.title,
//             backgroundColor:card.backgroundColor,
//             swipeLeft: card.swipeLeft,
//             swipeRight:!card.swipeRight,
//           }
//         }
//         return card
//       })
//     })
//   }
// // 
//   render(){
//   return (
//     <View style={styles.MainContainer}>
//       {this.state.Sample_Card_Array.map((item,key)=>(
//           <SwipableCard
//           key={key}
//           item={item}
//           removeCard={()=>this.removeCard(item.id)}
//           onSwipeLeft={()=>this.handleSwipeLeft(item.id)}
//           onSwipeRight={()=>this.handleSwipeRight(item.id)}
//         />))}
//         {this.state.NoMoreCards ? (
//           <Text style={{ fontSize: 22, color: '#000' }}> No more cards!</Text>
//         ):null}
//     </View>
//   );
//   }
// }

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
// ORIGINAL SOURCECODE==================================================================================

class SwipeableCard extends React.Component {
  constructor() {
    super();
    this.panResponder;
    this.state = {
      Xposition: new Animated.Value(0),
    };
    this.Card_Opacity = new Animated.Value(1);
  }
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.state.Xposition.setValue(gestureState.dx);
        if (gestureState.dx > SCREEN_WIDTH - 250) {
          this.props.onSwipedRight();
        } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
          this.props.onSwipedLeft();
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (
          gestureState.dx < SCREEN_WIDTH - 150 &&
          gestureState.dx > -SCREEN_WIDTH + 150
        ) {
          Animated.spring(
            this.state.Xposition,
            {
              toValue: 0,
              speed: 5,
              bounciness: 10,
            },
            { useNativeDriver: true }
          ).start();
        } else if (gestureState.dx > SCREEN_WIDTH - 150) {
          Animated.parallel(
            [
              Animated.timing(this.state.Xposition, {
                toValue: SCREEN_WIDTH,
                duration: 200,
              }),
              Animated.timing(this.Card_Opacity, {
                toValue: 0,
                duration: 200,
              }),
            ],
            { useNativeDriver: true }
          ).start(() => {this.props.removeCard()});
        } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
          Animated.parallel(
            [
              Animated.timing(this.state.Xposition, {
                toValue: -SCREEN_WIDTH,
                duration: 200,
              }),
              Animated.timing(this.Card_Opacity, {
                toValue: 0,
                duration: 200,
              }),
            ],
            { useNativeDriver: true }
          ).start(() => {this.props.removeCard()});
        }
      },
    });
  }
  render() {
    const rotateCard = this.state.Xposition.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['-20deg', '0deg', '20deg'],
    });
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          styles.card_Style,
          {
            backgroundColor: this.props.item.backgroundColor,
            opacity: this.Card_Opacity,
            transform: [
              { translateX: this.state.Xposition },
              { rotate: rotateCard },
            ],
          },
        ]}>
        <Text style={styles.Card_Title}> {this.props.item.card_Title} </Text>
        {this.props.swipeLeft ? (
          <Text style={styles.Left_Text_Style}> Left Swipe </Text>
        ) : null}
        {this.props.swipeRight ? (
          <Text style={styles.Right_Text_Style}> Right Swipe </Text>
        ) : null}
      </Animated.View>
    );
  }
}
 
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      Sample_Card_Array: [{
          id: '1', card_Title: 'Card 1', backgroundColor: '#FFC107',swipeLeft:false,swipeRight:false,
        },{
          id: '2', card_Title: 'Card 2', backgroundColor: '#ED2525',swipeLeft:false,swipeRight:false,
        },{
          id: '3', card_Title: 'Card 3', backgroundColor: '#E7o88E',swipeLeft:false,swipeRight:false,
        },{
          id: '4', card_Title: 'Card 4', backgroundColor: '#00BCD4',swipeLeft:false,swipeRight:false,
        },{
          id: '5', card_Title: 'Card 5', backgroundColor: '#FFFB14',swipeLeft:false,swipeRight:false,
        }],
        No_More_Card: false,
    };
  }
  componentDidMount() {
    this.setState({
      Sample_Card_Array: this.state.Sample_Card_Array.reverse(),
    });
    if (this.state.Sample_Card_Array.length == 0) {
      this.setState({ No_More_Card: true });
    }
  }
  removeCard = id => {
    // might wanna add prevstate here...
    this.state.Sample_Card_Array.splice(
      this.state.Sample_Card_Array.findIndex(x => x.id == id),
      1
    );
    this.setState({ Sample_Card_Array: this.state.Sample_Card_Array }, () => {
      if (this.state.Sample_Card_Array.length == 0) {
        this.setState({ No_More_Card: true });
      }
    });
  };
  
  handleSwipeRight = id => {
    this.setState({
            Sample_Card_Array:this.state.Sample_Card_Array.map(card=>{
              if(card.id===id){
                return {
                  id:card.id,
                  title:card.title,
                  backgroundColor:card.backgroundColor,
                  swipeLeft: false,
                  swipeRight:true,
                }
              }
              return card
            })
          });
  }
  
  handleSwipeLeft = id => {
    this.setState({
            Sample_Card_Array:this.state.Sample_Card_Array.map(card=>{
              if(card.id===id){
                return {
                  id:card.id,
                  title:card.title,
                  backgroundColor:card.backgroundColor,
                  swipeLeft: true,
                  swipeRight:false,
                }
              }
              return card
            })
          });
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        {this.state.Sample_Card_Array.map((item, key) => (
          <SwipeableCard
            key={key}
            item={item}
            removeCard={this.removeCard.bind(this, item.id)}
            onSwipedLeft={this.handleSwipeLeft.bind(this,item.id)}
            onSwipedRight={this.handleSwipeRight.bind(this,item.id)}
            swipeLeft={item.swipeLeft}
            swipeRight={item.swipeRight}
          />
        ))}
        {this.state.No_More_Card ? (
          <Text style={{ fontSize: 22, color: '#000' }}>No Cards Found.</Text>
        ) : null}
      </View>
    );
  }
}