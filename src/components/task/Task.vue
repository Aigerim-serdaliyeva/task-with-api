<template>
    <div class="card" style="width: 18rem; margin-bottom: 20px">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">{{ getSeventySymbolText }}</p>
            <router-link 
                :to="{ name: 'details', params: { id: id } }"
                tag="button" 
                class="btn btn-outline-primary" 
            >
                Просмотреть
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {

        title: {
            type: String,
            default: ''
        },

        text: {
            type: String,
            default: ''
        },

        id: {
            type: Number
        }
    },
    computed: {
        getSeventySymbolText() {
            if(this.text.length > 70) {
                return this.text.slice(0, 70) + '...'
            }
            return this.text
        }
    }
}
</script>