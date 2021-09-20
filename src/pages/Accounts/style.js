import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#F2F2F2",
        paddingTop: 20
    },
    buttonNewAccount:{
        width: 60,
        height: 60, 
        position: "absolute",
        bottom: 30, 
        right:30,
        backgroundColor: "#D9042B",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    accounts:{
        width: "100%",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop: 10,
        // backgroundColor: "#000"
    },
    deleteAccount:{
        width: "10%",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
        borderRadius: 10,
        backgroundColor: "#D8D6D5AB",
    },
    nameAccount:{
        width: "80%",
        height: "100%",
        alignContent: "flex-start",
        backgroundColor: "#D8D6D5AB",
        padding: 12,
        borderRadius: 10,
        marginBottom: 5,
        marginLeft:15,
        color: "#2b2b2da5"
    }
});

export default styles;