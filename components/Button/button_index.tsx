import { Text, TouchableOpacity } from "react-native";
import { styles_button } from "./button_styles";

export  function Button(){
    return(
        <TouchableOpacity style={styles_button.Button}>
            <Text style={styles_button.Text}>Login</Text>
        </TouchableOpacity>
    )
}