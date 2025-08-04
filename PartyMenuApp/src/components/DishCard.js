// DishCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DishCard({ dish, isSelected, onToggle, onIngredientPress }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.desc}>{dish.description}</Text>
      <Text style={styles.type}>Type: {dish.type}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, isSelected ? styles.remove : styles.add]} onPress={onToggle}>
          <Text style={styles.buttonText}>{isSelected ? 'Remove' : 'Add'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onIngredientPress}>
          <Text style={styles.link}>View Ingredients</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 10, marginVertical: 5, borderRadius: 6, elevation: 2 },
  name: { fontWeight: 'bold', fontSize: 16 },
  desc: { fontSize: 12, color: '#555' },
  type: { fontSize: 12, marginTop: 5, color: '#888' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  button: { padding: 6, borderRadius: 4 },
  add: { backgroundColor: 'green' },
  remove: { backgroundColor: 'red' },
  buttonText: { color: '#fff' },
  link: { color: 'blue', textDecorationLine: 'underline' }
});