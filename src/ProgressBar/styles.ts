import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  defaultBackgroundBar: {
    backgroundColor: '#777777',
  },
  dotsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  filledBarContainer: {
    overflow: 'hidden',
  },
  defaultFilledBar: {
    backgroundColor: 'white',
  },
  defaultBackgroundDot: {
    backgroundColor: '#777777',
  },
  defaultFilledDot: {
    backgroundColor: 'white',
  },
  rangeContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -25,
  },
  textRange: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
});

export default styles;
