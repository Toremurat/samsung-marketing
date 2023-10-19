<template>
  <div class="promo-wrapper" v-if="promoData && promoData.length > 0">
    <div class="promo-container row">
      <div v-for="promoItem in promoData" :key="promoItem.id" class="col-sm-6 basis-50 promo-box">
        <router-link :to="`/promo/${promoItem.id}`">
          <div v-html="promoItem.image" class="image-box"></div>
          <div class="info-box">
            <div class="description">
              <h4>{{ promoItem.name }}</h4>
              <p>{{ promoItem.description }}</p>
            </div>
            <div class="date-info">
              <div class="promo-dates">
                <p class="date-title"> Срок</p>
                <p>{{ promoItem.date_start }} - {{ promoItem.date_end }}</p>
              </div>
              <div class="counter-date" v-if="promoItem.remain_day != ''">
                <div class="counter-date-title">Осталось</div>
                <p class="counter-date-text">{{ promoItem.remain_day }}</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div class="null-message">{{ promoData.message }}</div>
  <!-- <div class="null-message" v-if="this.promoError">loading</div> -->
</template>
<script>/* eslint-disable */
Date.prototype.toShortFormat = function () {
  const monthNames = ['января', 'февраля', 'марта', 'апреля',
    'мая', 'июня', 'июля', 'августа',
    'сентября', 'октября', 'ноября', 'декабря'];

  const day = this.getDate();
  const monthIndex = this.getMonth();
  const monthName = monthNames[monthIndex];

  return `${day} ${monthName}`;
}

import axios from 'axios'

export default {
  name: 'promosList',
  props: {
    promoStatus: String
  },
  data() {
    return {
      promoData: [],
      errorData: [],
      isHover: false,
      loadMessage: 'Загрузка...'
    }
  },
  methods: {
    async getPromos() {
      await axios.get('/promo/getPromoList/' + this.promoStatus) // eslint-disable-next-line 
        // await axios.get('http://demo8520125.mockable.io/' + this.promoStatus) // eslint-disable-next-line 
        .then(response => {
          this.promoData = [];
          response.data.forEach(element => {
            this.promoData.push({
              "id": element.promo.id,
              "name": element.name,
              "description": element.description,
              "image": element.promo.image,
              "date_start": date_start.toShortFormat(),
              "date_end": date_end.toShortFormat(),
              "remain_day": remainDay,
            });
          });
        })

        .catch((error) => {
          this.promoData = {
            "message": 'Акции на данный момент отсутсвуют'
          }
          console.log(error);
          this.errorData.push(error)
        });
    },
  },
  created() {

    this.getPromos();
  },
  beforeMount() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col-sm-6.basis-50.promo-box:hover {
  background: #F2F9FF;
  border: 1px solid #2189FF;
}

.col-sm-6.basis-50.promo-box a {
  display: flex;
  -webkit-flex-flow: row nowrap;
  padding: 40px;
  column-gap: 30px;
  flex-grow: 1;
}

.col-sm-6.basis-50.promo-box a .info-box {
  -webkit-flex-grow: 1;
}

.promoWrapper.row {
  margin: 20px -10px 0;
}

.col-sm-6.basis-50.promo-box {
  margin: 10px 10px;
  border: 1px solid #D3D3D3;
  border-radius: 18px;
  width: calc(50% - 20px);
  transition: ease all .3s;
}

.col-sm-6.basis-50.promo-box a {
  text-decoration: none;
  color: #000;
}

.col-sm-6.basis-50.promo-box a h4 {
  font-weight: 700;
  font-size: 24px;
  line-height: 130%;
  color: #000000;
  margin: 0 0 10px;
}

.col-sm-6.basis-50.promo-box a .description p {
  font-weight: 400;
  font-size: 17px;
  line-height: 120%;
  margin: 0;
  color: #343434;
}

.col-sm-6.basis-50.promo-box a .description {
  margin: 0 0 30px;
}

.col-sm-6.basis-50.promo-box a .date-info {
  display: flex;
  -webkit-flex-flow: row nowrap;
  -webkit-align-items: start;
  -webkit-justify-content: space-between;
}

.col-sm-6.basis-50.promo-box a .date-info p {
  margin: 0 0 5px;
  font-weight: 400;
  font-size: 15px;
  line-height: 110%;
  color: #343434;
}

.col-sm-6.basis-50.promo-box a .date-info .counter-date-title {
  margin: 0 0 5px;
  font-weight: 400;
  font-size: 15px;
  line-height: 110%;
  color: #343434;
}

.col-sm-6.basis-50.promo-box a .date-info p+p {
  margin: 0;
  font-weight: 700;
  font-size: 17px;
  line-height: 110%;
  color: #000000;
}

.col-sm-6.basis-50.promo-box a .date-info p.counter-date-text {
  font-weight: 700;
  font-size: 17px;
  line-height: 110%;
  color: #2189FF;
}

.col-sm-6.basis-50.promo-box a .image-box {
  width: 50px;
  height: 50px;
}

.promo-dates p+p {
  text-transform: lowercase;
}

@media (max-width: 560px) {
  .col-sm-6.basis-50.promo-box {
    padding: 0;
    width: calc(100% - 20px);
  }

  .col-sm-6.basis-50.promo-box a {
    flex-flow: column;
  }

  .col-sm-6.basis-50.promo-box a .image-box {
    margin: 0 0 30px;
    left: 0;
  }

  .col-sm-6.basis-50.promo-box a .date-info {
    flex-flow: column;
  }

  .col-sm-6.basis-50.promo-box a .date-info .promo-dates,
  .col-sm-6.basis-50.promo-box a .date-info .counter-date {
    display: flex;
    gap: 10px;
  }

  .col-sm-6.basis-50.promo-box a .date-info p {
    margin: 0px;
    font-size: 17px;
  }

  .col-sm-6.basis-50.promo-box a .date-info .counter-date-title {
    margin: 0px;
    font-size: 17px;
  }

  .col-sm-6.basis-50.promo-box a .date-info .promo-dates {
    margin: 0 0 15px;
  }
}
</style>
