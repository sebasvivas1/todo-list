export default interface TaskModel {
  id: string;
  title: string;
  description: string;
  status: number;
  favorite: boolean;
  priority: number;
  createdAt: Date;
}
