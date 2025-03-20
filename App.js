import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

// Función para calcular cuántas tarjetas por fila según el ancho
const getColumns = (width) => {
  if (width > 900) return 3; // 3 tarjetas por fila
  if (width > 600) return 2; // 2 tarjetas por fila
  return 1; // 1 tarjeta por fila
};

export default function App() {
  const [columns, setColumns] = useState(getColumns(Dimensions.get('window').width));

  useEffect(() => {
    const updateLayout = () => {
      setColumns(getColumns(Dimensions.get('window').width));
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription?.remove();
  }, []);

  const items = ['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4', 'Elemento 5', 'Elemento 6'];
  const cardWidth = `${100 / columns - 5}%`; // Ajuste dinámico del ancho

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <View key={index} style={[styles.card, { flexBasis: cardWidth }]}>
            <Text style={styles.cardText}>{item}</Text>
          </View>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
