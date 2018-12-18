import React from "react";
import {
  Animated,
  FlatList,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity
} from "react-native";
import { Theme } from "../../uitls/theme";
import Icon from "react-native-vector-icons/Ionicons";
const KeyboardView = ({
  keyboardOnPress,
  pinLength,
  onComplete,
  bgColor,
  returnType,
  textColor,
  animatedDeleteButton,
  deleteText,
  animatedDeleteButtonOnPress,
  styles
}) => {
  const data = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "",
    "0",
    deleteText
  ];
  const renderItem = ({ item, index }) => {
    let style;
    let onPressActive;
    if (item === deleteText) {
      onPressActive = animatedDeleteButtonOnPress;
      style = [
        styles[0],
        {
          opacity: animatedDeleteButton
        }
      ];
    } else {
      onPressActive = false;
      style = [styles[0]];
    }
    return (
      <React.Fragment>
        {item === "" ? (
          <View
            style={{
              width: 80,
              height: 80,
              marginHorizontal: 10,
              marginVertical: 7
            }}
          />
        ) : (
          <React.Fragment>
            {item === deleteText ? (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  marginHorizontal: 10,
                  marginVertical: 7,
                  borderRadius: 40
                }}
                activeOpacity={0.85}
                onPress={() =>
                  keyboardOnPress(item, returnType, pinLength, onComplete)
                }
                disabled={onPressActive}
              >
                <Icon name={"ios-backspace"} size={28} color={"white"} />
              </TouchableOpacity>
            ) : (
              <TouchableHighlight
                underlayColor={Theme.colors.yellow}
                style={{
                  backgroundColor: "#373737",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  marginHorizontal: 10,
                  marginVertical: 7,
                  borderRadius: 40
                }}
                activeOpacity={0.85}
                onPress={() =>
                  keyboardOnPress(item, returnType, pinLength, onComplete)
                }
                disabled={onPressActive}
              >
                <Animated.View style={[style]}>
                  <Text
                    style={[
                      styles[1],
                      {
                        color: "white"
                      }
                    ]}
                  >
                    {item}
                  </Text>
                </Animated.View>
              </TouchableHighlight>
            )}
          </React.Fragment>
        )}
      </React.Fragment>

      //   <TouchableOpacity
      //   activeOpacity={0.85}
      //   onPress={() => keyboardOnPress(item, returnType, pinLength, onComplete)}
      //   disabled={onPressActive}
      // >
      //   <Animated.View
      //     style={[
      //       style,
      //       {
      //         backgroundColor: "#373737"
      //       }
      //     ]}
      //   >
      //     <Text
      //       style={[
      //         styles[1],
      //         {
      //           color: "white",
      //           opacity: 1
      //         }
      //       ]}
      //     >
      //       {item}
      //     </Text>
      //   </Animated.View>
      // </TouchableOpacity>
    );
  };
  return (
    <FlatList
      scrollEnabled={false}
      vertical={true}
      numColumns={3}
      renderItem={renderItem}
      data={data}
      keyExtractor={(val, index) => "pinViewItem-" + index}
    />
  );
};
export default KeyboardView;
