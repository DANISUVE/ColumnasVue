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
        //Le asignamos la misma llave a la respuesta correcta
        questions: [{ key: 1, content: 'Gato' }, { key: 2, content: 'Delfín' }, { key: 3, content: 'Elefante' }],
        answers: [{ key: 2, content: 'Dolphin' }, { key: 3, content: 'Elephant' }, { key: 1, content: 'Cat' }],
        matched: [],
        firstClicked: null,
        secondClicked: null
    },
    methods: {
        clickedEvent: clickedEvent
    }
})


let columnsClicked = []
function clickedEvent(e) {
    columnsClicked.push({ elem: e[0], id: e[1] })
    elem1 = columnsClicked[0]
    elem2 = columnsClicked[1]
    if (columnsClicked.length < 3) {
        elem1.elem.style.backgroundColor = "forestgreen"
        if(columnsClicked.length === 2){
            if(elem1.id === elem2.id){
                elem2.elem.style.backgroundColor = "forestgreen"
            }
            else{
                elem2.elem.style.backgroundColor = "red"
            }
        }           
    } else {
        columnsClicked.map(column => {
            return column.elem.style.backgroundColor = "white"
        })
        columnsClicked = []
    }
    
}
