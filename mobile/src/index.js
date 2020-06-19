import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  const handleAddProject = async () => {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Gabriel Asakawa',
    });
    setProjects([...projects, response.data]);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({item: project}) => (
            <Text style={styles.project}>{project.title}</Text>
          )}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={handleAddProject}>
          <Text styles={styles.buttonText}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },

  project: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  button: {
    margin: 20,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
