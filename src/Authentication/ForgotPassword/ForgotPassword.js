import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Alert } from "react-native";
import { Button } from "../../Components";
import {
    Header,
    KeyboardAwareView,
    ForgotPasswordSchema,
    CustomTextInput,
} from "../Components";
import { Formik } from "formik";

const ForgotPassword = ({ navigation }) => {
    const handleForgotPassword = (values, navigation) => {
        const { email } = values;
        fetch("http://3.21.245.113:8000/account/codesend", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.hasOwnProperty("message")) {
                    Alert.alert("전송 완료", "이메일로 코드가 전송되었습니다.");
                    navigation.navigate("CheckCode", { email });
                }
                console.log(response);
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <KeyboardAwareView>
                <View style={styles.inner}>
                    <Text style={styles.title}>비밀번호를 잊어버렸나요?</Text>
                    <Text style={styles.description}>
                        회원가입에 이용한 이메일 주소를 입력해주세요.
                    </Text>
                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={ForgotPasswordSchema}
                        onSubmit={(values) =>
                            handleForgotPassword(values, navigation)
                        }
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                        }) => (
                            <View style={{ alignItems: "center" }}>
                                <CustomTextInput
                                    iconName="email-outline"
                                    placeholder="이메일"
                                    autoCompleteType="email"
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    touched={touched.email}
                                    error={errors.email}
                                />
                                <Button
                                    variant="primary"
                                    label="비밀번호 재설정"
                                    onPress={handleSubmit}
                                    style={{ marginTop: 24 }}
                                />
                            </View>
                        )}
                    </Formik>
                </View>
            </KeyboardAwareView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: { flex: 1, alignItems: "center", justifyContent: "center" },
    title: {
        fontFamily: "SFPro-Text-Semibold",
        fontSize: 24,
        lineHeight: 30,
        marginBottom: 24,
        color: "#2c2c2c",
    },
    description: {
        fontFamily: "SFPro-Text-Regular",
        fontSize: 14,
        color: "#AAA",
    },
});

export default ForgotPassword;
