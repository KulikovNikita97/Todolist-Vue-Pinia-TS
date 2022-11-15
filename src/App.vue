<template>
	<div id="app">
		<h1>Notes</h1>
		<form @submit.prevent="onSubmit">
			<input type="text" placeholder="insert your text" v-model="text" />
			<button type="submit">Create</button>
		</form>
		<hr />
		<TodoList
			v-for="note in getTodos"
			v-bind:key="note.id"
			:note="note"
			@removeTodo="removeTodo"
			@markComplete="markComplete"
		/>
	</div>
</template>

<script lang="ts">
import TodoList from "@/components/TodoList.vue";
import { useCounterStore } from "@/store/store";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			text: "",
		};
	},
	methods: {
		onSubmit() {
			if (this.text !== "") {
				this.addNewTodo(this.text);
				this.text = "";
			}
		},
	},
	mounted() {
		this.getDataFromServer();
	},
	components: { TodoList },
	setup() {
		const store = useCounterStore();
		const { getTodos } = storeToRefs(store);
		const { addNewTodo, removeTodo, markComplete } = store;
		const { getDataFromServer } = store;

		return {
			getTodos,
			addNewTodo,
			removeTodo,
			markComplete,
			getDataFromServer,
		};
	},
});
</script>

<style scoped>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

form {
	display: flex;
	justify-content: center;
	padding-bottom: 1rem;
}

input {
	width: 400px;
}
</style>
