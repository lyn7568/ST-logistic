
<template>
  <div class="CarAddPage-page">
    <MyTitle text = "实时位置"></MyTitle>
    <div class="relative" v-loading="loading">
      <div class="" id="map"></div>
      <el-button type="primary" class="refresh" @click.native="getData">刷新位置</el-button>
    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'CarAddPage',
  data () {
    return {
      tid: '',
      lists: [],
      loading: true,
    }
  },
  methods: {
    getData() {
      this.loading = true;
      this.$http.post(`/logistics/truck/getTruckPageListWithPosition.do`, {
        page: 1,
        pageSize: 20,
      })
      .then(({ data }) => {
        let arr = data.result.result;
        if(arr && arr.length > 0) {
          this.lists = arr;
          this.init(arr);
        } else {
          this.$message({
            message: '获取设备信息失败，请刷新后重试',
            type: 'error'
          });
        }
        this.loading = false;
      }).catch(err => {
        this.loading = false;
      })
    },
    initMap() {
      let arr = this.lists;
      var { latitude: lat, longitude: lng } = arr[0];
      var map = new BMap.Map("map");
      var point = new BMap.Point(lng, lat);
      map.centerAndZoom(point, 17);
      map.enableScrollWheelZoom(true);

      arr.map(v => {
        let _point = new BMap.Point(v.longitude, v.latitude);
        var marker = new BMap.Marker(_point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中

        var label = new BMap.Label(v.truckNum, { 
          offset: new BMap.Size(20, -10), 
          position: _point,
        });
        marker.setLabel(label);
      });
    },
    init() {
      this.initMap();
    },
  },
  mounted() {
    this.getData();
  },
  beforeDestroy() {
    clearInterval(this.tid);
  }
}
</script>

<style scoped lang='scss'>
#map {
  min-height: 560px;
  box-shadow: 2px 2px 20px rgba(0,0,0, .5)
}
.refresh {
  position: absolute;
  top: 24px;
  right: 24px;
}
</style>
