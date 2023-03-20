import React, { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from "@react-navigation/native";
import AppBar from "./AppBar";

type PageLayoutProps = PropsWithChildren<{}>

function PageLayout({ children }: PageLayoutProps): JSX.Element {
    const route = useRoute();

    return (
        <SafeAreaView>
            <AppBar title={route.name} />
            <ScrollView style={styles.scrollView}>
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        padding: 10
    }
})

export default PageLayout;