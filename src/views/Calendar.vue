<template>
  <div class="w-100 d-flex-column" style="height:100vh;width:100vw">
    <div class="d-flex w-100 header">
      <div
        class="d-flex justify-content-start w-75 h-50 my-auto ml-3"
        v-if="!showday"
      >
        <h4>預約行事曆</h4>
      </div>
      <div
        class="d-flex justify-content-start w-75 h-50 my-auto ml-3"
        v-if="showday"
      >
        <div class="d-flex justify-content-start align-items-center c-time">
          <img
            class="h-75 c-pointer"
            src="/img/previous.png"
            style="width:auto"
            alt="prev"
            @click="prev"
          />
        </div>
        <h6 class="my-auto">
          {{ chosenDay.getFullYear() }}/
          {{ pad(chosenDay.getMonth() + 1, '0') }}/
          {{ pad(chosenDay.getDate(), '0') }}
        </h6>
        <div class="d-flex justify-content-end align-items-center c-time">
          <img
            class="h-75 c-pointer"
            src="/img/next.png"
            style="width:auto"
            alt="next"
            @click="next"
          />
        </div>
      </div>
      <div class="d-flex justify-content-end w-25 my-auto">
        <div class="dropdown show mr-3">
          <button
            class="btn btn-type1 btn-sm dropdown-toggle rounded-pill"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style=""
          >
            {{ type }}
          </button>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuLink"
          >
            <a class="dropdown-item" href="#" @click="changeView('週檢視')">
              週檢視
            </a>
            <a class="dropdown-item" href="#" @click="changeView('日檢視')">
              日檢視
            </a>
          </div>
        </div>
        <div class="dropdown show mr-3">
          <button
            class="btn btn-type1 btn-sm dropdown-toggle rounded-pill"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ name[0] }}
          </button>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuLink"
          >
            <a class="dropdown-item" href="#">登出</a>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex w-100 c-head">
      <div class="d-flex justify-content-center align-items-center c-time">
        <img
          class="h-25 c-pointer"
          src="/img/calendar.png"
          style="width:auto"
          alt="C"
          @click="showcalendar = !showcalendar"
        />
        <!-- <button
          class="btn btn-type1 btn-sm rounded-circle"
          type="button"
          @click="showcalendar = !showcalendar"
        >
          圖
        </button> -->
      </div>
      <div
        class="flex-fill d-flex flex-column-reverse"
        v-for="day in days"
        :key="day.num"
      >
        <div class="h-25">
          <div
            class="rounded-circle mx-auto mb-1"
            style="background-color:green;height:5px;width:5px"
            v-if="
              (parseInt(day.num) == date.getDate()) &
                (date.getMonth() == chosenDay.getMonth())
            "
          ></div>
          <div
            class="rounded-circle mx-auto mb-1"
            style="background-color:white;height:5px;width:5px"
            v-if="
              (parseInt(day.num) != date.getDate()) |
                (date.getMonth() != chosenDay.getMonth())
            "
          ></div>
        </div>
        <div
          class="w-75 rounded mx-auto mb-1"
          :class="{ chosen: day.num == chosenDay.getDate() }"
        >
          <div>{{ day.weekday[0] }}</div>
          <div>{{ day.num }}</div>
        </div>
      </div>
    </div>
    <Weekly
      :days="days"
      :times="times"
      :rosters="this.dummyrosters"
      v-if="!showday & !showcalendar"
    />
    <Daily
      :days="days"
      :times="times"
      :chosenDay="chosenDay"
      :rosters="this.dummyrosters"
      v-if="showday & !showcalendar"
    />
    <Monthly v-if="showcalendar" @update="chooseDay" />
  </div>
</template>

<script>
import Monthly from '@/components/Monthly.vue'
import Weekly from '@/components/Weekly.vue'
import Daily from '@/components/Daily.vue'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      date: new Date(Date.now()),
      chosenDay: new Date(Date.now()),
      times: [
        '6:00am',
        '7:00am',
        '8:00am',
        '9:00am',
        '10:00am',
        '11:00am',
        '12:00am',
        '1:00pm',
        '2:00pm',
        '3:00pm',
        '4:00pm',
        '5:00pm',
        '6:00pm',
        '7:00pm',
        '8:00pm'
      ],
      days: [
        { weekday: 'Monday', num: '01' },
        { weekday: 'Tuesday', num: '02' },
        { weekday: 'Wednesday', num: '03' },
        { weekday: 'Thursday', num: '04' },
        { weekday: 'Friday', num: '05' },
        { weekday: 'Saturday', num: '06' },
        { weekday: 'Sunday', num: '07' }
      ],
      type: '週檢視',
      showday: false,
      showcalendar: false
    }
  },
  mounted: function() {
    this.initbydate(this.date)
  },
  methods: {
    initbydate(initdate) {
      var monday = 0
      var lastmonth = 0
      if (
        (initdate.getDate() < initdate.getDay()) |
        ((initdate.getDay() == 0) & (initdate.getDate() < 7))
      ) {
        if (initdate.getMonth() == 0) {
          lastmonth = 31
        } else {
          lastmonth = this.getMonthlyDate(
            initdate.getFullYear(),
            initdate.getMonth()
          )
        }
        if (initdate.getDay() == 0)
          monday = lastmonth - (6 - initdate.getDate())
        else monday = lastmonth - (initdate.getDay() - initdate.getDate() - 1)
        for (var i = 0; i < 7; i++) {
          if (monday + i <= lastmonth) this.days[i].num = '' + (monday + i)
          else this.days[i].num = '0' + (monday + i - lastmonth)
        }
      } else {
        if (initdate.getDay() == 0) monday = initdate.getDate() - 6
        else monday = initdate.getDate() - (initdate.getDay() - 1)
        lastmonth = this.getMonthlyDate(
          initdate.getFullYear(),
          initdate.getMonth() + 1
        )
        for (var j = 0; j < 7; j++) {
          if (monday + j > lastmonth) {
            this.days[j].num = '0' + (monday + j - lastmonth)
          } else {
            if (monday + j < 10) this.days[j].num = '0' + (monday + j)
            else this.days[j].num = '' + (monday + j)
          }
        }
      }
    },
    pad(num, pad) {
      if (num < 10) return pad + num
      else return '' + num
    },
    changeView(type) {
      if (this.type != type) {
        this.type = type
        this.showday = !this.showday
      }
    },
    prev() {
      var newday = new Date(this.chosenDay)
      newday.setDate(this.chosenDay.getDate() - 1)
      this.chosenDay = newday
    },
    next() {
      var newday = new Date(this.chosenDay)
      newday.setDate(this.chosenDay.getDate() + 1)
      this.chosenDay = newday
    },
    getMonthlyDate(year, month) {
      var d = new Date(year, month, 0)
      var n = d.getDate()
      return n
    },
    chooseDay: function(day) {
      if (day != '') this.chosenDay = day
      this.showcalendar = false
    }
  },
  computed: {
    ...mapState('user', ['name', 'dummyrosters'])
  },
  watch: {
    chosenDay: function() {
      this.initbydate(this.chosenDay)
    }
  },
  components: {
    Monthly,
    Weekly,
    Daily
  }
}
</script>

<style scoped>
.header {
  height: 10%;
}
.c-head {
  height: 10%;
}
.c-time {
  width: 12.5%;
}
.chosen {
  background-color: #7f74b4;
  color: #dedaf4;
}
.btn-type1 {
  background-color: #dedaf4;
  color: #7f74b4;
}
.btn-type4 {
  background-color: gray;
  color: white;
  font-size: 0.5rem;
}
.c-pointer {
  cursor: pointer;
}
</style>
