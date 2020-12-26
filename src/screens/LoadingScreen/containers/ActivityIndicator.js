import React from 'react';
import { ActivityIndicator } from 'react-native';

import { ActivityIndicatorWrapper } from '../components';


export const ActivityIndicatorContainer = () => (
  <ActivityIndicatorWrapper>
    <ActivityIndicator size="large" color="#ffffff" visible={false} />
  </ActivityIndicatorWrapper>
);
