import React from 'react';
import { View } from 'react-native';

function Footer({ children }) {
  return(
    <View style={{flex: 1, justifyContent: 'flex-end', marginTop: 30}}>
      {children}
    </View>
  );
}

export default Footer;
