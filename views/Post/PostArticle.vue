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
    //import data from '../../mock/uploadImgUrl'
    export default {
      name: 'editor',
      data () {
        return {
          editorContent: '',
          title:'',
          modal:false,
          editor:{}
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
              this.title=''
              this.editor.txt.clear()
            })
            .catch(error=>{
              this.$Message.info('Failed')
              console.log(error)
            })
        },
      },
      mounted() {
        var editor = new E(this.$refs.editor)
        this.editor=editor
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
          customInsert: function (insertImg, result, editor) {
              // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
              // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

              // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
              var url = result.url
              console.log(result)
              editor.txt.append('<img src="'+result.data[0]+'">')
              this.editorContent=editor.txt.html()
              console.log(this.editorContent)
              // result 必须是一个 JSON 格式字符串！！！否则报错
          }
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