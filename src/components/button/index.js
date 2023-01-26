import { Text } from "react-native"
import { TouchableOpacity } from "react-native-web"
import style from "./style"

const Button = (props) => {
  <TouchableOpacity style={style.container}>
    <Text>{props.text}</Text>
  </TouchableOpacity>
}

export default Button;