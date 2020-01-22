<template>
    <div>
        <h1>Search!</h1>
        <!-- <div v-for="item in items">
                <h3>{{items.name}}</h3> -->
        <product-list-one></product-list-one>
        <product-list-two></product-list-two>
    </div>
</template>

<script>
export default {
    name:'Search',
    props: ["items"],
    data () {
        return {
            
        }
    }
}
</script>
<style scoped>

</style>
