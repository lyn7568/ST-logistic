export default {
  methods: {
    successCb(msg, url) {
      this.$message({
        message: msg,
        type: 'success'
      });
      setTimeout(() => {
        url && (this.$router.push(url));
      }, 2000);
    },
    showWarn(msg) {
      this.$message({
        message: msg,
        type: 'error'
      });
    },
    showWarning(msg) {
      this.$message({
        message: msg,
        type: 'warning'
      });
    },
    showMsg(obj) {
      this.$message({
        message: obj.message,
        type: obj.code == 1 ? 'success' : 'error'
      });
    }
  }
}