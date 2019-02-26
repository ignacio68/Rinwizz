export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    stack: [],
    options: {},
    index: 1 // Tabbar
  },
  getters: {
    pageStack(state) {
      return state.stack
    },
    options(state) {
      return state.options
    },
    index(state) {
      return state.index
    }
  },
  mutations: {
    /**
     * Añade la página al final de la  pila
     *
     * @param {String} page
     */
    push(state, page) {
      state.stack.push(page)
    },
    /**
     * Elimina la última página añadida a la pila
     *
     * @param {String} state
     */
    pop(state) {
      if (state.stack.length > 1) {
        state.stack.pop()
      }
    },
    /**
     * remplaza un apágina por otra
     * evitamos que vuelva a cargar
     * las páginas según vamos navegando
     * adelante y hacia atrás
     *
     * @param {String} page
     */
    replace(state, page) {
      state.stack.pop()
      state.stack.push(page)
    },
    /**
     * Resetea la página
     *
     * @param {String} page
     */
    reset(state, page) {
      state.stack = [page || state.stack[0]]
    },
    options(state, newOptions = {}) {
      state.options = newOptions
    },
    /**
     * Tabbar
     *
     * @param {Number} index
     */
    set(state, index) {
      state.index = index
    }
  },
  actions: {}
}
