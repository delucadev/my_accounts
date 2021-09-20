import React,{useState, useEffect} from "react";
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView} from "react-native";
import firebase from "../../config/firebaseConfig";
import styles from "./style";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function Login({navigation}){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const loginFirebase = () => {
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            let user = userCredential.user;
            navigation.navigate("Minhas Contas", {idUser:user.uid});
        })
        .catch((error) => {
            setErrorLogin(true);
            let errorCode = error.code;
            let errorMessage = error.message;
        });
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate("Minhas Contas", {idUser: user.uid})
            }
          });
    }, []);

    return(
        <View style = {{flex:1}}>
            <SafeAreaView style={styles.container}>

                <Text style={styles.title}>My Accounts</Text>
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

                {errorLogin === true ?
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
                        style={styles.btnLogin}
                    >
                        <Text style={styles.textBtnLogin}>Acessar</Text>
                    </TouchableOpacity>

                :
                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={loginFirebase}
                    >
                        <Text style={styles.textBtnLogin}>Acessar</Text>

                    </TouchableOpacity>            
                }

                <Text style={styles.linkCad} onPress={()=>navigation.navigate("Novo Usuario")}>
                    Cadastre-se aqui                
                </Text>
            </SafeAreaView>
        </View>
    );
}