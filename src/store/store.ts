import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
	state: () => {
		const todos: {
			userId: number;
			id: number;
			title: string;
			completed: boolean;
		}[] = [];
		return { todos };
	},
	getters: {
		getTodos: (state) => {
			return state.todos;
		},
	},
	actions: {
		//server data
		getDataFromServer() {
			fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
				.then((response) => response.json())
				.then((json) => {
					//console.log(json);
					this.todos = json;
				});
		},
		//button "create" click action
		addNewTodo(text: string) {
			this.todos.push({
				userId: 1,
				id: this.todos?.length + 1,
				title: text,
				completed: false,
			});
		},
		//button "delete" click action
		removeTodo(id: number) {
			this.todos.splice(id - 1, 1);
			for (let i = id; i <= this.todos.length; i++) {
				this.todos[i - 1].id--;
			}
		},
		//inboxes true/false click action
		markComplete(id: number) {
			this.todos[id - 1].completed = !this.todos[id - 1].completed;
		},
	},
});
