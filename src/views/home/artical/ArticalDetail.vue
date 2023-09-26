<template>
  <div>
    <h1>{{articalDetail.title}}</h1>
    <div>发表日期：{{articalDetail.createtime}}</div>
    <div>{{articalDetail.content}}</div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            articalDetail:{}
        }
    },
    methods:{
        getArtical(){
             const id = this.$route.params.id;
             this.axios.get(`/articals?id=${id}`).then((res)=>{
                if(res.data.length >0){
                    this.articalDetail = res.data[0];
                }else{
                    this.articalDetail = {};
                }
             }).catch(err=>{
                alert('未找到文章详情');
                console.log('err',err);
             })
        }
    },
    beforeMount(){
        this.getArtical();
    }
}
</script>


