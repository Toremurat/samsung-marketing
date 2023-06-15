<template>
	<div v-if="postData" class="promo-wrapper">
		<router-link to="/promo" class="backlink">
			<i class="icon-back-to">
				<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M8.20206 2.10868C8.39732 1.91342 8.39732 1.59684 8.20206 1.40157C8.0068 1.20631 7.69021 1.20631 7.49495 1.40157L0.896484 8.00004L7.49495 14.5985C7.69021 14.7938 8.0068 14.7938 8.20206 14.5985C8.39732 14.4032 8.39732 14.0867 8.20206 13.8914L2.81066 8.5L13.6036 8.5C13.8798 8.5 14.1036 8.27614 14.1036 8C14.1036 7.72386 13.8798 7.5 13.6036 7.5L2.81074 7.5L8.20206 2.10868Z"
						fill="#666666" />
				</svg>
			</i>Вернуться к списку акций</router-link>
		<div class="promo-header">
			<div v-html="this.postData.image" class="image-block"></div>
			<div class="promo-description">
				<h1 class="promo-title">{{ this.postData.name }}</h1>
				<p class="promo-dates"><span>Срок</span>{{ this.postData.date_start }} - {{ this.postData.date_end }}
				</p>
				<div class="promo-date-calc" v-if="this.postData.remain!=''"><span>Осталось</span>{{ this.postData.remain }}
				</div>
			</div>
		</div>
		<div id="promo-content" class="description-wrapper" v-html="this.postData.text"></div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'promosList',

	data() {
		return {
			postData: {},
			errorData: []
		}
	},

	methods: {
		async getPromo() {
			let curId = this.$route.params.id;
			// await axios.get('http://demo8520125.mockable.io/getPromo/' + curId)
			await axios.get('/promo/getPromo/' + curId)
				.then(response => {
					this.postData = [];
					let date_end = new Date(response.data.promo.date_end);
					let date_start = new Date(response.data.promo.date_start);

					let today = Date.now();
					let result = date_end - today;
					if (result < 0) result = 0;
					let num = Math.ceil(result/(1000*3600*24));
					if (num == 0) num = 1;
					let remainDay = num + ' ' + whatDay(num)

					function whatDay(num) {
						if (num == 1 || (num > 20 && num % 10 == 1)) return "день";
						if (num < 5 || (num > 20 && num % 10 < 5 && num % 10 > 0)) return "дня";
						return "дней";
					}
					if (date_start > today || today > date_end) remainDay = '';
					this.postData = {
						"id": response.data.promo.id,
						"name": response.data.name,
						"description": response.data.description,
						"text": response.data.text,
						"image": response.data.promo.image,
						"date_start": date_start.toShortFormat(),
						"date_end": date_end.toShortFormat(),
						"remain": remainDay,
					};

				})
				.catch((error) => {
					console.log(error);
				});
		}
	},

	created() {
		this.getPromo();

	},
}
Date.prototype.toShortFormat = function () {
	const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля',
		'Мая', 'Июня', 'Июля', 'Августа',
		'Сентября', 'Октября', 'Ноября', 'Декабря'];

	const day = this.getDate();
	const monthIndex = this.getMonth();
	const monthName = monthNames[monthIndex];

	return `${day} ${monthName}`;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.backlink {
	font-weight: 400;
	font-size: 15px;
	line-height: 120%;
	color: #666666;
	text-decoration: none;
	display: flex;
	-webkit-flex-flow: row nowrap;
	-webkit-align-items: center;
	cursor: pointer;
}

.backlink i {
	padding-right: 10px;
	position: relative;
	top: -2px;
}

.promo-description .promo-date-calc span {
	color: #343434;
	font-weight: 400;
	margin-right: 10px;
}

.promo-header {
	display: flex;
	-webkit-flex-flow: row nowrap;
	column-gap: 30px;
	margin: 30px 0 47px;
}

.image-block>svg {
	height: 150px;
	width: 150px;
}

.promo-description h1 {
	font-weight: 700;
	font-size: 34px;
	line-height: 130%;
	margin-bottom: 20px;
}

.promo-description .promo-dates span {
	color: #343434;
	margin-right: 10px;
	font-weight: 400;
}

.promo-description .promo-dates {
	color: #000;
	font-weight: 700;
	font-weight: 700;
	font-size: 17px;
	line-height: 120%;
}

.promo-description .promo-date-calc {
	font-weight: 700;
	font-size: 17px;
	line-height: 120%;
	color: #2189FF;
}

.promo-description .promo-date-calc span {
	color: #343434;
	font-weight: 400;
	margin-right: 10px;
}

#promo-content h2 {
	font-weight: 700;
	font-size: 28px;
	line-height: 130%;
	color: #000000;
	margin-bottom: 30px;
}

#promo-content section {
	margin-bottom: 60px;
}

#promo-content h3 {
	font-style: normal;
	font-weight: 700;
	font-size: 24px;
	line-height: 130%;
	margin-bottom: 15px;
}

