import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, FlatList, Alert, SafeAreaView} from "react-native";
import firebase from "../../config/firebaseConfig";
import styles from  "./style";
import {FontAwesome} from "@expo/vector-icons";

export default function Accounts({ navigation, route}){

    const [task, setTask] = useState([]);
    
    const database = firebase.firestore();

    function logout(){
        firebase.auth().signOut().then(() => {
            navigation.navigate("Login");
          }).catch((error) => {
              console.log(error);
          });
    }

    function deleteAccount(id){
        database.collection(route.params.idUser).doc(id).delete();
    }

    useEffect(() => {
        database.collection(route.params.idUser).onSnapshot((query) => {
            let listAccounts = [];
            query.forEach((doc) => {
                listAccounts.push({...doc.data(), id: doc.id});
            })
            setTask(listAccounts);
        })
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    style={{marginRight:10}} 
                    onPress={() => Alert.alert(
                        'Mensagem',
                        'Deseja realmente sair?',
                        [
                          { text: 'Não', onPress: () => { return null } },
                          { text: 'Sim', onPress: () => { logout() } },
                        ],
                        { cancelable: false }
                      )}>                
                    <FontAwesome name="sign-out" size={25} color="#D9042B"></FontAwesome>
                </TouchableOpacity>
              ),
        });
    });

    return(

        <SafeAreaView style={styles.container}>
            
            <FlatList
               showsVerticalScrollIndicator={false}
               data={task}
               renderItem={({item})=>{
                   return (
                            <View style={styles.accounts}>                                    
                                    <Text 
                                        style={styles.nameAccount} 
                                        onPress={()=>{
                                            navigation.navigate("Detalhes", {id:item.id, 
                                                                            nameAccount: item.nameAccount,
                                                                            email: item.email, 
                                                                            password: item.password,  
                                                                            idUser: route.params.idUser})
                                        }
                                    }>
                                        {item.nameAccount}
                                    </Text>

                                    <TouchableOpacity 
                                        style={styles.deleteAccount} 
                                        onPress={() =>  Alert.alert('Mensagem', 'Deseja realmente deletar essa conta?',
                                                                        [
                                                                        { text: 'Não', onPress: () => { return null } },
                                                                        { text: 'Sim', onPress: () => { deleteAccount(item.id) } },
                                                                        ],
                                                                        { cancelable: false }
                                                                    )}
                                    >
                                        <FontAwesome name="trash" size={30} color="#D9042B"></FontAwesome>
                                    </TouchableOpacity>
                            </View>
                        );
               }}
            />

            <TouchableOpacity style={styles.buttonNewAccount} onPress={() => navigation.navigate("Nova Conta", {idUser: route.params.idUser})}>
                <FontAwesome name="plus" size={20} color="#FFFFFF"></FontAwesome>
            </TouchableOpacity>
        </SafeAreaView>
    );
}