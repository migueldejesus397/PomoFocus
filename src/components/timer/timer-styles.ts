import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const timerUi = {
  responsiveFontSize: Math.min(Math.max(width * 0.1, 55), 100),
  containerWidth: Math.min(width * 1.0, 1000),
  containerHeight: Math.min(height * 0.70, 180),
  controlButtonWidth: Math.min(width * 0.24, 110),
  buttonGap: Math.min(width * 1, 5),
};

export const timerStyles = StyleSheet.create({
  container: {
    width: timerUi.containerWidth,
    minHeight: timerUi.containerHeight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
  },
  timerText: {
    fontSize: timerUi.responsiveFontSize,
    fontWeight: '900',
    textAlign: 'center',
    width: '100%',
    maxWidth: timerUi.containerWidth - width * 0.08,
    lineHeight: timerUi.responsiveFontSize + 6,
    includeFontPadding: false,
    marginBottom: height * 0.025,
    fontVariant: ['tabular-nums'],
  },
  controlButton: {
    height: Math.min(height * 0.06, 52),
    minHeight: 44,
    width: timerUi.controlButtonWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: timerUi.buttonGap,
    width: '100%',
  },
});
