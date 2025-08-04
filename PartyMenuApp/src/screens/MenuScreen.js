// MenuScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Button, ScrollView } from 'react-native';
import DishCard from '../components/DishCard';
import dishesData from '../data/dishes.json';

const MEAL_TYPES = ['STARTER', 'MAIN COURSE', 'DESSERT', 'SIDES'];
const FILTERS = ['VEG', 'NON-VEG'];

export default function MenuScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('STARTER');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ VEG: true, 'NON-VEG': true });
  const [selectedDishes, setSelectedDishes] = useState([]);

  const toggleFilter = (type) => {
    setFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const toggleDish = (id) => {
    setSelectedDishes(prev => prev.includes(id)
      ? prev.filter(d => d !== id)
      : [...prev, id]);
  };

  const filteredDishes = dishesData.filter(d =>
    d.mealType === selectedTab &&
    filters[d.type] &&
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const countByCategory = MEAL_TYPES.reduce((acc, type) => {
    acc[type] = dishesData.filter(d => d.mealType === type && selectedDishes.includes(d.id)).length;
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.tabBar}>
        {MEAL_TYPES.map(type => (
          <TouchableOpacity key={type} onPress={() => setSelectedTab(type)} style={[styles.tab, selectedTab === type && styles.activeTab]}>
            <Text style={styles.tabText}>{type} ({countByCategory[type] || 0})</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TextInput
        placeholder="Search dishes..."
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filters}>
        {FILTERS.map(type => (
          <Button key={type} title={type} color={filters[type] ? 'green' : 'gray'} onPress={() => toggleFilter(type)} />
        ))}
      </View>

      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DishCard
            dish={item}
            isSelected={selectedDishes.includes(item.id)}
            onToggle={() => toggleDish(item.id)}
            onIngredientPress={() => navigation.navigate('Ingredient', { dish: item })}
          />
        )}
      />

      <View style={styles.summary}>
        <Text>Total Selected: {selectedDishes.length}</Text>
        <Button title="Continue" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  tabBar: { flexDirection: 'row', marginBottom: 10 },
  tab: { padding: 10, marginRight: 5, backgroundColor: '#eee', borderRadius: 5 },
  activeTab: { backgroundColor: '#4caf50' },
  tabText: { color: '#000' },
  searchBar: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 5, marginBottom: 10 },
  filters: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }
});