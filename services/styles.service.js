import {
  Dimensions,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  cameraView: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  cameraWhiteCircle: {
    borderColor: "white",
    borderRadius: 40,
    borderWidth: 3,
    height: 80,
    marginBottom: 20,
    width: 80
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
    textShadowColor: 'gray',
    textShadowOffset: { width: 1, height: 1 }
  },
  footer: {
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  hidden: {
    display: 'none'
  },
});

export default styles;