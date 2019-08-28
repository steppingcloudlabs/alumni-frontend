import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    authenticate: ({state, commit}, data) => {
      const params = new URLSearchParams();
      params.append('client_id', 'MmJiOGM1ZWU4Zjg2NmY3NDE0MzNiMGFiYWY1OQ');
      params.append('user_id', 'adminth');
      params.append('token_url', 'https://api4.successfactors.com/oauth/token');
      params.append('private_key', 'TUlJRXZBSUJBREFOQmdrcWhraUc5dzBCQVFFRkFBU0NCS1l3Z2dTaUFnRUFBb0lCQVFDdXRCeUxReVM4Z3NkaTArdlIvMVl6MVQxRjhRMmZTK3ZLVVBiMHFjb0NRQWoyNGwzR2hDWFpJalhhVGg0dTFVVWZWQUFZbEtRNGFQQm9iUVRnZk81VmppR09XNWJJbXJlN1pWVU9lMXljYXVaamVwaldaOHdXSVlYbGtCUE0vTWUzVTViNEdadjBXRFJ1QmVidjhMVmF3L1FZR29GSHhtRzRlYUU5QjBrUVFZNm5YQVIrZDU5WCtsNUtUSWRKeG1RRzlaMkFwbmZRRzdZWVdkSy81K2ZyQUpSbGZ0eTNiV1NQR3RkdUd4WGJRdTAxeUhTb0hJRDh0OGFPcFpIdCs0M1NtUjV3azJYV09FN2V3aTE2dEs5U0F1VHFJWlhJc0xGVGZrYVlwbnhvSkdZbGlzbnN2SGFtQXdubzdjd252QnJ1N1dxeFZOMzA5bTFPOVZOd1hqM05BZ01CQUFFQ2dnRUFlWjc1b0JtR0laWUpxRXRRQ0VseGdYUVp5KzhjUktGZDdPS2dpWU1LRnJidGhySGdCcXRJamZpNjlOY2RQQTFNcVpxWTFvUGtMMEVlM0JQSktWN1ByTS9kbkhVMmEwRUtWM01iMjVFVnorNjdwTlZjUVNiUmRUYXhPRGN0RWErSWVaKy9vY2h5UVpDR0wzSDhhMTF2WTFpM1BYQjJQN2xqbmtGT2RtWHovMVA4bGtqNURiUElLamJ6SWFaeWY5aUxZNEQvWStNYXBSdWV5eitNQ29keHBZZmdZR1RIVWFSdS9XaHVGd0lBMDU4bWV2RVAydFdZZ2N1UzJHQTZpUzM1d1NuMXU3bklLTWZrOURRQ0dsU25aZmlWTVNQcnlsVStDM3VuaUVTYzBlbWMvZ1M3aWlmTkdUNlZ3VnV3QmZWZXcyMlFsOW92cGNHZS9kRzhybkxGQVFLQmdRRG5JSlZ3Qzl5Ynd5OTd6MUxsY2NCV1d3eVlCa2oydVVxMzhPQkhiWGFZWmh3bnhpUVlOdVFkUHUxQ29la2RFSCtyeHpsUHVyTXJlMXpkT21WdmR1TVp5cTAwd2p1RC93eWRQQXJzQ0hWQTM4SkRCWStaZERZYS9uZytqeFo0YWF4S1pzVzFxSjdqbVZVRXdxVFZvcFNycGtkeTRkSVVxRmxHb2Q3ejlTZk1lUUtCZ1FEQmdSYXFPZUpQSTl1Tm95KytvSVl4UHRuZ3I5Qks4OFNnWTEyVkpCa1V1MkRwaTh5UDIwZXhWSEliU1lZWUY3ODBMWkFkdVN6bEp3UXBGLzRoeUxOQi9DUE9MV0dDN25lei9lRVo5QjRkUmR1Ui9oc01SbmZCMHoydEtTUVRJVGpHMFdPU2Y4eDIvUDR5WmN0YlZMQmREZlJkcld5L3NZUTJFM2x0bnNSKzlRS0JnRTBOM3VSSkFCWnAzelcrcTl0VXJoUGNMUG10OXJ0U2tPZDhCYm1xYzhSaEhuZmdKZjV3cG1KZHJVbnVvc0lPMHhHWXpMR1pBOHkyUndKMlNvVDd0TURQZ2lrNXJBL1lnd01VbG11VWNrcmJqbTg3dG1FcGpqUTNyQ3puRlUyMXBUdjB3V3RMdVJVVjlITXUxVGRvQ1hxa1orT1VCNjdkWlU0WC96V0VBTzI1QW9HQVM3Q1YwQUlTVHNpRTRkTTZJc09obWZPdXY5K2xoeHZ4QnBlM2pGWHhaWldoNDlpbUxJTW1lT3ZDTW9CQTduMmpjZUo4bzlQQ0J1U0xFUlBzZVFTTGNiMFJ1RjB4N2tnZkZJMnpGamJSN0x0ZGxxNmhuOXlVallGMmQ1eEhHeUI4bC9CaGxYVmQ0aEUxMFRyV0g2UngxQVJZV0tnMGlJc0VYeTZnNmNzWHExMENnWUF4MGxKbHRBRHdSZlRUK3VySUE4QklsRlRCZGVBQzllNTMrQmYxWHIyZ1ZVc2d5WjNJOE5FaVFvLzRrNGMvdmFVTGNIMVk0OFJKTkxyc3RmK2NtcjFXcWJpZExBNGRNWTF6QmhlQ0QwZkxRbXc2dUdGU1RWMXM4dmpFRUM2NWVoekJjWDQ3c2ZPcDRySkNXTW5wOFlONVhpclhTNGpzUFo1T2dIdGQwZEpzeHc9PSMjI1RBVEFDb21tVGVzdA==');
      axios({
        method: 'POST',
        url: 'https://api4.successfactors.com/oauth/idp',
        withCredentials: true,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        data: params,
      }).then((response) => {
        console.log(response);

      })
    }
  }
})
