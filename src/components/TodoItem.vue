<template>
	<div class="todo-item" :class="{ 'todo-item--completed': note.completed }">
		<span>
			<input
				class="todo-item__checkbox"
				type="checkbox"
				:checked="note.completed"
				@change.prevent="inboxChange(note.id)"
			/>
			<strong class="todo-item__index">{{ index }}</strong>
			<span class="todo-item__text">{{ note.title }}</span>
		</span>
		<button class="todo-item__delete" @click="removeTodo(note.id)">
			&times;
		</button>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
	note: Note;
	index: number;
}>();

type Note = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

const emit = defineEmits<{
	(e: 'remove-todo', id: number): void,
	(e: 'mark-complete', id: number): void,
}>();

const removeTodo = (id: number) => {
	emit('remove-todo', id);
};
const inboxChange = (id: number) => {
	emit('mark-complete', id);
};
</script>

<style>
.todo-item {
	border: 1px solid #ccc;
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 2rem;
	margin-bottom: 1rem;
}

.todo-item--completed .todo-item__text {
	text-decoration: line-through;
}

.todo-item__index::after {
	content: ' ';
}

.todo-item__delete {
	background: orangered;
	color: #fff;
	border-radius: 50%;
	font-weight: bold;
	width: 25px;
	height: 25px;
	margin: auto 0 auto 2rem;
}

.todo-item__checkbox {
	margin: auto 2rem auto 0;
}
</style>