#promo-content ol {
	padding: 0 0 0 40px;
	list-style: none;
}

#promo-content ol li {
	margin-bottom: 20px;
	font-size: 17px;
	font-weight: 400;
	color: #343434;
}

#promo-content ol {
	counter-reset: number;
	list-style-type: none;
	position: relative;
}

#promo-content ol>li::before {
	counter-increment: number;
	content: counter(number)".";
	position: absolute;
	left: 0px;
	font-weight: 700;
	font-size: 17px;
	line-height: 140%;
	text-align: right;
	color: #2189FF;
	min-width: 30px;
}

#promo-content .notice {
	padding: 20px 20px 20px 60px;
	position: relative;
	font-weight: 400;
	font-size: 17px;
	line-height: 140%;
	color: #343434;
}

#promo-content .notice.blue {
	background: #F1F8FF;
}

#promo-content .notice.red {
	background: #FFEDED;
}

#promo-content .notice.green {
	background: #EBFFE8;
}

#promo-content .notice:before {
	position: absolute;
	width: 30px;
	height: 30px;
	content: '';
	left: 20px;
}

#promo-content .notice.blue:before {
	content: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='14' stroke='%232189FF' stroke-width='2'/%3E%3Cpath d='M15 12V22.5' stroke='%232189FF' stroke-width='2'/%3E%3Cpath d='M15 8L15 10' stroke='%232189FF' stroke-width='2'/%3E%3C/svg%3E%0A");
}

#promo-content .notice.red:before {
	content: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='14' stroke='%23EE2626' stroke-width='2'/%3E%3Cpath d='M15 12V22.5' stroke='%23EE2626' stroke-width='2'/%3E%3Cpath d='M15 8L15 10' stroke='%23EE2626' stroke-width='2'/%3E%3C/svg%3E%0A");
}

#promo-content .notice.green:before {
	content: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='14' stroke='%2300AE26' stroke-width='2'/%3E%3Cpath d='M15 12V22.5' stroke='%2300AE26' stroke-width='2'/%3E%3Cpath d='M15 8L15 10' stroke='%2300AE26' stroke-width='2'/%3E%3C/svg%3E%0A");
}

#promo-content h4 {
	font-style: normal;
	font-weight: 700;
	font-size: 17px;
	line-height: 130%;
	margin-bottom: 10px;
}

#promo-content ul {
	padding: 0 0 0 40px;
}

#promo-content ul li {
	font-weight: 400;
	font-size: 17px;
	line-height: 140%;
	color: #343434;
	margin-bottom: 20px;
}

#promo-content ul li::marker {
	color: #2189FF;
}

#promo-content table tr:not(:first-of-type) {
	border-top: 1px solid #D3D3D3;
}

#promo-content table tr td {
	padding: 10px;
	font-weight: 400;
	font-size: 15px;
	line-height: 120%;
}

#promo-content table tr td:not(:first-of-type) {
	border-left: 1px solid #D3D3D3;
}

#promo-content table tr td.blue {
	background: #EDF6FF;
}

#promo-content table tr td.red {
	background: #FFEDED;
}

#promo-content table tr td.green {
	background: #EBFFE8;
}

@media(max-width: 560px) {
	.promo-header {
		flex-flow: column;
		row-gap: 20px;
	}

	#promo-content table tr td:first-of-type {
		border-left: 1px solid transparent;
	}

	table {
		max-width: calc(100vw - 40px);
		overflow: scroll;
		width: calc(100vw - 40px);
		touch-action: manipulation;
		display: block;
	}

	table tbody {
		min-width: 200vw;
		display: block;
	}
}
</style>
<style scoped>
#notfound {
	position: relative;
	height: 100vh;
}

#notfound .notfound {
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%)
}

.notfound {
	max-width: 410px;
	width: 100%;
	text-align: center
}

.notfound .notfound-404 {
	height: 280px;
	position: relative;
	z-index: -1
}

.notfound .notfound-404 h1 {
	font-family: montserrat, sans-serif;
	font-size: 230px;
	margin: 0;
	font-weight: 900;
	position: absolute;
	left: 50%;
	-webkit-transform: translateX(-50%);
	-ms-transform: translateX(-50%);
	transform: translateX(-50%);
	background: black;
	/* background: url(../img/bg.jpg) no-repeat; */
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-size: cover;
	background-position: center
}

.notfound h2 {
	font-family: montserrat, sans-serif;
	color: #000;
	font-size: 24px;
	font-weight: 700;
	text-transform: uppercase;
	margin-top: 0
}

.notfound p {
	font-family: montserrat, sans-serif;
	color: #000;
	font-size: 14px;
	font-weight: 400;
	margin-bottom: 20px;
	margin-top: 0
}

#notfound .backlink {
	display: flex;
	-webkit-flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
}

#notfound .backlink I {
	top: 0px;
}

@media only screen and (max-width:767px) {
	.notfound .notfound-404 {
		height: 142px
	}

	.notfound .notfound-404 h1 {
		font-size: 112px
	}
}
</style>
