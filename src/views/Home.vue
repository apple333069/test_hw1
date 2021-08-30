<template>
  <div class="home">
    <div class="wrapper" v-show="!image"> 
      <i  class="el-icon-picture avatar-uploader-icon"></i>     
      <button  class="upload_btn">
        <input class="default" type="file" @change="onFileChange">
        上傳圖片    
      </button>
    </div>
    <div class="img" v-show="image" :style="'width:'+width+'px;height:'+height+'px;'">
      <vue-draggable-resizable  
        :w="item.drag_w" 
        :h="item.drag_h" 
        :x="item.x" 
        :y="item.y"  
        v-for="(item,index) of items" :key="item.id" 
        @activated="activate(item, index)"
     
        @dragging="drag" 
        @resizing="resize" 
        :parent="true"       
        style="z-index: 1;"> 
        <button class="del_drag" @click="removeDrag(index)">x</button>
      </vue-draggable-resizable>
      <div>      
        <img :src="image" @click="addElement"  />
        <div style="display: flex; justify-content: space-between;padding-top: 10px;" v-show="image">
          <span>寬：{{ width }} &nbsp;&nbsp; 高：{{ height }}</span>
          <button  class="del_btn" @click="removeImage">完成</button>
        </div>   
      </div>
      <div class="table" v-show="image" >
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
          <tbody >
            <tr v-for="(item,index) of items" :key="item.id" >
              <td>
                <input type="number" v-model="id" @click="changeElement">{{index+1}}
              </td>
              <td >
                <input type="number" v-model="x" @click="changeElement">{{x}}
              </td>
              <td >
                <input type="number" v-model="y" @click="changeElement">{{y}}
              </td>
              <td >
                <input type="number" v-model="drag_h" @click="changeElement">{{drag_h}}
              </td>
              <td >
                <input type="number" v-model="drag_w" @click="changeElement">{{drag_w}}
              </td>           
            </tr>
          </tbody>
        </table>      
      </div>  
           
    </div>  
  </div>
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable'
  export default {
    name: 'home',
    data() {
      return {
        active: null,
        drag_w: null,
        drag_h: null,
        x: null,
        y: null,   
        id: null, 
        index: null, 
        image: '',
        width: null,
        height: null,
        items: [
          {
            active: false,
            id:this.index,
            drag_w: 100,
            drag_h: 100,
            x: 10,
            y: 10,
          }
        ]   
      };
    },
    methods: { 
      addElement() {
        this.active = false;
        if(this.items.length<3){
          this.index+=1;
          this.items.push({
            active: true,
            drag_w: 100,
            drag_h: 100,
            x: 0,
            y: 0,
            id:this.index
          })
        }
      },
      activate (item, index) {
        item.active = true;
        this.active = item.active;
        this.drag_w = item.drag_w;
        this.drag_h = item.drag_h;
        this.x = item.x;
        this.y = item.y;
        this.index = index;
        console.log(item, index)
      },
      // deactivate(item, index) {
      //   item.active = false;
      //   this.index = index;
      // },
      changeElement() {
        this.items[this.index]["drag_w"] = Number(this.drag_w);
        this.items[this.index]["drag_h"] = Number(this.drag_h);
        this.items[this.index]["x"] = Number(this.x);
        this.items[this.index]["y"] = Number(this.y);
        const items = this.items;
        this.items = [];
        this.items = items;
      },
      resize(x,y, drag_w, drag_h) {
        this.x = x;
        this.y = y;
        this.drag_w = drag_w;
        this.drag_h = drag_h;
      },
      drag(x,y) { 
        this.x = x;
        this.y = y;
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
  .img{
    display: flex;
    flex-direction: row;
  }
  .home{
    margin-top: 90px;
    margin-left: 80px;
    width: 400px;
    height: 300px;
    /* position: relative; */
  }
  .home .wrapper{
    margin-top: 90px;
    margin-left: 80px;
    width: 400px;
    height: 300px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
  .avatar-uploader-icon {
    font-size: 52px;
    color: #8c939d;
    width: 400px;
    height: 300px;
    text-align: center;
    line-height: 300px!important;
  }
  .upload_btn {
    margin-top: 20px;
    width: 400px;
    height: 50px;
    border: 1px solid #d9d9d9;
    color: #727171;
    border-radius: 2px;
    background: #ffffff;
    position: relative;
  }
  input {
    opacity: 0;
    width: 398px;
    height: 48px;
    top: -1px;
    left: -1px;
    position: absolute;
    border: 1px solid #6b6b6b;
  }
  .del_btn {
    width: 100px;
    height: 40px;
    color: #ffffff;
    background: #0088cc;
    border-radius: 3px;
    border: none;
  }
  table {
    margin-left: 60px;
    border: 1px solid #333333; border-collapse: collapse;
  }
  tr, td, th {
    width:100px;
    padding: 5px 10px;
    border: 1px solid #333333;
    text-align: center;
    color: #494949;
  }
  .handle {
    width: 10px;
    height: 10px;
    background: #eee;
    border: 1px solid #333;
  }
  .vdr.active:before {
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    outline: 1px solid #3a8ee6!important;
  }
  .vdr {
    border: 1px solid #3a8ee6!important;
  }
  .handle {
    background:none!important;
    border:none!important;
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
  .draggable:hover .del_drag {
    visibility: visible;
  }
  

</style>

