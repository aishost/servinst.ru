<template id="slider">
    <ol>
        <li v-for="todo in todos">
            {{ todo.text }}
        </li>
    </ol>
</template>

<script>
  Vue.component('slider', {
    template: '#slider',
    data: function () {
      return {
        todos: [
          {text: 'Изучить JavaScript'},
          {text: 'Изучить Vue'},
          {text: 'Создать что-нибудь классное'}
        ]
      }
    }
  })
</script>