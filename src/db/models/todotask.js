import { model, Schema } from 'mongoose';

const TodoTaskSchema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    in_progress: { type: Boolean, default: false },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TodoTaskCollection = model('TodoTask', TodoTaskSchema, 'todolist');
