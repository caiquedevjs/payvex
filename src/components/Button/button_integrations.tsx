
import { Button, Layout } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const ButtonIntegration = (): React.ReactElement => (
  <Layout
    style={styles.container}
    level='1'
  >
    <TouchableOpacity>
    <Button
      style={styles.button}
      size='MEDIUM'
      
    >
      conectar
    </Button>
    </TouchableOpacity>
    

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  button: {
    margin: 2,
    backgroundColor: '#3A416F',
    color: '#3A416F',
    borderColor: '#3A416F'
   
    
  },
});