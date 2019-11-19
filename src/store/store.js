import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import adminModule from '@/store/modules/admin.module'
import userModule from '@/store/modules/user.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    adminModule,
    userModule
  },
  state: {
    customslt: "Tas76OwxwH",
    userData: {},
    timeline: [{
        status: 0
      },

    ],
    showSnackbar: false,
    snackbarDuration: 3000,
    snackbarMessage: "Hello",
    snackbarHeading: "Error",
    snackbarColor: "Red",
    showDeleteDialog: false,
    deleteDialogCommitCall: "",
    deleteDialogData: {},
    deleteActionToDispatch: "",
    // ProgressBar
    showProgressBar: false,

  },
  mutations: {
    setShowDeleteDialog: (state, data) => {
      state.showDeleteDialog = data;
    },
    showDeleteDialog: (state, data) => {
      state.showDeleteDialog = true;
      state.deleteDialogCommitCall = data.commitToCall;
      state.deleteDialogData = data.objectToDelete
      state.deleteActionToDispatch = data.deleteActionToDispatch
      console.log(data);
    },
    closeDeleteDialog: (state, data) => {
      state.showDeleteDialog = false;
    },

    setTimelineStatus: (status, data) => {

    },

    setShowSnackbar: (state, data) => {
      state.showSnackbar = data;
    },
    setSnackbarDuration: (state, data) => {
      state.snackbarDuration = data;
    },
    setSnackbarMessage: (state, data) => {
      state.snackbarMessage = data;
    },
    setSnackbarHeading: (state, data) => {
      state.snackbarHeading = data;
    },
    setSnackbarColor: (state, data) => {
      state.snackbarColor = data;
    },
    showSnackbar: (state, data) => {
      state.showSnackbar = true;
      state.snackbarColor = data.color;
      state.snackbarDuration = data.duration;
      state.snackbarHeading = data.heading;
      state.snackbarMessage = data.message;
    },
    closeSnackbar: (state) => {
      state.showSnackbar = false;

    },
    showNetworkError: (state, data) => {
      state.showSnackbar = true;
      state.snackbarColor = "rgb(230, 0, 0, .8)";
      state.snackbarDuration = 3000;
      state.snackbarHeading = "Network Error";
      state.snackbarMessage = "OOPS! Something went wrong. Please try again!";
    },
    showSessionExpiredError: () => {
      state.showSnackbar = true;
      state.snackbarColor = "rgb(230, 0, 0, .8)";
      state.snackbarDuration = 3000;
      state.snackbarHeading = "Session Error";
      state.snackbarMessage = "Session Expired! Please login again.";
    },
    // ProgressBar
    showProgressBar: (state, data) => {
      state.showProgressBar = true;
    },
    closeProgressBar: (state, data) => {
      state.showProgressBar = false;
    },

  },
  getters: {
    getDeleteActionToDispatch: (state) => {
      return state.deleteActionToDispatch
    },
    getDeleteDialogCommitCall: (state) => {
      return state.deleteDialogCommitCall
    },
    getDeleteDialogData: (state) => {
      return state.deleteDialogData
    },
    getShowDeleteDialog: (state) => {
      return state.showDeleteDialog
    },

    getShowSnackbar: (state) => {
      return state.showSnackbar
    },
    getSnackbarDuration: (state) => {
      return state.snackbarDuration
    },
    getSnackbarMessage: (state) => {
      return state.snackbarMessage
    },
    getSnackbarHeading: (state) => {
      return state.snackbarHeading
    },
    getSnackbarColor: (state) => {
      return state.snackbarColor
    },

    // progressBar
    getShowProgressBar: (state) => {
      return state.showProgressBar
    }

  },

  actions: {
    authenticate: ({
      state,
      commit,
      dispatch
    }, data) => {
      const params = new URLSearchParams();
      params.append('client_id', 'MmJiOGM1ZWU4Zjg2NmY3NDE0MzNiMGFiYWY1OQ');
      params.append('user_id', 'adminth');
      params.append('token_url', 'https://api4.successfactors.com/oauth/token');
      params.append('private_key', 'TUlJRXZBSUJBREFOQmdrcWhraUc5dzBCQVFFRkFBU0NCS1l3Z2dTaUFnRUFBb0lCQVFDdXRCeUxReVM4Z3NkaTArdlIvMVl6MVQxRjhRMmZTK3ZLVVBiMHFjb0NRQWoyNGwzR2hDWFpJalhhVGg0dTFVVWZWQUFZbEtRNGFQQm9iUVRnZk81VmppR09XNWJJbXJlN1pWVU9lMXljYXVaamVwaldaOHdXSVlYbGtCUE0vTWUzVTViNEdadjBXRFJ1QmVidjhMVmF3L1FZR29GSHhtRzRlYUU5QjBrUVFZNm5YQVIrZDU5WCtsNUtUSWRKeG1RRzlaMkFwbmZRRzdZWVdkSy81K2ZyQUpSbGZ0eTNiV1NQR3RkdUd4WGJRdTAxeUhTb0hJRDh0OGFPcFpIdCs0M1NtUjV3azJYV09FN2V3aTE2dEs5U0F1VHFJWlhJc0xGVGZrYVlwbnhvSkdZbGlzbnN2SGFtQXdubzdjd252QnJ1N1dxeFZOMzA5bTFPOVZOd1hqM05BZ01CQUFFQ2dnRUFlWjc1b0JtR0laWUpxRXRRQ0VseGdYUVp5KzhjUktGZDdPS2dpWU1LRnJidGhySGdCcXRJamZpNjlOY2RQQTFNcVpxWTFvUGtMMEVlM0JQSktWN1ByTS9kbkhVMmEwRUtWM01iMjVFVnorNjdwTlZjUVNiUmRUYXhPRGN0RWErSWVaKy9vY2h5UVpDR0wzSDhhMTF2WTFpM1BYQjJQN2xqbmtGT2RtWHovMVA4bGtqNURiUElLamJ6SWFaeWY5aUxZNEQvWStNYXBSdWV5eitNQ29keHBZZmdZR1RIVWFSdS9XaHVGd0lBMDU4bWV2RVAydFdZZ2N1UzJHQTZpUzM1d1NuMXU3bklLTWZrOURRQ0dsU25aZmlWTVNQcnlsVStDM3VuaUVTYzBlbWMvZ1M3aWlmTkdUNlZ3VnV3QmZWZXcyMlFsOW92cGNHZS9kRzhybkxGQVFLQmdRRG5JSlZ3Qzl5Ynd5OTd6MUxsY2NCV1d3eVlCa2oydVVxMzhPQkhiWGFZWmh3bnhpUVlOdVFkUHUxQ29la2RFSCtyeHpsUHVyTXJlMXpkT21WdmR1TVp5cTAwd2p1RC93eWRQQXJzQ0hWQTM4SkRCWStaZERZYS9uZytqeFo0YWF4S1pzVzFxSjdqbVZVRXdxVFZvcFNycGtkeTRkSVVxRmxHb2Q3ejlTZk1lUUtCZ1FEQmdSYXFPZUpQSTl1Tm95KytvSVl4UHRuZ3I5Qks4OFNnWTEyVkpCa1V1MkRwaTh5UDIwZXhWSEliU1lZWUY3ODBMWkFkdVN6bEp3UXBGLzRoeUxOQi9DUE9MV0dDN25lei9lRVo5QjRkUmR1Ui9oc01SbmZCMHoydEtTUVRJVGpHMFdPU2Y4eDIvUDR5WmN0YlZMQmREZlJkcld5L3NZUTJFM2x0bnNSKzlRS0JnRTBOM3VSSkFCWnAzelcrcTl0VXJoUGNMUG10OXJ0U2tPZDhCYm1xYzhSaEhuZmdKZjV3cG1KZHJVbnVvc0lPMHhHWXpMR1pBOHkyUndKMlNvVDd0TURQZ2lrNXJBL1lnd01VbG11VWNrcmJqbTg3dG1FcGpqUTNyQ3puRlUyMXBUdjB3V3RMdVJVVjlITXUxVGRvQ1hxa1orT1VCNjdkWlU0WC96V0VBTzI1QW9HQVM3Q1YwQUlTVHNpRTRkTTZJc09obWZPdXY5K2xoeHZ4QnBlM2pGWHhaWldoNDlpbUxJTW1lT3ZDTW9CQTduMmpjZUo4bzlQQ0J1U0xFUlBzZVFTTGNiMFJ1RjB4N2tnZkZJMnpGamJSN0x0ZGxxNmhuOXlVallGMmQ1eEhHeUI4bC9CaGxYVmQ0aEUxMFRyV0g2UngxQVJZV0tnMGlJc0VYeTZnNmNzWHExMENnWUF4MGxKbHRBRHdSZlRUK3VySUE4QklsRlRCZGVBQzllNTMrQmYxWHIyZ1ZVc2d5WjNJOE5FaVFvLzRrNGMvdmFVTGNIMVk0OFJKTkxyc3RmK2NtcjFXcWJpZExBNGRNWTF6QmhlQ0QwZkxRbXc2dUdGU1RWMXM4dmpFRUM2NWVoekJjWDQ3c2ZPcDRySkNXTW5wOFlONVhpclhTNGpzUFo1T2dIdGQwZEpzeHc9PSMjI1RBVEFDb21tVGVzdA==');
      axios({
        method: 'POST',
        url: 'https://cors-anywhere.herokuapp.com/https://api4.successfactors.com/oauth/idp',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: params,
      }).then((response) => {
        console.log(response);
        dispatch('getAccessToken', response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    getAccessToken: ({
      state,
      commit,
      dispatch
    }, data) => {
      const params = new URLSearchParams();
      params.append('company_id', 'TATACommTest');
      params.append('client_id', 'MmJiOGM1ZWU4Zjg2NmY3NDE0MzNiMGFiYWY1OQ');
      params.append('grant_type', 'urn:ietf:params:oauth:grant-type:saml2-bearer');
      params.append('user_id', 'adminth');
      params.append('assertion', data);
      axios({
        method: 'POST',
        url: 'https://cors-anywhere.herokuapp.com/https://api4.successfactors.com/oauth/token', // https://cors-anywhere.herokuapp.com/
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: params,
      }).then((response) => {
        console.log(response);
        dispatch('validateAccessToken', response)
      })
    },
    validateAccessToken: ({
      state,
      commit,
      dispatch
    }, data) => {
      axios({
        method: 'POST',
        url: 'https://cors-anywhere.herokuapp.com/https://api4.successfactors.com/oauth/validate', // https://cors-anywhere.herokuapp.com/
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + data.data.access_token,
        },
      }).then((response) => {
        console.log(response);
      })
    }
  }
})