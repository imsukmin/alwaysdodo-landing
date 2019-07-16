
import gql from 'graphql-tag'

export const state = () => ({
  isLoading: false,
  isLoaded: false,
  nodes: [],
})

export const mutations = {
  startLoading(state) {
    state.isLoading = true
  },
  endLoading(state) {
    state.isLoading = false
  },
  refresh(state, { nodes }) {
    state.nodes = nodes
    state.isLoaded = true
  },
}

export const actions = {
  async refresh({ commit }) {
    commit('startLoading')
    const client = this.app.apolloProvider.defaultClient
    const response = await client.query({
      query: gql`query {
        registries {
          id
          name
          value
        }
      }`
    })
    commit('refresh', {
      nodes: response.data.registries.map((registry) => ({
        id: registry.id,
        name: registry.name,
        value: JSON.parse(registry.value),
      })),
    })
    commit('endLoading')
  },
}
