// 格式化日期 2023/10/24 07:43:40
export const getFormatDate = (date: Date) => {
  const localDate = date.getTime() + date.getTimezoneOffset() * 60 * 1000
  return new Date(localDate).toISOString().slice(0, 19).replace('T', ' ').replaceAll('-', '/')
}

// 转换YMD日期格式 2022/10/10
export const formatedYMD = (date: Date) => getFormatDate(date).split(' ')[0]

// 时间格式 07:43:40
export const formatedTime = (date: Date) => getFormatDate(date).split(' ')[1]

// 年份 2023
export const getYear = (date: Date) => formatedYMD(date).split('/')[0]

// 年月 2023-01
export const getYM = (date: Date) => formatedYMD(date).split('/').slice(0, 2).join('-')

// 日月 10/24
export const getMD = (date: Date) => formatedYMD(date).split('/').slice(1, 3).join('/')
