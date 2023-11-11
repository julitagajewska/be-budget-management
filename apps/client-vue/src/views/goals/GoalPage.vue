<script lang="ts">
    export default {
        props: ['id'],
        data: () => ({

        })
    }
</script>

<template>
    <div class="bg-green-300 text-black">
        <h1>Goal</h1>
        <span>ID: {{ id }}</span>
    </div>
</template>