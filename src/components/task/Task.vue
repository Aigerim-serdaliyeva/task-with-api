<template>
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="..." alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">{{ text }}</p>
            <router-link 
                class="btn btn-primary"
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
        }
    }
}
</script>