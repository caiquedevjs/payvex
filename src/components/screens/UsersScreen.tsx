import { Menu, MenuItem, Text, TextProps } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

export const UsersScreen= (): React.ReactElement => {

  const [selectedTitle, setSelectedTitle] = React.useState('');

  const onUsersPress = (): void => {
    setSelectedTitle('Conta');
  };

  const onOrdersPress = (): void => {
    setSelectedTitle('Company');
  };

  const onTransactionsPress = (): void => {
    setSelectedTitle('Assinatura');
  };

  const onSettingsPress = (): void => {
    setSelectedTitle('Configurações');
  };

   const onIntegracaoPress = (): void => {
    setSelectedTitle('Integrações');
  };
  const onSairPress = (): void => {
    setSelectedTitle('Sair');
  };
  return (
    <>
      <Text category='h6' style={styles.textMenu}>
        {selectedTitle}
      </Text>
      <Menu>
        <MenuItem
          title={(evaProps: React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<Text> & Readonly<TextProps>) => (
            <Text {...evaProps} style={[evaProps.style, styles.textMenu]}>
              Conta
            </Text>
          )}
          onPress={onUsersPress}
        />
        <MenuItem
          title={(evaProps: React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<Text> & Readonly<TextProps>) => (
            <Text {...evaProps} style={[evaProps.style, styles.textMenu]}>
              Company
            </Text>
          )}
          onPress={onOrdersPress}
        />
        <MenuItem
          title= {(evaProps: React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<Text> & Readonly<TextProps>) => (
            <Text {...evaProps} style={[evaProps.style, styles.textMenu]}>
              Assinatura
            </Text>
          )}
          onPress={onTransactionsPress}
        />
        <MenuItem
          title={(evaProps: React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<Text> & Readonly<TextProps>) => (
            <Text {...evaProps} style={[evaProps.style, styles.textMenu]}>
              Integrações
            </Text>
          )}
          onPress={onIntegracaoPress}
        />
        <MenuItem
          title={(evaProps: React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<Text> & Readonly<TextProps>) => (
            <Text {...evaProps} style={[evaProps.style, styles.textMenu]}>
              Configurações
            </Text>
          )}
          onPress={onSettingsPress}
        />
        <MenuItem
          title= {(evaProps: React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<Text> & Readonly<TextProps>) => (
            <Text {...evaProps} style={[evaProps.style, styles.textMenu]}>
              Sair
            </Text>
          )}
          onPress={onSairPress}
        />
      </Menu>
      
    </>
  );
};

const styles = StyleSheet.create({
textMenu : {
  color : '#3A416F'
}
})

