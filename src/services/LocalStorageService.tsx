// LocalStorageService.tsx
class LocalStorageService {
  static _setToken(tokenObj: any) {
    localStorage.setItem('access_token', tokenObj.token);
    // localStorage.setItem('refresh_token', tokenObj.refresh_token);
  }

  static _getAccessToken() {
    return localStorage.getItem('access_token');
  }

  // function _getRefreshToken() {
  //   return localStorage.getItem('refresh_token');
  // }

  static _clearToken() {
    localStorage.removeItem('access_token');
    // localStorage.removeItem('refresh_token');
  }
}

export default LocalStorageService;
