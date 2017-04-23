import {
  Dimensions,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  activeFeed: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    flex: 1
  },
  avatarHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  avatarHeaderText: {
    fontSize: 16,
    textAlign: 'center'
  },
  avatarView: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center'
  },
  avatarImage: {
    borderRadius: 30,
    height: 60,
    width: 60
  },
  // USED IN MORE THAN ONE PLACE
  avoidTop: {
    flex: 1,
    paddingTop: 30
  },
  camera: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  cameraView: {
    alignItems: 'center',
    flex: 11,
    justifyContent: 'flex-end'
  },
  cameraWhiteCircle: {
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 45,
    borderWidth: 2,
    height: 90,
    width: 90
  },
  coverImage: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 120,
    width: null
  },
  coverText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 }
  },
  feedTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 1
  },
  header: {
    fontSize: 16,
    paddingBottom: 10,
    textAlign: 'center'
  },
  hidden: {
    display: 'none'
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center'
  },
  paddingTopBottom: {
    paddingBottom: 10,
    paddingTop: 10
  },
  profileNavigator: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabBar1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabBar2: {
    backgroundColor: 'floralwhite',
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tag: {
    fontSize: 12,
    textAlign: 'center'
  },
  userCounts: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  username: {
    fontSize: 22,
    textAlign: 'center'
  },
  userView: {
    flex: 3,
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10
  }
});

export default styles;