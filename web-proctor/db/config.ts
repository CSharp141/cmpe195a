import { defineDb, defineTable, column } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false }),
    username: column.text({ unique: true, optional: false}),
    hashed_password: column.text( { optional: false }),
    }
})

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false }),
    expires_at: column.number({ optional: false }),
    user_id: column.text({ references: () => User.columns.id, optional: false }),
  }
})

const ExamTable = defineTable({
  columns: {
    id: column.number({ primaryKey: true, optional: false }),
    name: column.text({ optional: false }),
    questions: column.json({ optional: false }),
  }
})

const TakenExam = defineTable({
  columns: {
    id: column.number({ primaryKey: true, optional: false }),
    byUser: column.text({ optional: false }),
    name: column.text({ optional: false }),
    questions: column.json({ optional: false }),
    userAnswers: column.json(),
  }
})

export default defineDb({
    tables: { User, Session, ExamTable, TakenExam },
})
