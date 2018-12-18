import React from 'react';
import { View, StyleSheet } from 'react-native';
import Checkbox from "./Checkbox";
const Complaint = ({
  staffIncompetence,
  waitTime,
  terribleWaitRoom,
  invalid,
  checkBoxPress,
}) => {
  return (
    <View style={styles.container}>
        <Checkbox 
            title="Некомпетентность персонала"
            checked={staffIncompetence}
            onChange={() => checkBoxPress(staffIncompetence, "Некомпетентность персонала")}/>
        <Checkbox 
            title="Время ожидания в очереди"
            checked={waitTime}
            onChange={() => checkBoxPress(waitTime, "Время ожидания в очереди")}/>
        <Checkbox 
            title="Ужасные условия в зале ожидания"
            checked={terribleWaitRoom}
            onChange={() => checkBoxPress(terribleWaitRoom, "Ужасные условия в зале ожидания")}/>
        <Checkbox 
            title="Отсутствие условий для лиц с ограниченными возможностями"
            checked={invalid}
            onChange={() => checkBoxPress(invalid,"Отсутствие условий для инвалидов")}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:10,
    marginHorizontal:'3%'
  }
});
export default Complaint;