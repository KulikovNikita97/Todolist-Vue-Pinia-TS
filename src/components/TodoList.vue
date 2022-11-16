<template>
	<div>
		<ul class="todo-list">
			<li class="todo-list__item" :class="{ 'todo-list__item--completed': note.completed }">
				<span>
					<input
						type="checkbox"
						@change="inboxChange(note.id)"
						v-if="note.completed"
						checked
						class="todo-list__checkbox"
					/>
					<input
						type="checkbox" 
						@change="inboxChange(note.id)" 
						v-else
						class="todo-list__checkbox"
					/>
					<strong>{{ index }}</strong>
					{{ note.title }}
				</span>
				<!-- delete note button -->
				<button class="todo-list__delete" @click="removeTodo(note.id)">
					&times;
				</button>
			</li>
		</ul>
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
.todo-list {
	list-style: none;
	margin: 0;
	padding: 0;
}

.todo-list__item {
	border: 1px solid #ccc;
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 2rem;
	margin-bottom: 1rem;
}

.todo-list__item--completed {
	text-decoration: line-through;
}

.todo-list__delete {
	background: orangered;
	color: #fff;
	border-radius: 50%;
	font-weight: bold;
	width: 25px;
	height: 25px;
	margin: auto 0 auto 2rem;
}

.todo-list__checkbox {
	margin: auto 2rem auto 0;
}
</style>
