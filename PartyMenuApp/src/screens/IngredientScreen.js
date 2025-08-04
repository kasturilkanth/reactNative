// IngredientScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function IngredientScreen({ route }) {
  const { dish } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dish.name} - Ingredients</Text>
      <FlatList
        data={dish.ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  item: { padding: 10, backgroundColor: '#f9f9f9', borderBottomWidth: 1, borderBottomColor: '#ddd' }
});