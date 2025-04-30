

import { StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput, Button, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import service from './service';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const storedTasks = await service.getTasks();
                setTasks(storedTasks);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async () => {
        try {
            const newTaskObject = await service.addTask(newTask);
            setTasks(prevTasks => [...prevTasks, newTaskObject]);
            setNewTask(""); // לנקות את שדה הקלט
            Toast.show({
                text1: 'The task was added successfully.',
                text2: 'Will update when you successfully complete it!!',
                position: 'bottom',
                type: 'success',
                visibilityTime: 3000,
            });
        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    const updateCompleted = async (id) => {
        await service.updateTaskCompletion(id);
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, isComplete: !task.isComplete } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = async (id) => {
        await service.deleteTask(id);
        const filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error loading tasks: {error.message}</Text>;
    }
    return (
        <ScrollView style={styles.container}>

            <TextInput
                placeholder="Add a new task"
                value={newTask}
                onChangeText={setNewTask}
                style={styles.input}
            />
            <Button title="Add Task" onPress={addTask} style={styles.addButton} />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text style={{ textDecorationLine: item.isComplete ? 'line-through' : 'none' }}>{item.name}</Text>
                        <TouchableOpacity onPress={() => updateCompleted(item.id)}>
                            <Icon name={item.isComplete ? "check-circle" : "circle-thin"} size={20} color="blue" />
                        </TouchableOpacity>
                        <Pressable onPress={() => deleteTask(item.id)}>
                            <Icon name="trash" size={20} color="red" />
                        </Pressable>
                    </View>
                )}
                scrollEnabled={false} // Disable FlatList scrolling to allow ScrollView to handle it
                contentContainerStyle={{ flexGrow: 1 }}
            />
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </ScrollView>
    )

};

export default TaskList;

const styles = StyleSheet.create({
    taskItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        margin: 10,
        borderColor: '#ccc',
    },
    addButton: {
        position: 'absolute',
        bottom: 20, 
        right: 20, // מרחק מהצד הימני של המסך
    },
    container: {
        flex: 1, // מאפשר לקומפוננטה לתפוס את כל שטח המסך
        padding: 15, // הוספת רווחים
        backgroundColor: '#fff', // צבע רקע
    },
    touchableText: {
        color: 'blue', // צבע טקסט ללחיצה עבור TouchableOpacity
        padding: 10,
    },
    pressableText: {
        color: 'red', // צבע טקסט ללחיצה עבור Pressable
        padding: 10,
    },
});
