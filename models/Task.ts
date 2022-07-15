export default interface TaskModel {
  id: string;
  title: string;
  description: string;
  favorite: boolean;
  priority: number;
  completed: boolean;
  createdAt: Date;
}
