import { StyleSheet, TextInput, View } from "react-native";
import { Input_styles } from "./Input_styles";

export function Input(){
    return(
        <View style={login_form_styles.Form_login}>
            <TextInput placeholder="Mail" style={Input_styles.Input} inputMode="email"></TextInput>
            <TextInput placeholder="Senha" style={Input_styles.Input} inputMode="text" secureTextEntry={true}></TextInput>
        </View>
        
        
    )
}
export const login_form_styles = StyleSheet.create({
    Form_login : {
        width : "100%",
        gap : 10
       
    }
})