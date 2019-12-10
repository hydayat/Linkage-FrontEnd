<template>
    <div>
      <h1 style="margin-top:10px;">Title</h1>
		  <Divider/>
              <Input v-model="title" show-word-limit type="textarea" size="large" placeholder="Enter something..." maxlength="100"
               style="width:50%;" ></Input>
        <h1 style="margin-top:10px;">Content</h1>
		  <Divider/>
        <div ref="editor" style="text-align:left"></div>
        <Button type="primary" v-on:click="submit">Sumbit</Button>
    </div>
</template>

<script>
    import E from 'wangeditor'
    import data from '../../mock/uploadImgUrl'
    export default {
      name: 'editor',
      data () {
        return {
          editorContent: '',
          title:'',
          modal:false
        }
      },
      methods: {
        writeTitle:function(){
          this.modal=true
        },
        submit: function () {
          var url="/post"
          this.$axios
            .post(url, 
                {
                PostHtml:this.editorContent,
                Title:this.title
                }
            )
            .then(response=>{
              console.log()
              this.$Message.info('Sucessfully submit')
            })
            .catch(error=>{
              console.log(error)
            })
        },
      },
      mounted() {
        var editor = new E(this.$refs.editor)
        //editor.customConfig.uploadImgShowBase64 = true
        editor.customConfig.uploadImgServer = '/post/img'
        editor.customConfig.uploadFileName = 'Picture'
        editor.customConfig.uploadImgHooks = {
          before: function (xhr, editor, files) {
              // 图片上传之前触发
              // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
              console.log(xhr)
              // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
              // return {
              //     prevent: true,
              //     msg: '放弃上传'
              // }
          },
        }
        editor.customConfig.colors
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
        console.log(editor)
      }
    }
</script>

<style scoped>
</style>