import React, { Component } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {id:3, image: "https://www.banq.qc.ca/sites/default/files/2022-06/icone_profil_generique.jpg", name:"Demo 1", text:"As a regular classroom volunteer you will work under the guidance of our teachers and the therapy staff and be an important part of the classroom team. ", attachment:"https://via.placeholder.com/100x100/FFB6C1/000000"},
        {id:2, image: "https://www.banq.qc.ca/sites/default/files/2022-06/icone_profil_generique.jpg", name:"Demo 2", text:"As a regular classroom volunteer you will work under the guidance of our teachers and the therapy staff and be an important part of the classroom team. ", attachment:"https://via.placeholder.com/100x100/20B2AA/000000"},
        {id:4, image: "https://www.banq.qc.ca/sites/default/files/2022-06/icone_profil_generique.jpg", name:"Demo 3", text:"As a regular classroom volunteer you will work under the guidance of our teachers and the therapy staff and be an important part of the classroom team. ", attachment:""},
        {id:5, image: "https://www.banq.qc.ca/sites/default/files/2022-06/icone_profil_generique.jpg", name:"Demo 4", text:"As a regular classroom volunteer you will work under the guidance of our teachers and the therapy staff and be an important part of the classroom team. ", attachment:""},
        {id:1, image: "https://www.banq.qc.ca/sites/default/files/2022-06/icone_profil_generique.jpg", name:"Demo 5", text:"As a regular classroom volunteer you will work under the guidance of our teachers and the therapy staff and be an important part of the classroom team. ", attachment:"https://via.placeholder.com/100x100/7B68EE/000000"},
        {id:6, image: "https://www.banq.qc.ca/sites/default/files/2022-06/icone_profil_generique.jpg", name:"Demo 6", text:"As a regular classroom volunteer you will work under the guidance of our teachers and the therapy staff and be an important part of the classroom team. ", attachment:""},
        {id:7, image: "https://www.banq.qc.ca/sites/default/files/2022-06/icone_profil_generique.jpg", name:"Demo 7", text:"As a regular classroom volunteer you will work under the guidance of our teachers and the therapy staff and be an important part of the classroom team. ", attachment:""},
      ]
    }
  }

  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          let attachment = <View/>;

          let mainContentStyle;
          if(Notification.attachment) {
            mainContentStyle = styles.mainContent;
            attachment = <Image style={styles.attachment} source={{uri:Notification.attachment}}/>
          }
          return(
            <View style={styles.container}>
              <Image source={{uri:Notification.image}} style={styles.avatar}/>
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                    <Text style={styles.name}>{Notification.name}</Text>
                    <Text style={styles.description}>{Notification.text}</Text>
                  </View>
                  <Text style={styles.timeAgo}>
                    2 hours ago
                  </Text>
                </View>
                {attachment}
              </View>
            </View>
          );
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width:50,
    height:50,
    borderRadius:25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap:'wrap',
    fontFamily: "HelveticaNeue",
    color: "#52575D"
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
    fontFamily: "HelveticaNeue"
  },
  mainContent: {
    marginRight: 60,
    fontFamily: "HelveticaNeue",
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  name:{
    fontSize:16,
    fontFamily: "HelveticaNeue",
    color: "#52575D"
  },
  description:{
    fontFamily: "HelveticaNeue",
    marginTop: 5
  }
});
