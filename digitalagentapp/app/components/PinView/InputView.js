import React from "react";
import { Animated } from "react-native";
import { Theme } from "../../uitls/theme";

const InputView = ({
  pinViewAnim,
  animatedInputIndex,
  pinLength,
  // bgColor,
  // activeBgColor,
  styles,
  // bgOpacity
}) => {
  const tilt = pinViewAnim.interpolate({
    inputRange: [0, 0.3, 0.6, 0.9],
    outputRange: [0, -50, 50, 0]
  });

  const inactiveInput = index => {
    return (
      <Animated.View
        key={"passwordItem-" + index}
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 12,
          margin: 12,
          width: 12,
          borderRadius: 6,
          borderWidth:1,
          borderColor: Theme.colors.gray74,
        }}
      />
    );
  };

  const activeInput = index => {
    return (
      <Animated.View
        key={"passwordItem-" + index}
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 12,
          margin: 12,
          width: 12,
          borderRadius: 6,
          backgroundColor:Theme.colors.yellow
        }}
      />
    );
  };
  const ShowInput = pinLength => {
    let table = [];
    {
      for (let i = 0; i < pinLength; i++) {
        if (animatedInputIndex[i] === undefined) {
          table.push(inactiveInput(i));
        } else {
          table.push(activeInput(i));
        }
      }
    }
    return table;
  };

  return (
    <Animated.View
      style={[
        styles[0],
        {
          transform: [{ translateX: tilt }]
        }
      ]}
    >
      {ShowInput(pinLength)}
    </Animated.View>
  );
};

export default InputView;