import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  cameraView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
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
  }
});

export default styles;