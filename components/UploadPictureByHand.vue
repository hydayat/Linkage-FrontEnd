<template>
  <div>
    <!--文字区域-->
    <div style="margin-bottom: 15px;">
      <Input
        v-model="content"
        maxlength="500"
        show-word-limit
        type="textarea"
        placeholder="Enter something..."
        :autosize="{minRows: 8,maxRows: 8}"
      />
    </div>
    <!--待上传图片预览区域-->
    <div class="demo-upload-list" v-for="item in uploadList" :key="item.index">
      <img :src="item.url" />
      <div class="demo-upload-list-cover">
        <Icon type="ios-trash-outline" @click.native="handleRemove(item)" size="30"></Icon>
      </div>
    </div>
    <!--上传图片的按钮-->
    <Upload
      name="Picture"
      multiple="multiple"
      ref="upload"
      :show-upload-list="false"
      :format="['jpg','jpeg','png']"
      :max-size="2048"
      :before-upload="handleBeforeUpload"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      type="drag"
      action="http://www.saturnluo.cn:5000/weblog"
      style="display: inline-block;width:98px;"
    >
      <div style="width: 98px;height:98px;line-height: 98px;">
        <Icon type="md-camera" size="40"></Icon>
      </div>
    </Upload>

    <Divider />
    <!--待发布朋友圈提交按钮-->
    <center>
      <Button type="primary" v-on:click="upload()">Upload</Button>
    </center>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      uploadList: []
    };
  },
  methods: {
    handleBeforeUpload(file) {
      // 创建一个 FileReader 对象
      let reader = new FileReader();
      // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
      // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
      // 读取文件作为 URL 可访问地址
      reader.readAsDataURL(file);
      const _this = this;
      reader.onloadend = function(e) {
        file.url = reader.result;
        _this.uploadList.push(file);
        console.log("在handleBeforeUpload中输出");
        console.log(_this.uploadList);
      };
      //返回false，禁止自动上传
      return false;
    },
    handleRemove(file) {
      //从上传列表中删除
      this.uploadList.splice(this.uploadList.indexOf(file), 1);
    },
    handleFormatError(file) {
      console.log("在handleFormatError中输出");
      console.log(this.uploadList);
      //this.uploadList.splice(this.uploadList.indexOf(file), 1)
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: "文件 " + file.name + " 太大，不能超过 2M。"
      });
    },
    upload() {
      var formdata = new FormData();
      //上传文字
      formdata.append("Text", this.content);
      //上传图片
      for (let i = 0; i < this.uploadList.length; i++) {
        let item = this.uploadList[i];
        formdata.append("Picture", item);
      }
      //上传视频
      formdata.append("Video", "");

      var url = "/moment";
      this.$axios
        .post(url, formdata, {
          timeout: 10000,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          //上传后清空
          this.content = "";
          this.uploadList.splice(0, this.uploadList.length);
          this.$Message.success("Success!");
        })
        .catch(error => {
          this.$Message.error("Fail!");
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.demo-upload-list {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}

.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}

.ivu-icon {
  line-height: 98px;
}
</style>
