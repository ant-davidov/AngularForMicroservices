import { RoomType } from "../../_services/room.service"

export const  ListTypes: Array<string> = ["Лекционное","Для практических занятий","Спортзал", "Прочее"]
export const RoomTypeMap: { [key: string]: RoomType } = {
    "Лекционное": RoomType.Lecture,
    "Для практических занятий": RoomType.Practice,
    "Спортзал": RoomType.Gym,
    "Прочее": RoomType.Other

};