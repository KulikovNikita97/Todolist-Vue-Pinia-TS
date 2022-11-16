import { defineStore } from "pinia";

export const useTodoListStore = defineStore('todoList', {
	state: () => ({
		todos: [] as {
			userId: number;
			id: number;
			title: string;
			completed: boolean;
		}[],
	}),
	actions: {
		async getDataFromServer() {
			// await
			const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
			this.todos = await response.json();
		},
		addNewTodo(text: string) {
			this.todos.push({
				userId: 1,
				// id - уникальны и постоянны - DDD
				id: this.todos.reduce((maxId, todo) => todo.id > maxId ? todo.id : maxId, 1) + 1,
				title: text,
				completed: false,
			});
		},
		removeTodo(id: number) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
		},
		markComplete(id: number) {
			// this.todos[id - 1].completed = !this.todos[id - 1].completed;
			const todoToMark = this.todos.find((todo) => todo.id === id);
			if (!todoToMark) return; // или выкинуть исключение
			todoToMark.completed = !todoToMark.completed;
		},
	},
});
