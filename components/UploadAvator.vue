<template>
    <Upload action="//jsonplaceholder.typicode.com/posts/" :on-success="handleSuccess()">
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
</template>
<script>
    export default {
        methods:{
			handleSuccess:function(){
				
			}
		}
    }
</script>