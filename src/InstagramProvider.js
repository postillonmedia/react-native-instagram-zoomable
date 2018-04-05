// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { Animated, StyleSheet, View } from 'react-native';

import type { Measurement } from './types/Measurement-type';
import {SelectedElement} from "./SelectedElement";


type SelectedElementType = {
    element: Object,
    measurement: Measurement;
};

type State = {
    selected?: SelectedElementType;
    isDragging: boolean;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export class InstagramProvider extends PureComponent {

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element),
        ]).isRequired,

        renderBackground: PropTypes.func,
    };

    static defaultProps = {};

    static childContextTypes = {
        isDragging: PropTypes.bool,
        onGestureStart: PropTypes.func,
        onGestureRelease: PropTypes.func,

        gesturePosition: PropTypes.object,
        scaleValue: PropTypes.object,
    };

    state: State;

    _scaleValue: Animated.Value;
    _gesturePosition: Animated.ValueXY;

    constructor() {
        super(...arguments);

        this._scaleValue = new Animated.Value(1);
        this._gesturePosition = new Animated.ValueXY();

        this.state = {
            isDragging: false,
        };
    }

    getChildContext() {
        const { isDragging } = this.state;

        return {
            isDragging: isDragging,
            onGestureStart: this.onGestureStart,
            onGestureRelease: this.onGestureRelease,

            gesturePosition: this._gesturePosition,
            scaleValue: this._scaleValue,
        };
    }

    onGestureStart = (selected) => {
        this.setState({
            selected,
            isDragging: true,
        });
    };

    onGestureRelease = () => {
        this.setState({
            isDragging: false
        });
    };

    renderSelectedElement = () => {
        const { renderBackground } = this.props;
        const { isDragging, selected } = this.state;

        if (isDragging) {
            return <SelectedElement selected={selected} renderBackground={renderBackground} />;
        } else {
            return null;
        }
    };

    render() {
        const { children } = this.props;

        return (
            <View style={styles.container}>
                {children}
                {this.renderSelectedElement()}
            </View>
        );
    }

}


export default InstagramProvider;