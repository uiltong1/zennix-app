<template>
  <q-page class="flex flex-center">
    <q-card style="margin: 10ox;">
      <apexchart  :options="{ chart: { type: 'line', width: 500 }, xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998] } }" :series="[{ name: 'series-1', data: [30, 40, 45, 50, 49, 60, 70, 91] }]"></apexchart>
    </q-card>
    <q-card>
      <!-- <apexchart width="500" type="line" :options="options" :series="series"></apexchart> -->
    </q-card>
    <q-card>
      <apexchart :options="{ chart: { type: 'donut', width: '600px' , zoom: { enabled: true }, animations: { enabled: true, easing: 'easeinout' } }}" :series="[44, 55, 41, 17, 15]"></apexchart>
    </q-card>
    <q-card>
      <!-- <apexchart width="500" type="bar" :options="options" :series="series"></apexchart> -->
    </q-card>
  </q-page>
</template>
