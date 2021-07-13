<template>
  <div class="home">
    <div class="wrapper">
      <img v-if="image" :src="image" @mousemove="drag" />
      <div v-if="image" :style="maskStyle">
        <VueDragResize :isActive="true" :w="100" :h="100"        
          v-on:resizing="resize" 
          v-on:dragging="resize">
          <button class="del_drag" @click="removeDrag">x</button>
        </VueDragResize>
      </div>    
      <i v-else class="el-icon-picture avatar-uploader-icon"></i>     
      <button v-if="!image" class="upload_btn">
        <input class="default" type="file" @change="onFileChange">
        上傳圖片    
      </button>
      <div v-else>
        <button  class="del_btn" @click="removeImage">完成</button>
        <span>寬：{{ width }} &nbsp;&nbsp; 高：{{ height }}</span>
      </div>     
    </div>
    <div v-if="image" class="d_table">
      <table width="550">
        <thead class="table-head">
          <tr>
            <th></th>
            <th>X軸</th>
            <th>Y軸</th>
            <th>高度</th>
            <th>寬度</th>
          </tr>
        </thead>
        <tbody  >
          <tr>
            <td></td>
            <td>{{ left }}</td>
            <td>{{ top }}</td>
            <td>{{ h }}</td>
            <td>{{ w }}</td>
          </tr>
        </tbody>
      </table>      
    </div>
  </div>
</template>
<script>
 import VueDragResize from 'vue-drag-resize';
  export default {
    name: 'home',
    components: {
      VueDragResize
    },
    data() {
      return {
        image: '',
        width: 0,
        height: 0,
        w:0,
        h:0,
        top: 0,
        left: 0,
        maskstyle: {left:0 , top:0}
      };
    },
    methods: {     
      resize(newRect) {
        this.w = newRect.width;
        this.h = newRect.height;
        this.top = newRect.top;
        this.left = newRect.left;
      },
      drag(e){       
        var left = e.offsetX - this.w/2;
        var top = e.offsetY - this.h/2;
        if(left<0){left = 0}
        else if(left>372 - this.w){left = 372 - this.w}
        if(top<0){top=0}
        else if(top>251 - this.h){top = 251 - this.h}
        left = left + "px";
        top = top + "px";
        this.maskStyle = {left,top};
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.image = e.target.result;       
          image.onload=function(){
            var width = image.width;
            var height = image.height;
            vm.width = width;
            vm.height = height;
            console.log(width+":"+height);              
          };        
          image.src= vm.image;         
        };
        reader.readAsDataURL(file);
      },
      removeImage (e) {
        this.image = '';
      },
      removeDrag (index) {
        this.items.splice(index,1);
      }
      
    }
  }
</script>
<style>
  img {
    width: 372px;
    height: 251px;
  }
  .home{
    margin-top: 90px;
    margin-left: 80px;
    width: 372px;
    height: 251px;
  }
  .home .wrapper{
    margin-top: 90px;
    margin-left: 80px;
    width: 372px;
    height: 251px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    position: relative;
  }
  .img_bg {
    position: absolute;
  }
  .avatar-uploader-icon {
    font-size: 52px;
    color: #8c939d;
    width: 372px;
    height: 251px;
    text-align: center;
    line-height: 251px!important;
  }
  .upload_btn {
    margin-top: 20px;
    width: 372px;
    height: 50px;
    border: 1px solid #d9d9d9;
    color: #727171;
    border-radius: 2px;
    background: #ffffff;
    position: relative;
  }
  input {
    opacity: 0;
    width: 370px;
    height: 48px;
    top: -1px;
    left: -1px;
    position: absolute;
    border: 1px solid #6b6b6b;
  }
  .del_btn {
    margin-left: 270px;
    width: 100px;
    height: 40px;
    color: #ffffff;
    background: #0088cc;
    border-radius: 3px;
    border: none;
  }
  table {
    position: absolute;
    top: 92px;
    left: 620px;
    border: 1px solid #333333; border-collapse: collapse;
  }
  tr, td, th {
    width:100px;
    padding: 5px 10px;
    border: 1px solid #333333;
    text-align: center;
    color: #494949;
  }
  .vdr.active:before {
    outline: 1px solid #3a8ee6;
  } 
  .vdr-stick {
    background:none;
    border:none;
  }
  .del_drag {
    color: #ffffff;
    background: #0088cc;
    width: 15px;
    height: 15px;
    float: right;
    margin-right: -15px;
    border: none;
    padding: 0px;
    font-weight: 600;
    font-size: 12px;
    visibility: hidden;
  }
  .content-container:hover .del_drag {
    visibility: visible;
  }
  

</style>

