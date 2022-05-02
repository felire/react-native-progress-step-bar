import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ProgressBar from 'react-native-progress-step-bar';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const handlePrevStep = useCallback(() => {
    setCurrentStep((prevStep) => prevStep - 1);
  }, []);

  const handleNextStep = useCallback(() => {
    setCurrentStep((prevStep) => prevStep + 1);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <View style={{ marginBottom: 50 }}>
        <ProgressBar
          steps={6}
          ranges={['0', '150', '400', '600', '800', '1000', '1200']}
          width={325}
          height={3}
          currentStep={currentStep}
          stepToStepAnimationDuration={1000}
          withDots={false}
        />
      </View>
      <View style={{ marginBottom: 50 }}>
        <ProgressBar
          steps={6}
          width={325}
          height={3}
          currentStep={currentStep}
          stepToStepAnimationDuration={1000}
          withDots={false}
        />
      </View>
      <View style={{ marginBottom: 50 }}>
        <ProgressBar
          steps={6}
          width={325}
          height={10}
          currentStep={currentStep}
          stepToStepAnimationDuration={1000}
          fillerBarStyle={{ borderRadius: 10, backgroundColor: 'white' }}
          backgroundBarStyle={{ borderRadius: 10, backgroundColor: '#777777' }}
          filledBarContainerStyle={{ borderRadius: 10 }}
          withDots={false}
        />
      </View>
      <View style={{ marginBottom: 50 }}>
        <ProgressBar
          steps={6}
          ranges={['0', '150', '400', '600', '800', '1000', '1200']}
          dotDiameter={10}
          width={325}
          height={3}
          currentStep={currentStep}
          stepToStepAnimationDuration={1000}
          withDots
        />
      </View>
      <View style={{ marginBottom: 50 }}>
        <ProgressBar
          steps={6}
          dotDiameter={10}
          width={325}
          height={3}
          currentStep={currentStep}
          stepToStepAnimationDuration={1000}
          withDots
        />
      </View>
      <View style={{ marginBottom: 50 }}>
        <ProgressBar
          steps={6}
          dotDiameter={15}
          width={325}
          height={6}
          currentStep={currentStep}
          stepToStepAnimationDuration={1000}
          withDots
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: 400,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 40,
        }}
      >
        <TouchableOpacity
          onPress={handlePrevStep}
          style={{ backgroundColor: 'green', marginRight: 30 }}
        >
          <Text>PrevStep</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextStep}
          style={{ backgroundColor: 'green' }}
        >
          <Text>NextStep</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
