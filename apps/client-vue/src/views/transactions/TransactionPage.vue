<script lang="ts">
    export default {
        props: ['id'],
        data: () => ({

        }),
        name: "TransactionPage"
    }
</script>

<template>
    <div class="bg-green-300 text-black">
        <h1>Transaction</h1>
        <span>ID: {{ $route.params.id }}</span>
    </div>
</template>