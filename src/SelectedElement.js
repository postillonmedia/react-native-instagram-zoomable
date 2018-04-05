// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { Animated, StyleSheet, View } from 'react-native';


const styles = StyleSheet.create({
    root: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
    },
});

export class SelectedElement extends PureComponent {

    static propTypes = {
        selected: PropTypes.object,
        renderBackground: PropTypes.func,
    };

    static defaultProps = {};

    static contextTypes = {
        gesturePosition: PropTypes.object,
        scaleValue: PropTypes.object,
    };

    constructor() {
        super(...arguments);
    }

    renderBackground = (selected, scaleValue, gesturePosition) => {
        let backgroundOpacityValue = scaleValue.interpolate({
            inputRange: [1.2, 3],
            outputRange: [0, 0.6],
        });

        return (
            <Animated.View
                style={[
                    styles.background,
                    {
                        opacity: backgroundOpacityValue,
                    },
                ]}
            />
        );
    };

    render() {
        let { selected, renderBackground = this.renderBackground } = this.props;
        let { gesturePosition, scaleValue } = this.context;

        let animatedStyle = {
            transform: gesturePosition.getTranslateTransform(),
        };
        animatedStyle.transform.push({
            scale: scaleValue,
        });

        let elementStyle = [
            {
                position: 'absolute',
                zIndex: 10,
                width: selected.measurement.w,
                height: selected.measurement.h,
            },
            animatedStyle,
        ];

        let children = selected && selected.element && selected.element.props && selected.element.props.children;

        return (
            <View style={styles.root}>
                { renderBackground(selected, scaleValue, gesturePosition) }
                <Animated.View style={elementStyle}>
                    { children }
                </Animated.View>
            </View>
        );
    }

}