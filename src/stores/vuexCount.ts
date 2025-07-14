// store/index.ts
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

// 定义 state 类型
interface CounterState {
  count: number
  history: HistoryItem[]
}

interface HistoryItem {
  type: 'INCREMENT' | 'DECREMENT' | 'RESET'
  time: Date
}

// 定义 getters 类型
interface CounterGetters {
  doubleCount: number
  isEven: string
  recentHistory: HistoryItem[]
}

// 定义根状态类型
export interface RootState {
  counter: CounterState
}

// 定义 injection key
export const key: InjectionKey<Store<CounterState>> = Symbol()

export default createStore<CounterState>({
  state: {
    count: 0,
    history: []
  },
  mutations: {
    INCREMENT(state: CounterState) {
      state.count++
      this.commit('ADD_HISTORY', { type: 'INCREMENT', time: new Date() })
    },
    DECREMENT(state: CounterState) {
      state.count--
      this.commit('ADD_HISTORY', { type: 'DECREMENT', time: new Date() })
    },
    RESET(state: CounterState) {
      state.count = 0
      this.commit('ADD_HISTORY', { type: 'RESET', time: new Date() })
    },
    ADD_HISTORY(state: CounterState, payload: HistoryItem) {
      state.history.unshift(payload)
      if (state.history.length > 5) {
        state.history.pop()
      }
    }
  },
  actions: {
    asyncIncrement({ commit }): Promise<void> {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('INCREMENT')
          resolve()
        }, 1000)
      })
    }
  },
  getters: {
    doubleCount: (state: CounterState): number => state.count * 2,
    isEven: (state: CounterState): string => state.count % 2 === 0 ? '偶数' : '奇数',
    recentHistory: (state: CounterState): HistoryItem[] => state.history.slice(0, 5)
  }
})

// 定义自定义的 useStore 组合式函数
export function useStore() {
  return baseUseStore(key)
}
