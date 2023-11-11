<script lang="ts">
    import BasilMoonOutline from '../components/icons/Moon.vue'
    import BasilGlobeOutline from '../components/icons/Globe.vue'

    export default {
        props: [],
        data: () => ({
        }),
        components: {
            MoonIcon: BasilMoonOutline,
            GlobeIcon: BasilGlobeOutline
        }
    }
</script>

<template>
    <div class="navbar">
        <!-- TODO: Logo component -->
        <div class="navbar__section align-left">
            <router-link to="/">
                <div class="flex flex-col logo">
                    <span class="text-xs text-neutral-600 logo__text-top">Budżet</span>
                    <span class="font-semibold font-slab text-green-600 logo__text-bottom">Osobisty</span>
                </div>
            </router-link>
        </div>

        <div class="navbar__section">
            <router-link to="/" class="navbar__link">Strona główna</router-link>
            <router-link to="/" class="navbar__link" >O projekcie</router-link>
            <router-link to="/" class="navbar__link" >Funkcje</router-link>
        </div>

        <div class="navbar__section align-right">
            <button class="navbar__icon-button"><GlobeIcon/></button>
            <button class="navbar__icon-button"><MoonIcon /></button>
            <router-link to="/login" class="navbar__button-primary" >Zaloguj się</router-link>
            <router-link to="/register" class="navbar__button-secondary" >Zarejestruj się</router-link>
        </div>
    </div>
</template>