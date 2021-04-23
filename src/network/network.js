import { request_POST, request_GET } from './request'
import qs from 'qs'

/* 登录 */
export function toLogin(data) {
  return request_POST('/login/login', data)
}

export function toModifyPassword(data) {
  return request_POST('/login/mail', data)
}

export function toCompleteModifyPassword(data) {
  return request_POST('/login/modify', data)
}

/* 学员管理 */
export function toGetStudentList(data={}) {
  return request_GET('/student/list', data)
}

export function toAddStudentData(data={}) {
  return request_POST('/student/insert', data)
}

export function toUpdateStudentData(data={}) {
  return request_POST('/student/update', data)
}

export function toGetStudentPersonalData(data={}) {
  return request_GET('/student/personInfo', data)
}

export function toStudentDropOut(data={}) {
  return request_GET('/student/dropOut', data)
}

export function toStudentGraduation(data={}) {
  return request_GET('/student/license', data)
}

/* 教练管理 */
export function toGetTrainerList(data={}) {
  return request_GET('/coach/list', data)
}

export function toAddTrainer(data={}) {
  return request_POST('/coach/insert', data)
}

export function toUpdateTrainer(data={}) {
  return request_POST('/coach/update', data)
}

export function toTrainerDropOut(data={}) {
  return request_GET('/coach/dropOut', data)
}

export function toGetTrainerRateList(data={}) {
  return request_GET('/coach/getLevel', data)
}



/* 车辆管理 */
export function toGetCarList(data={}) {
  return request_GET('/car/list', data)
}

export function toAddCar(data={}) {
  return request_POST('/car/insert', data)
}

export function toUpdateCar(data={}) {
  return request_POST('/car/update', data)
}






