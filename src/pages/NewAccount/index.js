import React, {useState} from "react";
import {View, Text, TouchableOpacity, TextInput} from "react-native";
import firebase from "../../config/firebaseConfig";
import styles from "./style";
import {FontAwesome} from "@expo/vector-icons";

export default function NewAccount({navigation, route}){
    
    const  [nameAccount, setNameAccount] = useState(null);
    const  [email, setEmail] = useState(null);
    const  [password, setPassword] = useState(null);
    
    const database = firebase.firestore();

    function addAccount(){
        database.collection(route.params.idUser).add({
            nameAccount: nameAccount,
            email: email,
            password: password,
            status: false
        });
        navigation.navigate('Minhas Contas', {idUser: route.params.idUser})
        
    }
    return(
        <View style={styles.container}>
            <Text style={styles.label}>Nome Conta:</Text>
            <TextInput
                style = {styles.input}
                placeholder = "Ex.: Conta google"
                onChangeText = {setNameAccount}
                value={nameAccount}
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style = {styles.input}
                placeholder = "Ex.: seuemail@mail.com"
                onChangeText = {setEmail}
                value={email}
            />
            <Text style={styles.label}>Senha:</Text>
            <TextInput
                style = {styles.input}
                placeholder = "Ex.: 123456789"
                onChangeText = {setPassword}
                value={password}
            />
            <TouchableOpacity
                style={styles.btnNewAccount}
                onPress={()=>{
                    addAccount()
                }}
            >                
                <FontAwesome name="save" size={25} color="#FFFFFF"></FontAwesome>
            </TouchableOpacity>
        </View>
    );
}