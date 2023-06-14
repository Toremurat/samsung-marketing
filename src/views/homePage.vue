<template>
  <div>
    <h1>Список акций</h1>
    <ul class="list-unstyled promoChange">
      <li class="promoBtn"><a href="" @click.prevent="promoCurrent()" class="promoArea" :class="{active: curPromo}">show current</a></li>
      <li class="promoBtn"><a href="" @click.prevent="promoFuture()" class="promoArea" :class="{active: futurePromo}">show future</a></li>
      <li class="promoBtn"><a href="" @click.prevent="promoPast()" class="promoArea" :class="{active: pastPromo}">show past</a></li>
    </ul>
    <div class="promoWrapper row">
      <promosList promo-status="current" v-if="curPromo" />
      <promosList promo-status="future" v-if="futurePromo" />
      <promosList promo-status="past" v-if="pastPromo" />
    </div>
  </div>
</template>
<script>
import promosList from '@/components/promosList.vue'

export default {
  name: 'homePage',
  components: {
    promosList
  },
  data() {
    return {
      userName: '',
      userAge: 18,
      curPromo: true,
      futurePromo: false,
      pastPromo: false,
    }
  },
  methods: {
    promoCurrent() {
      this.curPromo = true
      this.futurePromo = false
      this.pastPromo = false
    },
    promoFuture() {
      this.curPromo = false
      this.futurePromo = true
      this.pastPromo = false
    },
    promoPast() {
      this.curPromo = false
      this.futurePromo = false
      this.pastPromo = true
    }
  }
}
</script>
<style scoped>
a.active{
  color:red
}
.list-unstyled.promoChange {
  display: flex;
  -webkit-flex-flow: row nowrap;
  column-gap: 30px;
  margin: 0 0 40px;
}

.list-unstyled.promoChange .promoArea {
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  color: #000000;
  text-decoration: none;
  position: relative;
}

.list-unstyled.promoChange .promoArea.active {
  color: #2189FF;
}

.list-unstyled.promoChange .promoArea.active:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 2px;
  background: #2189ff;
  transition: ease all 0.45s;
}

.list-unstyled.promoChange .promoArea:before {
  width: 0;
  left: 50%;
}
h1 {
  font-weight: 700;
  font-size: 34px;
  line-height: 130%;
  color: #000000;
  margin: 40px 0 17px;
}
</style>