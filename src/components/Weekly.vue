<template>
  <div class="d-flex w-100 c-body c-back overflow-auto noscrollbar">
    <div class="h-100 c-time">
      <div class="c-block border" v-for="time in times" :key="time">
        <p style="font-size:0.6rem">{{ time }}</p>
      </div>
    </div>
    <div class="d-flex h-100 c-content">
      <div class="flex-even" v-for="roster in rosters" :key="roster.day">
        <div
          class="c-block border"
          v-for="time in roster.times"
          :key="time.time"
          :class="{ 'c-roster-block': time.working }"
        >
          <div
            class="h-100 w-100 c-book"
            :class="{ isstart: time.book.isstart, isend: time.book.isend }"
            v-if="time.book"
          >
            <p v-if="time.book.isstart">{{ time.book.type }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed-bottom c-bottom-btn"></div>
    <div class="fixed-bottom" style="height:10%">
      <button class="btn btn-type2 btn-lg rounded-pill">+新增預約</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    times: {
      type: Array,
      required: true
    },
    days: {
      type: Array,
      required: true
    },
    rosters: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.c-body {
  height: 80%;
}
.c-time {
  width: 12.5%;
}
.c-back {
  background-color: #fcfcfc;
  box-shadow: 0px 0px 10px gray inset;
}
.c-content {
  width: 87.5%;
}
.c-block {
  height: 12.5%;
}
.c-roster-block {
  background-color: #f0f0f0;
}
.c-bottom-btn {
  height: 5%;
  background-color: white;
  box-shadow: 0px 0px 20px 20px white;
}
.c-book {
  background-color: #e0e0e0;
  font-size: 0.8rem;
}
.isstart {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.isend {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.btn-type2 {
  background-color: #7f74b4;
  color: white;
}
.flex-even {
  flex: 1;
}
</style>
