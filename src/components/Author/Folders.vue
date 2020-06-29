<template>
 <div style="display: flex; flex-direction: column; overflow: auto;">
   <ul class="list-group" style="overflow: hidden">
     <li class="list-group-item">Saved items</li>
     <li class="list-group-item">Submitted items</li>
     <li class="list-group-item">Evaluated items</li>
     <li class="list-group-item">Authored items</li>
     <li class="list-group-item">Remixed items</li>
   </ul>
   <div class="d-flex list-group" style="overflow: auto">
     <div class="list-group-item" style="border-bottom: 2px solid black"><strong>My folders</strong></div>
     <div class="d-flex flex-column" style="overflow: auto; max-height: 8rem">
       <div class="list-group-item" v-for="(folder, i) in folders" :key="folder.name"
            @mouseenter="showDelete(i, $event)" @mouseleave="hideDelete(i, $event)">
         <span style="cursor: pointer">{{ folder.name }}</span>
         <span :id="'delete_' + i" class="material-icons text-secondary" @click="deleteFolder(i)"
               style="font-size: medium; float: right; cursor: pointer; display: none">delete</span>
       </div>
     </div>
     <div class="list-group-item text-muted form-inline" >
       <label class="mb-0" style="justify-content: left">
         <span class="material-icons" style="transform: translateX(-5px)">add</span>
         <input placeholder="create folder" class="form-control"
                v-model.lazy="newFolder" @keyup.enter="addFolder">
       </label>
     </div>
   </div>
 </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Folders',
  data () {
    return {
      folders: [],
      newFolder: undefined
    }
  },
  computed: {
    userId () { return this.$store.state.user.id },
    folderUrl () { return '/folders/' + this.userId + '.json' }
  },
  methods: {
    addFolder () {
      this.folders.push({ name: this.newFolder, courses: [] })
      axios.put('/folders/' + this.userId + '/' + this.newFolder + '.json',
        { name: this.newFolder, courses: [] })
        .then(() => {
          this.newFolder = undefined
        })
    },
    deleteFolder (i) {
      const folder = this.folders[i]
      this.folders.splice(i, 1)
      axios.delete('/folders/' + this.userId + '/' + folder.name + '.json').then()
    },
    showDelete (i, event) {
      const id = 'delete' + '_' + i
      document.getElementById(id).style.display = 'inline-block'
    },
    hideDelete (i, event) {
      const id = 'delete' + '_' + i
      document.getElementById(id).style.display = 'none'
    }
  },
  created () {
    axios.get(this.folderUrl).then(res => {
      for (const k in res.data) {
        this.folders.push(res.data[k])
      }
    })
  }
}
</script>

<style scoped>
  .list-group-item {
    border-right: none;
    border-left: none;
    border-radius: 0;
  }
  .list-group-item input {
    border: none;
    max-width: 90%;
  }
  .form-control:focus {
    box-shadow: none;
    border: none
  }
</style>
