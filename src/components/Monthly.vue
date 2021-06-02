<template>
  <div class="calendar-board" style="height:100vh;width:100vw">
    <div class="d-flex flex-column w-100 h-25">
      <div class="d-flex h-25 flex-grow-1">
        <div class="d-flex flex-fill justify-content-start h-50 my-auto ml-3">
          <img
            class="h-75 my-auto mr-3"
            src="/img/calendar.png"
            style="width:auto"
            alt="c"
          />
          <h4 class="h-75 my-auto">選擇日期</h4>
        </div>
        <div class="d-flex flex-fill justify-content-end h-50 my-auto">
          <div class="mr-4" style="width:10%">
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="closeCalendar"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex h-25 flex-grow-1">
        <div class="w-100 h-50 my-auto">
          <span class="font-weight-bold" style="font: size 1.2rem;">
            {{ date.getFullYear() }}/{{ pad(date.getMonth() + 1, '0') }}
          </span>
        </div>
      </div>
      <div class="d-flex h-25 flex-grow-1 c-item-wrap mx-auto">
        <div class="c-item h-50 mx-auto my-auto">
          <p style="font-size=1rem">M</p>
        </div>
        <div class="c-item h-50 mx-auto my-auto">
          <p style="font-size=1rem">T</p>
        </div>
        <div class="c-item h-50 mx-auto my-auto">
          <p style="font-size=1rem">W</p>
        </div>
        <div class="c-item h-50 mx-auto my-auto">
          <p style="font-size=1rem">T</p>
        </div>
        <div class="c-item h-50 mx-auto my-auto">
          <p style="font-size=1rem">F</p>
        </div>
        <div class="c-item h-50 mx-auto my-auto">
          <p style="font-size=1rem">S</p>
        </div>
        <div class="c-item h-50 mx-auto my-auto">
          <p style="font-size=1rem">S</p>
        </div>
      </div>
    </div>
    <div class="w-100 h-75 c-back overflow-auto noscrollbar">
      <div
        class="d-flex flex-wrap c-item-wrap mx-auto mb-3"
        v-for="days in calendars"
        :key="days.id"
      >
        <div class="w-100 mb-3">
          <span
            class="font-weight-bold"
            style="font: size 1.2rem;"
            v-if="
              (days.title.year != date.getFullYear()) |
                (days.title.month != date.getMonth() + 1)
            "
          >
            {{ days.title.year }}/{{ pad(days.title.month, '0') }}
          </span>
        </div>
        <div class="c-item mx-auto mb-1" v-for="day in days.day" :key="day.id">
          <div class="d-flex justify-content-center align-items-center c-time">
            <button
              class="btn btn-sm btn-type3 rounded-circle"
              type="button"
              @click="choose(day.id)"
            >
              <span v-if="day.active">{{ pad(day.day, '0') }}</span>
              <span class="c-noactive" v-if="!day.active">
                {{ pad(day.day, '0') }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-bottom c-bottom-btn"></div>
    <div class="fixed-bottom" style="height:10%">
      <button class="btn btn-type2 btn-lg rounded-pill" @click="submit">
        選擇
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(Date.now()),
      calendars: [],
      chosenDay: ''
    }
  },
  methods: {
    choose(id) {
      var temparray = id.split('-')
      temparray[1] = temparray[1] - 1
      this.chosenDay = new Date(temparray[0], temparray[1], temparray[2])
    },
    submit() {
      if (this.chosenDay != '') {
        this.$emit('update', this.chosenDay)
      } else {
        alert('please choose a date')
      }
    },
    closeCalendar() {
      this.$emit('update', '')
    },
    pad(num, pad) {
      if (num < 10) return pad + num
      else return '' + num
    },
    lastDate(month, year) {
      if (month == 12) {
        month = 0
        year = year + 1
      }
      var tmpDate = new Date(year, month, 0)
      return tmpDate.getDate()
    },
    lastMonthDate(month, year) {
      var tmpDate = new Date(year, month - 1, 0)
      return tmpDate.getDate()
    },
    firstDay(month, year) {
      var tmpDate = new Date(year, month - 1, 1)
      if (tmpDate.getDay() == 0) return 6
      else return tmpDate.getDay() - 1
    },
    lastDay(month, year) {
      if (month == 12) {
        month = 0
        year = year + 1
      }
      var tmpDate = new Date(year, month, 0)
      if (tmpDate.getDay() == 0) return 6
      else return tmpDate.getDay() - 1
    },
    createCalender(month, year) {
      var days = {
        id: `${year}-${month}`,
        day: [],
        title: { year: year, month: month }
      }
      var lastDay = this.lastDay(month, year)
      var firstDay = this.firstDay(month, year)
      var lastDate = this.lastDate(month, year)
      var lastMonthDate = this.lastMonthDate(month, year)
      for (var i = firstDay - 1; i >= 0; i--) {
        days.day.push({
          day: lastMonthDate - i,
          active: false,
          id: `${year}-${month}-l${lastMonthDate - i}`
        })
      }
      for (var j = 1; j <= lastDate; j++) {
        days.day.push({
          day: j,
          active: true,
          id: `${year}-${month}-${j}`
        })
      }
      for (var k = lastDay; k < 6; k++) {
        days.day.push({
          day: 1 + (k - lastDay),
          active: false,
          id: `${year}-${month}-n${1 + (k - lastDay)}`
        })
      }
      return days
    },
    initCalender(year, month) {
      for (var i = 0; i < 12; i++) {
        this.calendars.push(this.createCalender(month, year))
        if (month == 12) {
          month = 1
          year = year + 1
        } else {
          month = month + 1
        }
      }
    }
  },
  mounted: function() {
    this.initCalender(this.date.getFullYear(), this.date.getMonth())
  }
}
</script>

<style scoped>
.calendar-board {
  position: absolute;
  top: 0;
  background-color: white;
  z-index: 1;
}
.c-back {
  background-color: #f0f0f0;
  box-shadow: 0px 0px 10px gray inset;
}
.c-item-wrap {
  width: 100%;
}
.c-item {
  width: 14%;
}
.c-noactive {
  color: gray;
}
.c-bottom-btn {
  height: 5%;
  background-color: white;
  box-shadow: 0px 0px 20px 20px white;
}
.btn-type2 {
  background-color: #7f74b4;
  color: white;
}
.btn-type3:hover,
.btn-type3:focus {
  background-color: #7f74b4;
  color: white;
  outline: 0;
}

:focus {
  outline: 0;
}
</style>
