Vue.component('column-element', {
    props: ['element'],
    template: `
    <div
        class='column-element'
        v-html='element.content'
        v-bind:id="\`el-\${element.key}\`"
        @click='$emit("clicked", [$event.target,element.key])'
    ></div>` // Ni moverle al v-bidn:id sin entender por que se esta escapando cada parte
})

Vue.component('column', {
    props: ['things'],
    template: `
    <div class='column'>
        <column-element
            v-for='thing in things'
            v-bind:key='thing.key'
            v-bind:element='thing'
            @clicked='$emit("clicked", arguments[0])'
        ></column-element>
    </div>
    `
})

let app = new Vue({
    el: '#container',
    data: {
        questions: [{ key: 1, content: 'Gato' }, { key: 2, content: 'Delfín' }, { key: 3, content: 'Elefante' }],
        answers: [{ key: 4, content: 'Dolphin' }, { key: 4, content: 'Elephant' }, { key: 5, content: 'Cat' }],
        matched: [],
        firstClicked: null,
        secondClicked: null
    },
    methods: {
        clickedEvent: clickedEvent
    }
})

let cosasPresionadas = []
// Querán redefinir esto desde 0, para que no se pierdan.
function clickedEvent(e) {
    cosasPresionadas.push({ elem: e[0], id: e[1] })
    if (cosasPresionadas.length < 3) {
        cosasPresionadas.map(column => {
            return column.elem.style.backgroundColor = "blue"
        })
    } else {
        cosasPresionadas.map(column => {
            return column.elem.style.backgroundColor = "white"
        })
        cosasPresionadas.length = 0
    }
}
