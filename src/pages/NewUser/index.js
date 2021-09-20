import React,{useState, useEffect} from "react";
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView} from "react-native";
import firebase from "../../config/firebaseConfig";
import styles from "./style";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function NewUser({navigation}){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorCad, setErrorCad] = useState("");

    const registerFirebase = () => {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            let user = userCredential.user;
            navigation.navigate("Minhas Contas", {idUser:user.uid});
        })
        .catch((error) => {
            setErrorCad(true);
            let errorCode = error.code;
            let errorMessage = error.message;
        });

    }

    return(
        <View style={{flex:1}}>
            <SafeAreaView style = {styles.container}>
                <Text style={styles.title}>Criar Conta</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Entre com seu email"
                    keyboardType="email-address"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Entre com sua senha"
                    onChangeText={(text) => setSenha(text)}
                    value={senha}
                />

                {errorCad === true ?
                    <View style={styles.alertContent}>
                        <MaterialCommunityIcons
                            name="alert-circle"
                            size={24}
                            color="#bdbdbd"
                        />
                        <Text style={styles.warningAlert}>Email ou senha inválidos.</Text>
                    </View>

                :
                    <View/>

                }

                {email === "" || senha === "" ?
                    <TouchableOpacity
                        disabled={true}
                        style={styles.btnCad}
                    >
                        <Text style={styles.textBtnCad}>Cadastrar</Text>
                    </TouchableOpacity>

                :
                    <TouchableOpacity
                        style={styles.btnCad}
                        onPress={registerFirebase}
                    >
                        <Text style={styles.textBtnCad}>Cadastrar</Text>

                    </TouchableOpacity>            
                }

                <Text style={styles.linkVoltar} onPress={()=>navigation.navigate("Login")}>
                    Já tenho cadastro                
                </Text>

            </SafeAreaView>
        </View>
        
    );
}