import { Button } from '@/components/Button/button_index';
import { Input } from '@/components/Input/Input';
import { Login_Logo } from '@/components/Login_logo/Login_logo';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { app_styles } from './app_styles';


export default function Index(){
   
    return(
        <View style={app_styles.App}>
            <Text style={text_styles.Text}>Bem vindo ao <Text style={span_styles.Text}>MongoChat</Text></Text>
           <Login_Logo/>
           <Input/>
            <Button/>
            <View style={singin_conteiner.Sing_in}>
           <TouchableOpacity><Text style={singin_text.Sing_in_text}> <Text style={span_styles.Text}>Sing in</Text></Text></TouchableOpacity>
            <TouchableOpacity><Text style={singin_text.Sing_in_text}>Esqueci a senha</Text></TouchableOpacity>
            </View>
            

        </View>
    )
}


export const text_styles =  StyleSheet.create({
    Text : {
        fontSize : 40,
        fontWeight : "bold",
        fontFamily : "Roboto"
    }
})
export const span_styles =  StyleSheet.create({
    Text : {
        color : "#82d616"
    }
})

export const singin_conteiner = StyleSheet.create({
    Sing_in :{
        display : "flex",
        flexDirection : "row",
        gap : "35%",
    }
})

export const singin_text = StyleSheet.create({
    Sing_in_text :{
        fontWeight : "bold",
        fontSize : 18,
        
        
    }
})