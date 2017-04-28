import {
  Dimensions,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  activeTab: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    flex: 1
  },
  activeTabText: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  avoidTop: { // Used in multiple files
    flex: 1,
    paddingTop: 20
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
  comment: {
    backgroundColor: 'white',
    flex: 1,
    minHeight: 50,
    padding: 10
  },
  commentImage: {
    height: 50,
    width: 50
  },
  commentView: {
    flex: 1,
    flexDirection: 'row',
    padding: 2
  },
  feedImage: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 120,
    justifyContent: 'space-between'
  },
  feedTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 1
  },
  feedText: { // Used in multiple files
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  },
  feedTimerText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  },
  header: {
    fontSize: 16,
    paddingBottom: 10,
    textAlign: 'center'
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  hidden: {
    display: 'none'
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center'
  },
  modalView0: {
    flex: 3,
    padding: 20
  },
  modalView1: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalImage: {
    alignItems: 'flex-end',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalText1: {
    color: 'white',
    fontSize: 12
  },
  modalText2: {
    color: 'white',
    fontSize: 10
  },
  modalText3: {
    color: 'white',
    fontSize: 16,
    padding: 5
  },
  modalText4: {
    color: 'white',
    fontSize: 12,
    marginTop: 10
  },
  modalTextInput: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginTop: 5,
    padding: 10
  },
  pastImage: {
    height: 120,
    justifyContent: 'space-between'
  },
  pastImageView: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pastTimer: {
    alignSelf: 'flex-end',
    color: 'white',
    fontWeight: 'bold',
    paddingRight: 5,
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 0.5 }
  },
  profileHeader: { // Used in multiple files
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  profileText: { // Used in multiple files
    fontSize: 16,
    textAlign: 'center'
  },
  profileListTab: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  profileUserImage: {
    borderRadius: 30,
    height: 60,
    width: 60
  },
  profileUserView: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center'
  },
  tab1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tab2: {
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
  upcomingImage: {
    alignItems: 'flex-end',
    height: 120,
    justifyContent: 'flex-end'
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
    paddingVertical: 10
  }
});

export default styles;