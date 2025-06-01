import React from 'react';
import { View, StyleSheet } from 'react-native';

const Layout = ({ header, footer, children }) => {
    return (
        <View style={styles.container}>
            {header && <View style={styles.header}>{header}</View>}

            <View style={styles.content}>
                {children}
            </View>

            {footer && <View style={styles.footer}>{footer}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 16,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    footer: {
        padding: 16,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
    },
});

export default Layout;
