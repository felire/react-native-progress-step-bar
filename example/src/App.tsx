import * as React from 'react';
import { View } from 'react-native';
import ProgressBar from 'react-native-progress-step-bar';

export default function App() {
  return (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
     <ProgressBar steps={6} ranges={[0, 150, 400, 600]} dotDiameter={20} width={325} height={8} />
  </View>
  );
}
