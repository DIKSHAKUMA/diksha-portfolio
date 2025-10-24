import { defineStore } from 'pinia'

export const useNavbarStore = defineStore('navbar', {
  state: () => ({
    isTransparent: false,
    isContactPage: false,
    isProjectsPage: false
  }),
  
  actions: {
    setTransparent(transparent: boolean, page?: 'contact' | 'projects') {
      this.isTransparent = transparent
      
      if (page === 'contact') {
        this.isContactPage = transparent
      } else if (page === 'projects') {
        this.isProjectsPage = transparent
      }
    },
    
    reset() {
      this.isTransparent = false
      this.isContactPage = false
      this.isProjectsPage = false
    }
  }
})
