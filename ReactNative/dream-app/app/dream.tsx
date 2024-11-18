import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { supabase } from '../supabase/supabase';
interface DreamLog {
  username: string;
  input: string;
  output: string;
  date: string;
  time: string;
//   theme: string;
//   rating: number;
}
export default function DreamLogPage() {
  const [dreamLogs, setDreamLogs] = useState<DreamLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    getUsernameAndFetchDreams();
  }, []);
  // Function to fetch the signed-in user's username
  const getUsernameAndFetchDreams = async () => {
    setLoading(true);
    try {
      // Fetch the signed-in user from Supabase Auth
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error('Error fetching user:', userError);
        return;
      }
      // Fetch the username from the 'profiles' table
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();
      if (error || !data) {
        console.error('Error fetching username:', error);
        return;
      }
      const fetchedUsername = data.username;
      setUsername(fetchedUsername);
      // Fetch the dream logs for the signed-in user's username
      const { data: dreamData, error: dreamError } = await supabase
        .from('dream')
        .select('*')
        .eq('username', fetchedUsername)
        .order('date', { ascending: false });
      if (dreamError) {
        console.error('Error fetching dream logs:', dreamError);
        return;
      }
      if (dreamData) {
        setDreamLogs(dreamData);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };
  const renderDreamLog = ({ item }: { item: DreamLog }) => (
    <View style={styles.dreamLogContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.date}>{`${item.date} ${item.time}`}</Text>
      <Text style={styles.inputTitle}>Dream Input:</Text>
      <Text style={styles.input}>{item.input}</Text>
      <Text style={styles.outputTitle}>Interpretation:</Text>
      <Text style={styles.output}>{item.output}</Text>
    </View>
  );
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#C8A2C8" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Dream Log</Text>
      <FlatList
        data={dreamLogs}
        renderItem={renderDreamLog}
        keyExtractor={(item) => item.username}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  dreamLogContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C8A2C8',
    marginTop: 8,
  },
  input: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  outputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C8A2C8',
    marginTop: 8,
  },
  output: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  theme: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});