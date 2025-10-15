import { Image } from "react-native";
import { login_logo_styles } from "./login_logo_styles";




export function Login_Logo(){
    return(
         <Image source={require('../../../assets/images/Payvex Fintech Logo - Modern and Sleek.png')} style={login_logo_styles.Login_logo}></Image>
    )
}