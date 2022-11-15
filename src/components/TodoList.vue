<template>
	<div>
		<ul>
			<li>
				<span v-bind:class="{ done: note.completed }">
					<!-- inboxes true/false -->
					<input
						type="checkbox"
						v-on:change="inboxChange(note.id)"
						v-if="note.completed"
						checked
					/>
					<input 
						type="checkbox" 
						v-on:change="inboxChange(note.id)" 
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
				<button class="button" v-on:click="$emit('remove-todo', note.id)">
					&times;
				</button>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
export default {
	props: ["note"],

	methods: {
		removeTodo(id: number) {
			this.$emit("remove-todo", id);
		},
		inboxChange(id: number) {
			this.$emit("markComplete", id);
		},
	},
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
