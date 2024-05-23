<template>
    <div class="todo-list">
        <h1>Todo List</h1>
        <form @submit.prevent="addTodo">
            <input v-model="newTodoLabel" placeholder="Label" required />
            <input v-model="newTodoDescription" placeholder="Description" required />
            <button type="submit">Add Todo</button>
        </form>
        <ul>
            <li v-for="todo in todos" :key="todo.id">
                <h2>{{ todo.label }}</h2>
                <p>{{ todo.description }}</p>
                <button @click="deleteTodo(todo.id)">Delete</button>
                <button @click="toggleEdit(todo)">Edit</button>
                <div v-if="todo.isEditing">
                    <input v-model="todo.label" />
                    <input v-model="todo.description" />
                    <button @click="updateTodo(todo)">Save</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default {
    data() {
        return {
            todos: [],
            newTodoLabel: '',
            newTodoDescription: ''
        };
    },
    methods: {
        async fetchTodos() {
            const querySnapshot = await getDocs(collection(db, "todos"));
            this.todos = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, isEditing: false }));
        },
        async addTodo() {
            if (this.newTodoLabel && this.newTodoDescription) {
                const docRef = await addDoc(collection(db, "todos"), {
                    label: this.newTodoLabel,
                    description: this.newTodoDescription
                });
                this.todos.push({ id: docRef.id, label: this.newTodoLabel, description: this.newTodoDescription, isEditing: false });
                this.newTodoLabel = '';
                this.newTodoDescription = '';
            }
        },
        async deleteTodo(id) {
            await deleteDoc(doc(db, "todos", id));
            this.todos = this.todos.filter(todo => todo.id !== id);
        },
        toggleEdit(todo) {
            todo.isEditing = !todo.isEditing;
        },
        async updateTodo(todo) {
            await updateDoc(doc(db, "todos", todo.id), {
                label: todo.label,
                description: todo.description
            });
            todo.isEditing = false;
        }
    },
    mounted() {
        this.fetchTodos();
    }
};
</script>

<style scoped>
.todo-list {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: black;
}
</style>