import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from "react-native";
import ToastManager, { Toast, } from 'toastify-react-native';
import { styles_button } from "./button_styles";

export  function Button(){
     const router = useRouter();

      const handleLogin = () => {
         
                        Toast.show({
              type: 'success',
              text1: 'Bem vindo!',
              text2: 'unifique seus pagamentos em um só lugar.',
              position: 'top',
              visibilityTime: 5000,
              autoHide: true,
              backgroundColor: '#3A416F',
              textColor: '#fff',
              iconColor: '#82d616',
              iconSize: 24,
              progressBarColor: '#82d616',
              theme: 'dark',
              // Custom close icon options
              closeIcon: 'times-circle',
              closeIconFamily: 'FontAwesome',
              closeIconSize: 20,
              closeIconColor: '#fff',
            })
            
        
    setTimeout(() => {
      // Esta linha está perfeita! Ela já leva para a tela /home simples.
      router.push('/home'); 
    }, 1500);
  };

    return(
        <><TouchableOpacity style={styles_button.Button} onPress={handleLogin}>
            <Text style={styles_button.Text}>Login</Text>

        </TouchableOpacity><ToastManager /></>
    )
}