import React from 'react';
import { Appbar } from 'react-native-paper';

type AppBarProps = {
    title: string;
}

const AppBar = ({ title }: AppBarProps) => {
    return (
        <Appbar.Header>
            <Appbar.Content title={title} />
        </Appbar.Header>
    )
};

export default AppBar;