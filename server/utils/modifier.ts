import { Types } from "mongoose";

export class Modifier {
  static slugify (name: string, id: Types.ObjectId){
    return name.replace(/\s/, '-').concat(`-${id}`);
  }

  static capitalize (name: string){
    return name.split(' ').map(str => str.charAt(0).toUpperCase() + str.substring(1)).join(' ');
  }
}