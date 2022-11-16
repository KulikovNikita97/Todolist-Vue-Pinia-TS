<template>
	<div class="app">
		<h1>Notes</h1>
		<form class="app__form" @submit.prevent="onSubmit">
			<input class="app__input" type="text" placeholder="insert your text" v-model="text" />
			<button type="submit">Create</button>
		</form>
		<hr />
		<TodoList
			v-for="(note, index) in store.todos"
			:key="note.id"
			:note="note"
			:index="index + 1"
			@removeTodo="removeTodo"
			@markComplete="markComplete"
		/>
	</div>
</template>

<script setup lang="ts">
import TodoList from "@/components/TodoList.vue";
import { useTodoListStore } from "@/store/todoList";
import { onMounted, ref } from "vue";

const text = ref('');

const onSubmit = () => {
	if (text.value !== '') {
		addNewTodo(text.value);
		text.value = '';
	}
};

onMounted(async () => {
	await getDataFromServer();
});

const store = useTodoListStore();
const { addNewTodo, removeTodo, markComplete } = store;
const { getDataFromServer } = store;
</script>

<style>
.app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	padding-top: 60px;
}

.app__form {
	display: flex;
	justify-content: center;
	padding-bottom: 1rem;
}

.app__input {
	width: 400px;
}
</style>
