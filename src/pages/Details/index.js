import React,{useState} from "react";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import firebase from "../../config/firebaseConfig";
import styles from "./style";
import {FontAwesome} from "@expo/vector-icons";

export default function Details({navigation, route}){
    
    const [nameAccountEdit, setNameAccountEdit] = useState(route.params.nameAccount);
    const [emailEdit, setEmailEdit] = useState(route.params.email);
    const [passwordEdit, setPasswordEdit] = useState(route.params.password);

    const idAccount = route.params.id;

    const database = firebase.firestore();
    
    function editAccount(obj, id){
        database.collection(route.params.idUser).doc(id).update({
            nameAccount: obj.nameAccountEdit,
            email: obj.emailEdit,
            password: obj.passwordEdit
        });
        navigation.navigate("Minhas Contas", {idUser: route.params.idUser})
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Nome Conta:</Text>
            <TextInput
                style = {styles.input}
                placeholder = "Ex.: Conta Google"
                onChangeText = {setNameAccountEdit}
                value={nameAccountEdit}
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style = {styles.input}
                placeholder = "Ex.: seuemail@email.com"
                onChangeText = {setEmailEdit}
                value={emailEdit}
            />
            <Text style={styles.label}>Senha:</Text>
            <TextInput
                style = {styles.input}
                placeholder = "Ex.: 12345678"
                onChangeText = {setPasswordEdit}
                value={passwordEdit}
            />
            <TouchableOpacity
                style={styles.btnNewAccount}
                onPress={()=>{
                    editAccount({nameAccountEdit, emailEdit, passwordEdit}, idAccount)
                }}
            >                
                <FontAwesome name="save" size={25} color="#FFFFFF"></FontAwesome>
            </TouchableOpacity>
        </View>
    );
}