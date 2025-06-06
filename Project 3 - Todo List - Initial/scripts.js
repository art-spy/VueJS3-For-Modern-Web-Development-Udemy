todos = [
    {
        text: 'Complete Vue JS Challenge with excellence',
        done: true
    },
    {
        text: 'Learn the basics of Vue JS',
        done: false
    }
]

const todosApp = {

    data() {
        return {
            /* todos: [] */
            todos: window.todos,
            /* die Eigenschaften müssen hier nicht extra aufgelistet werden */
            newTodo: {
                done: false
            }
        }
    },
    methods: {
        addTodo() {
            if (this.newTodo.text) {
                this.todos.push(this.newTodo);
                this.newTodo = {done: false};
                localStorage.setItem("todos", JSON.stringify(this.todos));
            } else {
                alert('Please enter a new ToDo');
            }

        },
        clearAllTodos() {
            this.todos = [];
        }
    },
    beforeCreate() {
        console.log('before create this.totos: ', this.todos);
    },
    created() {
        this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : this.todos;
        console.log('created this.totos: ', this.todos);
    },
    // beforeUpdate() {
    //     console.log('before update this.totos:', this.todos);
    // },
    updated() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
        console.log('updated this.totos:', this.todos);
    },
    afterUpdate() {
        console.log('after update:', this.todos);
    }
}

Vue.createApp(todosApp).mount('#app');