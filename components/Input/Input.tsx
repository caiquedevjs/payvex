import { Button } from '@/components/Button/button_index';
import { StyleSheet, TextInput, View } from "react-native";
import { Input_styles } from "./Input_styles";
export function Input(){
    return(
        <View style={login_form_styles.Form_login}>
            <TextInput placeholder="Mail" placeholderTextColor= '#3A416F' style={Input_styles.Input} inputMode="email"></TextInput>
            <TextInput placeholder="Senha" placeholderTextColor= '#3A416F' style={Input_styles.Input} inputMode="text" secureTextEntry={true}></TextInput>
            <Button/>
        </View>
        
        
    )
}
export const login_form_styles = StyleSheet.create({
    Form_login : {
        width : "100%",
        gap : 10
       
    }
})