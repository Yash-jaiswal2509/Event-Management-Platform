import { Document } from "mongoose";
import { IUser } from "./User";
export interface IEvent extends Document {
  title: string;
  description?: string;
  date: Date;
  time: string;
  location: string;
  category: string;
  organizer: IUser["_id"];
  attendees: IUser["_id"][];
  imageUrl?: string;
}
