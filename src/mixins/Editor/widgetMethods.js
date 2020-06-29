export const widgetMethods = {
  methods: {
    addWidget (widgetType) {
      this.$store.commit('addWidget', {
        chapterId: this.chapterId,
        contentId: this.contentId,
        widgetType: widgetType
      })
    },
    deleteWidget (id) {
      this.$store.commit('deleteWidget', {
        chapterId: this.chapterId,
        contentId: this.contentId,
        widgetId: id
      })
    }
  }
}
