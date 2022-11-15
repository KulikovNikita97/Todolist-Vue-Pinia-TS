<template>
	<div>
		<ul>
			<li>
				<span v-bind:class="{ done: note.completed }">
					<!-- inboxes true/false -->
					<input
						type="checkbox"
						@change="inboxChange(note.id)"
						v-if="note.completed"
						checked
					/>
					<input
						type="checkbox" 
						@change="inboxChange(note.id)" 
						v-else 
					/>
					<!-- note number -->
					<strong>
						{{ note.id }}
					</strong>
					<!-- note text -->
					{{ note.title }}
				</span>
				<!-- delete note button -->
				<button class="button" @click="removeTodo(note.id)">
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

<style scoped>
ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

li {
	border: 1px solid #ccc;
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 2rem;
	margin-bottom: 1rem;
}

.button {
	background: orangered;
	color: #fff;
	border-radius: 50%;
	font-weight: bold;
	width: 25px;
	height: 25px;
	margin: auto 0 auto 2rem;
}

input {
	margin: auto 2rem auto 0;
}

.done {
	text-decoration: line-through;
}
</style>
