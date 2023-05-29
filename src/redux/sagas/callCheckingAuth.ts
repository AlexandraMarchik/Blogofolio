import { call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import API from "../api";
import { logoutUser } from "src/redux/reducers/authSlice";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constants";

function* callCheckingAuth(apiCall: any, ...params: any) {
  //  достаем наш токен
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (accessToken && refreshToken) {
    // делаем запрос с исходным token
    const response: ApiResponse<any> = yield call(
      apiCall,
      accessToken,
      ...params
    );
    if (response.status === 401) {
      //     проверяем жив ли access и refresh token
      const accessResponse: ApiResponse<any> = yield call(
        API.verifyToken,
        accessToken
      );
      //   если accessResponse.status === 401 - значит наш токен умер
      //    занчит проверяем жив ли наш refresh token
      if (accessResponse.status === 401) {
        const refreshResponse: ApiResponse<any> = yield call(
          API.verifyToken,
          refreshToken
        );
        // если refreshResponse.status === 401 -значит refresh token тоже умер
        // значит нужно выкинуть пользователя из аккаунта и попросить залогиниться снова,
        //  чтоб получить новые refresh a access token
        if (refreshResponse.status === 401) {
          yield put(logoutUser());
        } else {
          //если refresh - жив, получаем вместе с ним новый accessToken
          const {
            ok: accessNewOk,
            data: accessNewData,
          }: ApiResponse<{ access: string }> = yield call(
            API.refreshToken,
            refreshToken
          );
          //если с новым токеном все хорошо - делаем повторно запрос на сервер и кладем его в localStorage
          if (accessNewOk && accessNewData) {
            localStorage.setItem(ACCESS_TOKEN_KEY, accessNewData.access);
            const newResponse: ApiResponse<any> = yield call(
              apiCall,
              accessNewData.access,
              ...params
            );
            return newResponse;
          } else {
            yield put(logoutUser());
          }
        }
      }
    } else {
      //Если это не ошибка токена - значит это мы что-то не так сделали с запросом
      //все хорошо
      return response;
    }
  } else {
    yield put(logoutUser());
  }
}

export default callCheckingAuth;
