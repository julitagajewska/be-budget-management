<script>
import Header from '../components/header/Header.vue';
import ContainerPage from '../components/containers/ContainerPage.vue';
import ContainerRowStart from '../components/containers/ContainerRowStart.vue';
import ContainerRowBetween from '../components/containers/ContainerRowBetween.vue';
import ContainerColumnStartLeft from '../components/containers/ContainerColumnStartLeft.vue';

export default {
  components: {
    Header,
    ContainerPage,
    ContainerRowStart,
    ContainerRowBetween,
    ContainerColumnStartLeft,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <ContainerPage>
    <Header />
    <ContainerRowBetween>
      <ContainerColumnStartLeft>
        <h1>Nazwa aplikacji</h1>
        <h3>Podtytuł</h3>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>

        <ContainerRowStart>
          <button>Zaloguj się</button>
          <button>Stwórz konto</button>
        </ContainerRowStart>
      </ContainerColumnStartLeft>

      <ContainerColumnStartLeft>
        <div class="w-64 h-64 bg-blue-400"></div>
      </ContainerColumnStartLeft>
    </ContainerRowBetween>
  </ContainerPage>
</template>
