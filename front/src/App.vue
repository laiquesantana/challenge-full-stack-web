<template>
  <v-app id="application" >
          <div id="app" :class="{'hide-menu': !isMenuVisible }">
  
    <Header :title="titulo"  :hideToggle="false"></Header>
    <Main></Main>  
    <Content></Content>
    <Footer></Footer>

               
  </div>
    </v-app>

</template>
<script>



import {mapState} from 'vuex'

export default {
    name: 'app',
    meta: {
      progress: {
        func: [
          {call: 'color', modifier: 'temp', argument: '#ffb000'},
          {call: 'fail', modifier: 'temp', argument: '#6e0000'},
          {call: 'location', modifier: 'temp', argument: 'top'},
          {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
        ]
      }
    },
    created() {


    },

     computed: mapState(['isMenuVisible']),

    data() {
      
        return {
            titulo: "Módulo Acadêmico"  ,
        }
    },

    methods: {
   
    },
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}
	body {
		margin: 0;
        
	}
	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer";
	}
	#app.hide-menu {
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}
  .v-application a {
    color: #e0e0e0 !important;
}
</style>

