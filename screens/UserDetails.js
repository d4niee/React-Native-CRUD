import React from 'react'
import { View, TextInput, Alert, StyleSheet, Text, Pressable } from "react-native"
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebase/firebase.config'

const UserDetails = ({route, navigation}) => {

    const [textName, onChangeNameText] = React.useState(route.params.item.name);
    const [textMail, onChangeMailText] = React.useState(route.params.item.mail);
    const [textPhone, onChangePhoneText] = React.useState(route.params.item.phone);
    const [textURL, onChangeURLText] = React.useState(route.params.item.pictureURL);

    async function UpdateUser() {
        const ref = doc(db, 'users', route.params.item.id)
        await updateDoc(ref, {
            name: textName,
            mail: textMail,
            phone: textPhone,
            pictureURL: textURL
        }).then(() => {
            navigation.navigate("Users List")
        }).catch((error) => {
            alert(error.message)
        })
    }

    /* inspired by: https://www.kindacode.com/article/how-to-create-a-confirm-dialog-in-react-native/ */
    const showConfirmDialog = () => {
        return Alert.alert(
          "Are your sure?",
          "Are you sure you want to Delete this User? This action cannot be undone!",
          [
            {
              text: "Yes",
              onPress: () => {
                  DeleteUser()
              },
            },
            {
              text: "No",
            },
          ]
        );
    };

    async function DeleteUser() {
        const ref = doc(db, 'users', route.params.item.id)
        await deleteDoc(ref)
        .then(() => {
            navigation.navigate("Users List")
            alert("Deleted User Successfully!")
        }).catch((error) => {
            alert(error.message)
        })
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeNameText}
                value={textName}
                placeholder="Name"/>
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeMailText}
                value={textMail}
                placeholder="Mail"/>
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangePhoneText}
                value={textPhone}
                placeholder="Phone"/>
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeURLText}
                value={textURL}
                placeholder="Profile Picture URL"/>
            <Pressable 
                style={styles.buttonUpdate}
                onPress={() => {UpdateUser()}}>
                <Text>UPDATE USER</Text>
                </Pressable>
            <Pressable
                style={styles.buttonDelete}
                onPress={() => {showConfirmDialog()}}>
                <Text>DELETE USER</Text>
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30
    },
    textfield: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: "#000000",
        backgroundColor: "#e0e0e0",
        borderRadius: 5
    },
    buttonUpdate: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#0de065',
    },
    buttonDelete: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        fontWeight: '800',
        backgroundColor: '#f24848',

    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
      },
});

export default UserDetails