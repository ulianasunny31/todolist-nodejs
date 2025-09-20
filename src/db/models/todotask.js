import { model, Schema } from 'mongoose';

const TodoTaskSchema = new Schema(
  {
    title: { type: String, required: true },
    finished: { type: Boolean, default: false },
    in_progress: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TodoTaskCollection = model('TodoTask', TodoTaskSchema, 'todolist');
